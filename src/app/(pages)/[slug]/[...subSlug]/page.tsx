import React from "react"
import { sanityFetch } from "../../../../sanity/lib/client"
import { PAGE_QUERY } from "../../../../sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { urlFor } from "../../../../sanity/lib/image"
import RichText from "../../../../components/RichText"

const Page = async ({
  params,
}: {
  params: Promise<Record<string, string>>
}) => {
  const { slug } = await params
  const content = await sanityFetch<{
    _id: string
    slug: { current: string }
    title: string
    subtitle?: string
    description?: string
    body: SanityDocument
    mainImage?: SanityImageObject & { alt: string }
  }>({
    query: PAGE_QUERY,
    revalidate: 0,
    params: { slug },
  })

  const image = content?.mainImage ? urlFor(content?.mainImage) : null

  return (
    <>
      <section className="m-auto w-11/12">
        <header className="major">
          <h1 className="text-5xl text-center p-5">{content.title}</h1>
          {content?.subtitle && <p>{content.subtitle}</p>}
        </header>
        {image && (
          <div className="image main">
            <Image src={image.url()} alt="test" />
          </div>
        )}
        <RichText body={content.body} />
      </section>
    </>
  )
}

export default Page
