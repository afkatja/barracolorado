import Image from "next/image"
import React from "react"
import { urlFor } from "../sanity/lib/image"
import Carousel from "./Carousel"
import { Media } from "../types"

const MediaComponent = ({ media }: { media: Media }) => {
  const determineMediaType = () => {
    switch (media.type) {
      case "singleImage":
        return (
          <Image
            src={urlFor(media.singleImage).url()}
            alt=""
            width={1200}
            height={780}
            className="h-full w-full object-cover"
          />
        )
      case "video":
        return (
          <video
            src={media.video.url}
            controls={false}
            autoPlay
            loop
            muted
            className="h-full w-full object-cover"
          />
        )
      case "imageGallery":
        return (
          <Carousel
            images={media.imageGallery}
            autoPlay
            loop
            transitionStyle="fade"
            selectedImage={media.imageGallery[1]}
            className="h-full w-full"
          />
        )
      default:
        return null
    }
  }
  return (
    <div className="absolute top-0 left-0 h-[calc(100vh-var(--header-height))] w-screen">
      {determineMediaType()}
    </div>
  )
}

export default MediaComponent
