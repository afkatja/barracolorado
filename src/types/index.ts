import { SanityDocument } from "@sanity/client"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"

export type Locale = "en" | "fr" | "nl" | "es"

export type PageParams = {
  slug: string
  lang: Locale
}

export type PageProps = {
  params: PageParams
}

export type Document = {
  _id: string
  _type: string
  title: string
  language: Locale
  translations?: SanityDocument[]
}

export type Page = Omit<Document, "language" | "_type"> & {
  slug: {
    current: string
  }
  title?: string
  subtitle?: string
  description?: string
  content: string | SanityDocument
  mainImage: SanityImageObject
}

export type Post = Document & {
  slug: {
    current: string
  }
  publishedAt: string
  excerpt: string
  coverImage: any // Replace with your image type
  content: any // Replace with your content type
}

export type Home = Document & {
  subtitle: string
  description: string
  media: Media
}

export type Gallery = {
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
}

export type TContact = {
  title: string
  subtitle: string
  formLabels: {
    nameLabel: string
    emailLabel: string
    messageLabel: string
    submitButton: string
  }
}

export type Media = {
  type: string
  singleImage: SanityImageObject
  video: { url: string }
  imageGallery: (SanityImageObject & {
    caption?: string
    alt: string
    _key: string
  })[]
}
