import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SanityDocument } from "next-sanity"
import React from "react"

import Breadcrumbs from "@/components/Breadcrumbs"
import Section from "@/components/Section"
import { generatePageMetadata } from "@/lib/metadata"
import { sanityFetch } from "@/sanity/lib/client"
import { PAGE_QUERY } from "@/sanity/lib/queries"

import { Page as PageType } from "../../../../../types"

type PageProps = {
  params: Promise<{
    slug: string
    lang: string
    subSlug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, lang } = await params
  const page = await sanityFetch<PageType>({
    query: PAGE_QUERY,
    params: { slug, locale: lang },
  })

  return generatePageMetadata(page)
}

const Page = async ({ params }: PageProps) => {
  const { lang, subSlug, slug } = await params
  const subPage = await sanityFetch<PageType & { parent: SanityDocument }>({
    query: PAGE_QUERY,
    revalidate: 0,
    params: { slug: subSlug, locale: lang },
  })

  if (!subPage) return notFound()

  const { title, description, mainImage, content, parent } = subPage

  return (
    <>
      <div className="w-11/12 mx-auto py-1">
        <Breadcrumbs
          items={[
            { label: parent.title, href: `/${lang}/${slug}` },
            { label: title, href: `/${lang}/${slug}/${subSlug}` },
          ]}
        />
      </div>
      <Section
        id={subPage._id}
        title={title}
        description={description}
        image={mainImage}
        content={content}
        asSection={false}
      />
    </>
  )
}

export default Page
