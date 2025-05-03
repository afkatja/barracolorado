import { groq } from "next-sanity"

export const ALL_PAGES_QUERY = groq`*[_type == "page" && defined(slug.current) && $category in categories[] -> title][0...12]{
  _id, title, slug, subtitle, body, _createdAt, _updatedAt, isPublished
}`

export const SUB_PAGES_QUERY = groq`
  *[_type == 'page' && defined(parent) && parent->slug.current == $parent][] {
    _id, title, subtitle, body, slug, isPublished, mainImage
  }
`

export const PAGE_QUERY = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    _id, title, subtitle, description, mainImage, body, isPublished
}`

export const NAV_QUERY = groq`*[_type == 'navigation'][0] {
  _id, 
  title, 
  'slug': navId, 
  items[] -> {
    _id,
    title,
    'slug': navItemUrl.internalLink->slug,
    isMainNavItem,
    parent->{
      _id,
      title,
      'slug': navItemUrl.internalLink->slug
    },
    order
  }
}`

export const NAV_ROUTE_QUERY = groq`
  *[_type == 'page' && $category in categories[] -> title && route == true] {
    _id, title, slug, isPublished, route
  }
`
