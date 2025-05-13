import React from "react"
import { PAGE_QUERY } from "@/sanity/lib/queries"
import Section from "@/components/Section"
import Breadcrumbs from "@/components/Breadcrumbs"
import { sanityFetch } from "@/sanity/lib/client"
import { Page as PageType } from "../../../../../types"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{
    slug: string
    lang: string
    subSlug: string
  }>
}

const Page = async ({ params }: PageProps) => {
  const { lang, subSlug, slug } = await params
  const subPage = await sanityFetch<PageType>({
    query: PAGE_QUERY,
    revalidate: 0,
    params: { slug: subSlug, locale: lang },
  })

  if (!subPage) return notFound()

  const { title, subtitle, description, mainImage, content } = subPage

  return (
    <>
      <div className="w-11/12 mx-auto py-1">
        <Breadcrumbs
          items={[
            { label: slug, href: `/${slug}` },
            { label: title, href: `/${slug}/${subSlug}` },
          ]}
        />
      </div>
      <Section
        id={subPage._id}
        title={title}
        subtitle={subtitle}
        description={description}
        image={mainImage}
        content={content}
      />
    </>
  )
}

export default Page
