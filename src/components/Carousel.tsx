"use client"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import Fade from "embla-carousel-fade"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState, useCallback } from "react"

import { urlFor } from "../sanity/lib/image"

type TransitionStyle = "scroll" | "fade"

type ICarousel = {
  id?: string
  selectedImage?: SanityImageObject & {
    caption?: string
    alt: string
    _key: string
  }
  images: Array<
    SanityImageObject & { caption?: string; alt: string; _key: string }
  >
  autoPlay?: boolean
  loop?: boolean
  className?: string
  transitionStyle?: TransitionStyle
}

const AUTOPLAY_DELAY = 3000

const Carousel = ({
  id,
  selectedImage,
  images,
  autoPlay,
  loop,
  className,
  transitionStyle = "scroll",
}: ICarousel) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      // containScroll: transitionStyle === "scroll" ? "trimSnaps" : false,
      loop: loop || false,
      // dragFree: transitionStyle === "scroll",
    },
    transitionStyle === "fade" ? [Fade()] : []
  )
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()

  const scrollNext = useCallback(() => {
    if (!emblaApi) return

    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  const onInit = useCallback(() => {
    if (!emblaApi) return
    onSelect()
  }, [emblaApi, onSelect])

  // Initialize carousel
  useEffect(() => {
    if (!emblaApi) return

    // emblaApi.on("reInit", onInit)
    emblaApi.on("select", () => {
      onSelect()
    })

    return () => {
      // emblaApi.off("reInit", onInit)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return
    if (!autoPlay) return

    const autoplay = () => {
      scrollNext()
    }
    const interval = setInterval(autoplay, AUTOPLAY_DELAY)

    return () => {
      clearInterval(interval)
    }
  }, [emblaApi, autoPlay, scrollNext])

  // Handle selected image
  useEffect(() => {
    if (!emblaApi) return

    const selectedIndex = images.findIndex(
      img => img._key === selectedImage?._key
    )
    if (selectedIndex !== -1) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        emblaApi.scrollTo(selectedIndex, true)
      })
    }
  }, [emblaApi, images, selectedImage?._key])

  return (
    <div id={id} className={`embla ${className}`}>
      <div
        ref={emblaRef}
        className="embla__viewport h-full w-full overflow-hidden"
      >
        <div className="flex h-full embla__container">
          {images.map((image, index) => (
            <div key={image._key} className="flex-[0_0_100%] relative">
              <Image
                src={urlFor(image).url()}
                alt={image.alt ?? ""}
                fill
                className="object-cover"
              />
              {image.caption && (
                <p className="text-gray-50 text-center mt-4">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
        {!autoPlay ? (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center right-0">
            {prevBtnEnabled && (
              <button
                className={`rounded-full bg-gray-900/50 text-gray-50 hover:bg-gray-900/75 transition-colors cursor-pointer w-6 h-6 flex items-center justify-center`}
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {nextBtnEnabled && (
              <button
                className={`rounded-full bg-gray-900/50 text-gray-50 hover:bg-gray-900/75 transition-colors cursor-pointer w-6 h-6 flex items-center justify-center ml-auto`}
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Carousel
