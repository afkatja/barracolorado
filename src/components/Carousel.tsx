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
      containScroll: transitionStyle === "scroll" ? "trimSnaps" : false,
      loop: loop || false,
      // dragFree: transitionStyle === "scroll",
    },
    transitionStyle === "fade" ? [Fade()] : []
  )
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  // const [autoplayActive, setAutoplayActive] = useState(autoPlay || false)
  // const [currentIndex, setCurrentIndex] = useState(0)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
    // setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return
    if (!autoPlay) return

    const autoplay = () => {
      scrollNext()
    }
    const interval = setInterval(autoplay, AUTOPLAY_DELAY)

    // Pause autoplay on hover
    // const container = emblaApi.containerNode()
    // const pauseAutoplay = () => setAutoplayActive(false)
    // const resumeAutoplay = () => setAutoplayActive(true)

    // container.addEventListener("mouseenter", pauseAutoplay)
    // container.addEventListener("mouseleave", resumeAutoplay)

    return () => {
      clearInterval(interval)
      // container.removeEventListener("mouseenter", pauseAutoplay)
      // container.removeEventListener("mouseleave", resumeAutoplay)
    }
  }, [emblaApi, autoPlay, scrollNext])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    // Find and scroll to the selected image
    const selectedIndex = images.findIndex(
      img => img._key === selectedImage?._key
    )
    if (selectedIndex !== -1) {
      emblaApi.scrollTo(selectedIndex)
    }

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, images, selectedImage?._key, onSelect])

  return (
    <div className={`overflow-hidden embla ${className}`} ref={emblaRef}>
      <div
        className={`${transitionStyle === "scroll" ? "flex" : "relative w-full"} h-full embla__container`}
      >
        {images.map(image => (
          <div
            key={image._key}
            className={`embla__slide ${transitionStyle === "scroll" ? "flex-[0_0_100%]" : "absolute w-full h-full"}`}
          >
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
        <div>
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
      ) : null}
    </div>
  )
}

export default Carousel
