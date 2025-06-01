import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SanityDocument } from "next-sanity"

import { getFallbackLocale, availableLocaleIds } from "@/i18n"
import { sanityFetch } from "@/sanity/lib/client"
import { PACKAGE_QUERY, DIALOG_QUERY } from "@/sanity/lib/queries"
import { TFormData } from "@/types"

import Package from "./Package"

type PackageType = {
  _id: string
  _type: string
  title: string
  subtitle?: string
  description?: string
  content?: SanityDocument | string
  mainImage?: SanityImageObject
  price?: string
  slug: { current: string }
  dialog: TFormData
}

export async function generateStaticParams() {
  return availableLocaleIds.map(lang => ({
    lang,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { slug, lang } = await params
  const fallbackLang = getFallbackLocale(lang)

  const packageData = await sanityFetch<PackageType>({
    query: PACKAGE_QUERY,
    params: { locale: fallbackLang, slug },
  })

  if (!packageData) {
    return {
      title: "Package Not Found",
    }
  }

  return {
    title: packageData.title,
    description: packageData.description,
  }
}

const PackagePage = async ({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) => {
  const { lang, slug } = await params
  const fallbackLang = getFallbackLocale(lang)

  const packageData = await sanityFetch<PackageType>({
    query: PACKAGE_QUERY,
    params: { locale: fallbackLang, slug },
  })

  if (!packageData) {
    return notFound()
  }

  const dialog = await sanityFetch<TFormData>({
    query: DIALOG_QUERY,
    params: { locale: fallbackLang, slug },
  })

  return <Package formData={dialog} packageData={packageData} lang={lang} />
}

export default PackagePage
