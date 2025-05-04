import React from "react"
import { sanityFetch } from "../../../sanity/lib/client"
import { SanityDocument } from "next-sanity"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { BLOG_POST_QUERY } from "../../../sanity/lib/queries"
import RichText from "../../../components/RichText"

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const post = await sanityFetch<{
    _id: string
    title: string
    subtitle?: string
    slug: { current: string }
    mainImage?: SanityImageObject
    body?: SanityDocument
    description?: string
    _createdAt: string
  }>({ query: BLOG_POST_QUERY, params: { slug } })

  return (
    <div className="main bg-linear-to-br from-teal-800 to-cyan-900 py-2">
      <article className="md:p-4 w-11/12 mx-auto">
        <div className="bg-gray-100 rounded-lg shadow-lg p-2 md:p-4">
          {post?.mainImage && (
            <div className="relative w-full aspect-video mb-2 rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                fill
                className="object-cover"
                alt={post.description ?? ""}
                priority
              />
            </div>
          )}

          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <h2 className="text-xl mb-4 ">{post.subtitle}</h2>
            )}
          </header>

          {post.description && (
            <p className="text-lg text-gray-600 mb-8">{post.description}</p>
          )}
          <RichText body={post.body} />
        </div>
      </article>
    </div>
  )
}
