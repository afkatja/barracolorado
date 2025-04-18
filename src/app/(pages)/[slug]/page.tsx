import React from "react"
import { sanityFetch } from "../../../sanity/lib/client"
import { PAGE_QUERY } from "../../../sanity/lib/queries"
import Section from "../../../components/Section"
import { SanityDocument } from "next-sanity"

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
    body: SanityDocument
  }>({
    query: PAGE_QUERY,
    revalidate: 0,
    params: { slug },
  })

  return (
    <>
      <Section
        key={content._id}
        id={content._id}
        title={content.title}
        content={content.body}
      />
    </>
  )
}

export default Page
