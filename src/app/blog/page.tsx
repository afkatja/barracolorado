import React from "react"
import { sanityFetch } from "../../sanity/lib/client"
import { SanityDocument } from "next-sanity"
import { truncateString } from "../../lib/string"
import blockToText from "../../sanity/lib/blockToText"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { BLOG_POSTS_QUERY } from "../../sanity/lib/queries"

export default async function BlogPage() {
  const posts = await sanityFetch<
    {
      _id: string
      title: string
      slug: { current: string }
      mainImage: SanityImageObject
      body: SanityDocument
      description?: string
      _createdAt: string
    }[]
  >({ query: BLOG_POSTS_QUERY })

  return (
    <div className="main bg-linear-to-br from-teal-800 to-cyan-900 py-2">
      <section className="w-11/12 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Blog Posts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-3"
            >
              {post?.mainImage && (
                <div className="relative w-full aspect-video overflow-hidden rounded-md">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={post.description ?? ""}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {post?.description ??
                    truncateString(blockToText(post.body), 100)}
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
  )
}
