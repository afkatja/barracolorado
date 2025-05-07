import React from "react"

import { truncateString } from "../../../../lib/string"
import blockToText from "../../../../sanity/lib/blockToText"
import { urlFor } from "../../../../sanity/lib/image"
import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Page as PageType } from "../../../../types"
import { SanityDocument } from "@sanity/client"
const pageCard = ({ page, slug }: { page: PageType; slug: string }) => {
  return (
    <Link
      key={page._id}
      href={`/${slug}/${page.slug.current}`}
      className="group bg-gray-50 p-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-3"
    >
      {page?.mainImage && (
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          <Image
            src={urlFor(page.mainImage).url()}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            alt={page.description ?? ""}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{page.title}</h3>
        <p className="text-gray-600 text-sm">
          {page?.description ??
            truncateString(blockToText(page.content as SanityDocument), 100)}
        </p>
        <div className="flex items-center justify-end text-teal-600 group-hover:text-teal-700 mt-auto">
          <span className="text-sm font-medium">Read more</span>
          <ArrowRightIcon className="w-1.5 h-1.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  )
}

export default pageCard
