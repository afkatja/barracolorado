import React from "react"
import Section from "../../../components/Section"
import { sanityFetch } from "../../../sanity/lib/client"
import { PAGES_QUERY } from "../../../sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import { truncateString } from "../../../lib/string"
import blockToText from "../../../sanity/lib/blockToText"
import Link from "next/link"

const Page = async () => {
  const pages = await sanityFetch<
    {
      _id: string
      slug: { current: string }
      title: string
      body: SanityDocument
      description?: string
    }[]
  >({ query: PAGES_QUERY, params: { category: "sections" } })
  return (
    <>
      {pages.map(page => (
        <Section
          key={page._id}
          id={page._id}
          title={page.title}
          content={
            page?.description ?? truncateString(blockToText(page.body), 200)
          }
        >
          <Link href={`/topics/${page.slug.current}`} className="ml-auto">
            Read more
          </Link>
        </Section>
      ))}
    </>
  )
}

export default Page
