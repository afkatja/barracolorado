import React from "react"
import CardAnimation from "../../../components/CardAnimation"
import { urlFor } from "../../../sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import { truncateString } from "../../../lib/string"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const PostCard = ({ post, index }: { post: any; index: number }) => {
  return (
    <CardAnimation key={post._id} index={index}>
      <Link
        href={`/blog/${post.slug.current}`}
        className="group bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-3"
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
          <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
          <p className="text-gray-600 text-sm">
            {post?.description ?? truncateString(post.description ?? "", 100)}
          </p>
        </div>
        <div className="flex items-center text-teal-600">
          <span>Read more</span>
          <ArrowRightIcon className="ml-2" />
        </div>
      </Link>
    </CardAnimation>
  )
}

export default PostCard
