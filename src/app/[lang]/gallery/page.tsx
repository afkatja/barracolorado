import { notFound } from "next/navigation"

// import Gallery from "@/components/Gallery"
import { availableLocaleIds, getFallbackLocale } from "@/i18n"
import { sanityFetch } from "@/sanity/lib/client"
import { GALLERY_QUERY } from "@/sanity/lib/queries"
import { Gallery as GalleryType } from "@/types"

import PagesLayout from "../pagesLayout"

import GalleryClient from "./GalleryClient"

export async function generateStaticParams() {
  return availableLocaleIds.map(lang => ({
    lang,
  }))
}

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const fallbackLang = getFallbackLocale(lang)

  const gallery = await sanityFetch<GalleryType>({
    query: GALLERY_QUERY,
    params: { locale: fallbackLang },
  })

  if (!gallery) {
    return notFound()
  }

  return (
    <PagesLayout params={params}>
      <section
        id="gallery"
        className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-gray-50 flex justify-center py-2 md:py-4 flex-1`}
      >
        <GalleryClient gallery={gallery} />
      </section>
    </PagesLayout>
  )
}

export default page
