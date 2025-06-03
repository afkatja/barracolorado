"use client"
import React from "react"
import { Link, Element } from "react-scroll"

import GalleryClient, { GalleryClientProps } from "./gallery/GalleryClient"

const HomeGallery = ({
  gallery,
  contact,
}: {
  gallery: GalleryClientProps["gallery"]
  contact: boolean
}) => {
  return (
    <Element
      name="gallery"
      className={`main min-h-[calc(100vh-var(--header-height))]`}
    >
      <section
        id="gallery"
        className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-gray-50 flex justify-center py-2 md:py-4 flex-1`}
      >
        {gallery && <GalleryClient gallery={gallery} />}
      </section>
      {contact && (
        <Link
          to="contact"
          duration={500}
          smooth
          offset={-100}
          className="button style2 down anchored hover:bg-teal-700 text-gray-50 font-bold py-2 px-1 rounded-4xl animate-pulse"
        >
          Next
        </Link>
      )}
    </Element>
  )
}

export default HomeGallery
