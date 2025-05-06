import { sanityFetch } from "../../sanity/lib/client"
import { GALLERY_QUERY } from "../../sanity/lib/queries"
import PagesLayout from "../pagesLayout"
import GalleryClient from "./GalleryClient"

export default async function GalleryPage() {
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
  return (
    <PagesLayout>
      <section
        className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-white flex justify-center items-center py-2 md:py-4 flex-1`}
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
