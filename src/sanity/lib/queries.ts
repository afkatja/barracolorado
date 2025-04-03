import { groq } from "next-sanity"

export const PAGES_QUERY = groq`*[_type == "page" && defined(slug.current)][0...12]{
  _id, title, slug, subtitle, body, _createdAt, _updatedAt, isPublished
}`

export const PAGE_QUERY = groq`
  *[_type == 'page' && slug.current == $pageName][0] {
    _id, title, subtitle, description, mainImage, body, isPublished
    }`

export const NAV_QUERY = groq`
  *[_type == 'page' && $category in categories[] -> title] {
    _id, title, slug, isPublished,
  }
`
