import React from "react"
import { sanityFetch } from "../../../sanity/lib/client"
import { SanityDocument } from "next-sanity"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { BLOG_POSTS_QUERY } from "../../../sanity/lib/queries"
import PagesLayout from "../pagesLayout"
import PostCard from "./PostCard"
export default async function BlogPage({
  params,
}: {
  params: { lang: string }
}) {
  const { lang } = await params
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
  >({
    query: BLOG_POSTS_QUERY,
    params: { locale: lang },
  })

  return (
    <PagesLayout params={{ lang }}>
      <div
        className="main bg-linear-to-br from-teal-800 to-cyan-900 py-2 
        min-h-screen"
      >
        <section className="w-11/12 mx-auto">
          <h1 className="text-3xl font-bold text-gray-50 mb-8">Blog Posts</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        </section>
      </div>
    </PagesLayout>
  )
}
