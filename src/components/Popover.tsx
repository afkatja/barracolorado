import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import React from "react"
import { urlFor } from "../sanity/lib/image"
import Image from "next/image"
const Popover = ({
  selectedImage,
  onImageClick,
}: {
  selectedImage: SanityImageObject & { caption?: string; alt: string }
  onImageClick: () => void
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900/90 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onImageClick}
      >
        ×
      </button>
      <div className="relative max-w-4xl w-full">
        <div className="relative aspect-video">
          <Image
            src={urlFor(selectedImage).url()}
            alt={selectedImage.alt}
            fill
            className="object-contain"
          />
        </div>
        {selectedImage.caption && (
          <p className="text-white text-center mt-4">{selectedImage.caption}</p>
        )}
      </div>
    </div>
  )
}

export default Popover
