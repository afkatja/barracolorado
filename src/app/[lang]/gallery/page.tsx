import { sanityFetch } from "../../../sanity/lib/client"
import { GALLERY_QUERY } from "../../../sanity/lib/queries"
import PagesLayout from "../pagesLayout"
import GalleryClient from "./GalleryClient"
import { notFound } from "next/navigation"

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const gallery = await sanityFetch<{
    title: string
    description?: string
    images: Array<{
      _key: string
      asset: {
        _ref: string
      }
      alt: string
      caption?: string
    }>
  }>({ query: GALLERY_QUERY })

  if (!gallery) return notFound()

  return (
    <PagesLayout params={params}>
        <section
          className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-gray-50 flex justify-center items-center py-2 md:py-4 flex-1`}
        >
          {!gallery ? (
            <div>No gallery found</div>
          ) : (
            <GalleryClient gallery={gallery} />
          )}
        </section>
    </PagesLayout>
  )
}
