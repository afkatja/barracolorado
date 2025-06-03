import { SanityDocument } from "@sanity/client"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"

export type Locale = "en" | "fr" | "nl" | "es"

export type PageParams = Promise<{
  slug: string
  lang: Locale
}>

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

export type Page = Omit<Document, "language"> & {
  slug: {
    current: string
  }
  title?: string
  subtitle?: string
  description?: string
  content?: string | SanityDocument
  mainImage?: SanityImageObject
  keywords?: string[]
}

export interface NavigationPage {
  _id: string
  _type: string
  title: string
  displayTitle?: string
  slug: {
    current: string
  }
  subItems?: Array<{
    _id: string
    _type: string
    title: string
    displayTitle?: string
    slug: {
      current: string
    }
  }>
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

export type TFormData = {
  title: string
  subtitle?: string
  description?: string
  formLabels: {
    nameLabel: string
    emailLabel: string
    peopleLabel: string
    dateLabel: string
    submitButton: string
  }
  formValidation: {
    required: string
    invalidEmail: string
    minPeople: string
    maxPeople: string
  }
  formSettings: {
    minPeople: number
    maxPeople: number
    availableDates: Array<{
      date: string
      availableSlots: number
    }>
  }
}
