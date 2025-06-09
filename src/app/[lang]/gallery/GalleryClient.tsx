"use client"

import Image from "next/image"
import React, { useState, useMemo } from "react"

import Dialog from "@/components/Dialog"
import GalleryAnimation from "@/components/GalleryAnimation"
import { urlFor } from "@/sanity/lib/image"

import Carousel from "../../../components/Carousel"
import { CarouselImage } from "../../../types"

export interface GalleryClientProps {
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

const GalleryClient = ({ gallery }: GalleryClientProps) => {
  const [selectedImage, setSelectedImage] = useState<CarouselImage | null>(null)

  // const imageDimensions = () => {
  //   const dimensions: {
  //     [key: string]: { rowSpan: number /*colSpan: number*/ }
  //   } = {}
  //   let prevRowSpan = 1
  //   // let prevColSpan = 0

  //   gallery.images.forEach(image => {
  //     let rowSpan //, colSpan
  //     do {
  //       rowSpan = Math.floor(Math.random() * 3) + 1
  //       // colSpan = Math.random() > 0.7 ? 2 : 1
  //     } while (rowSpan === prevRowSpan /*&& colSpan === prevColSpan*/)

  //     dimensions[image._key] = { rowSpan /*colSpan*/ }
  //     prevRowSpan = rowSpan
  //     // prevColSpan = colSpan
  //   })

  //   return dimensions
  // }

  // Memoize the shuffled images to prevent re-shuffling on re-renders
  const shuffledImages = useMemo(() => {
    const shuffleSeed = Math.random()
    return [...gallery.images].sort((a, b) => {
      const hashA = (a._key + shuffleSeed)
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const hashB = (b._key + shuffleSeed)
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      return hashA - hashB
    })
  }, [gallery.images])

  const handleImageClick = (image: CarouselImage) => setSelectedImage(image)

  const handleDialogClose = () => setSelectedImage(null)

  return (
    <div className="mx-auto w-11/12">
      <h1 className="text-4xl font-bold text-gray-50 mb-2 text-center">
        {gallery.title}
      </h1>
      {gallery.description && (
        <p className="text-xl text-gray-200 mb-2 text-center">
          {gallery.description}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 auto-rows-[100px]">
        {shuffledImages.map((image, index) => {
          // const { rowSpan, colSpan } = imageDimensions()[image._key]
          return (
            <div
              key={image._key}
              className="cursor-pointer group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
              style={{
                gridRowEnd: `span ${Math.floor(Math.random() * 2) + 1}`,
                // gridColumnEnd: `span ${colSpan}`,
              }}
            >
              <div
                onClick={() => handleImageClick(image)}
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
            </div>
          )
        })}
      </div>

      {selectedImage !== null && (
        <Dialog
          className="min-h-11/12 md:min-h-2/3 w-11/12 md:w-2/3"
          isOpen={!!selectedImage}
          onClose={handleDialogClose}
        >
          <Carousel
            id="gallery"
            selectedImage={selectedImage}
            images={gallery.images}
            transitionStyle="fade"
            className="flex-1 w-full"
            autoPlay={false}
          />
        </Dialog>
      )}
    </div>
  )
}

export default GalleryClient
