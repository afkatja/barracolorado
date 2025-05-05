"use client"

import React, { useState } from "react"
import { urlFor } from "../../sanity/lib/image"
import Image from "next/image"
import Popover from "@/components/Popover"
import GalleryAnimation from "@/components/GalleryAnimation"
// import useEmblaCarousel from "embla-carousel-react"

interface GalleryClientProps {
  gallery: {
    title: string
    description?: string
    images: Array<{
      _key: string
      asset: {
        _ref: string
      }
      alt: string
      caption?: string
    }>
  }
}

// Fisher-Yates shuffle algorithm
const shuffle = (array: any[]) => {
  const arr = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return arr
}

const GalleryClient = ({ gallery }: GalleryClientProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  // const [emblaRef] = useEmblaCarousel({
  //   align: "start",
  //   containScroll: "trimSnaps",
  // })

  // Shuffle the images array
  const shuffledImages = shuffle(gallery.images)

  return (
    <div className="mx-auto w-11/12">
      <h1 className="text-4xl font-bold text-white mb-2">{gallery.title}</h1>
      {gallery.description && (
        <p className="text-xl text-gray-200 mb-1">{gallery.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 auto-rows-[50px]">
        {shuffledImages.map((image, index) => {
          // Generate random height spans between 2 and 4
          const span = Math.floor(Math.random() * (index + 1)) + 2
          return (
            <GalleryAnimation
              key={image._key}
              className="cursor-pointer group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
              style={{ gridRowEnd: `span ${span}` }}
            >
              <div
                onClick={() => setSelectedImage(index)}
                className="relative h-full w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-20 transition-all duration-300" />
              </div>
            </GalleryAnimation>
          )
        })}
      </div>

      {selectedImage !== null && (
        <Popover
          selectedImage={shuffledImages[selectedImage]}
          onImageClick={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default GalleryClient
