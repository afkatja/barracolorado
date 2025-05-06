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
import { ArrowRightIcon } from "@radix-ui/react-icons"

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

  return (
    <>
      <Section
        key={page._id}
        id={page._id}
        title={page.title}
        content={page.body}
      />
      <div className="main md:fullscreen bg-linear-to-br from-teal-800 to-cyan-900 py-2">
        <section className={`md:p-4 w-11/12 mx-auto`}>
          <div className="grid md:grid-cols-4 gap-1 md:gap-4">
            {pages.map(page => (
              <Link
                key={page._id}
                href={`/${slug}/${page.slug.current}`}
                className="group bg-white p-2 md:col-span-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-3"
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
                  <h3 className="text-lg font-semibold text-gray-800">
                    {page.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {page?.description ??
                      truncateString(blockToText(page.body), 100)}
                  </p>
                  <div className="flex items-center justify-end text-teal-600 group-hover:text-teal-700 mt-auto">
                    <span className="text-sm font-medium">Read more</span>
                    <ArrowRightIcon className="w-1.5 h-1.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Page
