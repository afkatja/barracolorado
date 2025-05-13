import React from "react"
import Section from "@/components/Section"
import { sanityFetch } from "../../../../sanity/lib/client"
import { PAGE_QUERY, SUB_PAGES_QUERY } from "../../../../sanity/lib/queries"
import PageCard from "./pageCard"
import { Page as PageType } from "../../../../types"
import { notFound } from "next/navigation"

type PageParams = Promise<{
  slug: string
  lang: string
}>

type PageProps = {
  params: PageParams
}

const Page = async ({ params }: PageProps) => {
  const { slug, lang } = await params

  const page = await sanityFetch<PageType>({
    query: PAGE_QUERY,
    params: { slug, locale: lang },
  })

  const pages = await sanityFetch<PageType[]>({
    query: SUB_PAGES_QUERY,
    params: { slug, locale: lang },
  })

  if (!page) return notFound()

  return (
    <>
      {page.title && page.content && (
        <Section
          key={page._id}
          id={page._id}
          title={page.title}
          content={page.content}
          image={page.mainImage}
        />
      )}
      <div className="main flex-1 md:fullscreen bg-linear-to-br from-teal-800 to-cyan-900 py-2">
        <section className="md:p-4 w-11/12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-4">
            {pages.map(page => (
              <PageCard key={page._id} page={page} slug={slug} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Page
