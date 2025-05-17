import React from "react"
import { sanityFetch } from "../../../../sanity/lib/client"
import { SanityDocument } from "next-sanity"
import Image from "next/image"
import { urlFor } from "../../../../sanity/lib/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { BLOG_POST_QUERY } from "../../../../sanity/lib/queries"
import RichText from "../../../../components/RichText"
import PagesLayout from "../../pagesLayout"
import Breadcrumbs from "@/components/Breadcrumbs"
import { notFound } from "next/navigation"

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>
}) {
  const { slug, lang } = await params

  const post = await sanityFetch<{
    _id: string
    title: string
    subtitle?: string
    slug: { current: string }
    mainImage?: SanityImageObject
    content?: SanityDocument
    description?: string
    _createdAt: string
  }>({
    query: BLOG_POST_QUERY,
    params: { slug, locale: lang },
  })

  if (!post) return notFound()

  return (
    <PagesLayout params={params}>
      <div className="w-11/12 mx-auto py-1">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />
      </div>
      {/* Hero Section with Full-screen Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {post?.mainImage && (
          <Image
            src={urlFor(post.mainImage).url()}
            fill
            className="object-cover"
            alt={post.description ?? ""}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-gray-50">
          <div className=" absolute top-0 left-0 text-sm text-gray-300 mb-2 bg-gray-900/50 p-2 rounded-lg">
            {new Date(post._createdAt).toLocaleDateString(lang)}
          </div>
          <div className="w-11/12 mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <h2 className="text-xl md:text-2xl text-gray-200">
                {post.subtitle}
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="main bg-linear-to-br from-teal-800 to-cyan-900 md:py-4">
        <article className="py-2 w-11/12 mx-auto">
          <div className="bg-gray-100 rounded-lg shadow-lg p-2 md:p-4 max-w-4xl mx-auto">
            {post.description && (
              <p className="text-lg text-gray-600 mb-8 italic border-l-4 border-teal-500 pl-4">
                {post.description}
              </p>
            )}

            {post.content && <RichText body={post.content} />}
          </div>
        </article>
      </div>
    </PagesLayout>
  )
}
