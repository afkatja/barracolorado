import React from "react"
import { sanityFetch } from "../../../../sanity/lib/client"
import { PACKAGE_QUERY } from "../../../../sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import PackageComponent from "./Package"
import { TFormData } from "../../../../types"

type PackageType = {
  _id: string
  slug: { current: string }
  title: string
  subtitle?: string
  description?: string
  content?: SanityDocument | string
  mainImage: SanityImageObject
  dialog?: TFormData
}

const Package = async ({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) => {
  const { lang, slug } = await params
  const packageData = await sanityFetch<PackageType>({
    query: PACKAGE_QUERY,
    params: { language: lang, slug },
  })

  return (
    <PackageComponent
      formData={packageData.dialog}
      packageData={packageData}
      lang={lang}
    />
  )
}

export default Package
