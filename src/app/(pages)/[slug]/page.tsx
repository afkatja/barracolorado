import React from "react"
import Section from "../../../components/Section"
import { sanityFetch } from "../../../sanity/lib/client"
import { PAGE_QUERY, SUB_PAGES_QUERY } from "../../../sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import { truncateString } from "../../../lib/string"
import blockToText from "../../../sanity/lib/blockToText"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params

  const page = await sanityFetch<{
    _id: string
    slug: { current: string }
    title: string
    body: SanityDocument
    description?: string
  }>({ query: PAGE_QUERY, params: { slug } })
  const pages = await sanityFetch<
    {
      _id: string
      slug: { current: string }
      title: string
      mainImage: SanityImageObject
      body: SanityDocument
      description?: string
    }[]
  >({ query: SUB_PAGES_QUERY, params: { parent: slug } })
  console.log({ pages })

  return (
    <>
      <Section
        key={page._id}
        id={page._id}
        title={page.title}
        content={page.body}
      />
      <div className="main fullscreen bg-linear-to-br from-teal-800 to-cyan-900">
        <section className={` p-4 w-11/12 mx-auto`}>
          <div className="grid grid-cols-4 gap-4">
            {pages.map(page => (
              <Link
                key={page._id}
                href={`/${slug}/${page.slug.current}`}
                className="bg-gray-100 p-2 md:col-span-2 rounded-md md:flex gap-1.5 items-start"
              >
                {page?.mainImage && (
                  <Image
                    src={urlFor(page.mainImage).url()}
                    width={100}
                    height={100}
                    alt={page.description ?? ""}
                  />
                )}
                {page?.description ??
                  truncateString(blockToText(page.body), 100)}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Page
