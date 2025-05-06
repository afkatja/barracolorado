"use client"

import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import React, { useEffect, useState, useCallback } from "react"
import { urlFor } from "../sanity/lib/image"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PopoverProps {
  selectedImage: SanityImageObject & {
    caption?: string
    alt: string
    _key: string
  }
  images: Array<
    SanityImageObject & { caption?: string; alt: string; _key: string }
  >
  onClose: () => void
}

const Popover = ({ selectedImage, images, onClose }: PopoverProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    // Find and scroll to the selected image
    const selectedIndex = images.findIndex(
      img => img._key === selectedImage._key
    )
    if (selectedIndex !== -1) {
      emblaApi.scrollTo(selectedIndex)
    }

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, images, selectedImage._key, onSelect])

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <button
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        ×
      </button>
      <div className="relative max-w-4xl w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map(image => (
              <div key={image._key} className="flex-[0_0_100%] min-w-0">
                <div className="relative aspect-video">
                  <Image
                    src={urlFor(image).url()}
                    alt={image.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                {image.caption && (
                  <p className="text-white text-center mt-4">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {prevBtnEnabled && (
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/50 text-gray-50 hover:bg-gray-900/75 transition-colors`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {nextBtnEnabled && (
          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/50 text-gray-50 hover:bg-gray-900/75 transition-colors`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Popover
