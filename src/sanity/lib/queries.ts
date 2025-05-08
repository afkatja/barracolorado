import { groq } from "next-sanity"

// Common translation query
const TRANSLATION_QUERY = `"translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->`

export const ALL_PAGES_QUERY = groq`*[_type == "page" && language == $locale && homeSection == true] {
  _id,
  _type,
  title,
  subtitle,
  description, 
  mainImage,
  slug,
  language,
  homeSection,
  ${TRANSLATION_QUERY}
}`

export const SUB_PAGES_QUERY = groq`*[_type == "page" && language == $locale && parent->slug.current == $slug] {
  _id,
  _type,
  title,
  slug,
  language,
  mainImage,
  description,
  "content": body,
  ${TRANSLATION_QUERY}
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug && language == $locale][0] {
  _id,
  _type,
  title,
  slug,
  language,
  content,
  ${TRANSLATION_QUERY}
}`

export const HOME_QUERY = groq`*[_type == 'home' && language == $locale][0] {
  _id,
  title,
  subtitle,
  description,
  image,
  language,
  ${TRANSLATION_QUERY}
}`

export const GALLERY_QUERY = groq`*[_type == 'gallery'][0] {
  _id,
  title,
  description,
  images
}`

export const BLOG_POSTS_QUERY = groq`*[_type == "post" && language == $locale] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage,
  language,
  ${TRANSLATION_QUERY}
}`

export const BLOG_POST_QUERY = groq`*[_type == "post" && slug.current == $slug && language == $locale][0] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage,
  content,
  language,
  ${TRANSLATION_QUERY}
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
