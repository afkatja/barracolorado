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
export const PAGES_QUERY = groq`*[_type == "page" && language == $locale] {
  _id,
  title,
  displayTitle,
  slug,
  language,
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
  subtitle,
  description,
  slug,
  language,
  'content': body,
  mainImage,
  parent->,
  ${TRANSLATION_QUERY}
}`

export const HOME_QUERY = groq`*[_type == 'home' && language == $locale][0] {
  _id,
  title,
  subtitle,
  description,
  "media": {
    "type": media.type,
    "singleImage": media.singleImage,
    "video": media.video.asset->{url},
    "imageGallery": media.imageGallery[]
  },
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
  mainImage,
  language,
  ${TRANSLATION_QUERY}
}`

export const BLOG_POST_QUERY = groq`*[_type == "post" && slug.current == $slug && language == $locale][0] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  description,
  mainImage,
  "content": body,
  language,
  _createdAt,
  ${TRANSLATION_QUERY}
}`

export const NAV_QUERY = groq`*[_type == 'navigation'][0] {
  _id,
  title,
  'navSlug': navId,
  'items': menuPages[]-> {
    _id,
    _type,
    title,
    displayTitle,
    slug,
    language,
    ${TRANSLATION_QUERY},
    "subItems": *[_type == 'page' && parent._ref == ^._id] | order(menuOrder asc, title asc) {
      _id,
      _type,
      title,
      displayTitle,
      slug,
      language,
      menuOrder,
      ${TRANSLATION_QUERY}
    }
  }
}`

export const seoSettingsQuery = `*[_type == "seoSettings"][0] {
  title,
  description,
  keywords,
  "ogImage": ogImage.asset->url,
  ogTitle,
  ogDescription
}`

export const CONTACT_QUERY = groq`
  *[_type == "contact" && language == $language][0] {
    title,
    subtitle,
    formLabels {
      nameLabel,
      emailLabel,
      messageLabel,
      submitButton
    }
  }
`

export const PACKAGE_QUERY = groq`
  *[_type == 'package' && language == $language && slug.current == $slug][0] {
    _id,
    _type,
    title,
    subtitle,
    description,
    slug,
    language,
    'content': body,
    mainImage,
    parent->,
    'dialog': packageDialog {
      'title': dialogTitle,
      'subtitle': dialogSubtitle,
      'description': dialogDescription,
      formLabels {
        nameLabel,
        emailLabel,
        peopleLabel,
        dateLabel,
        submitButton
      },
      formValidation {
        required,
        invalidEmail,
        minPeople,
        maxPeople
      },
      formSettings {
        minPeople,
        maxPeople,
        'availableDates': coalesce(
          availableDates[] {
            date,
            availableSlots
          },
          [{
            'date': dateTime(now()),
            'availableSlots': 1
          }]
        )
      }
    },
    ${TRANSLATION_QUERY}
  }
`

export const DIALOG_QUERY = groq`*[_type == "dialog" && language == $language && slug == $slug][0] {
  title,
  subtitle,
  description,
  formLabels {
    nameLabel,
    emailLabel,
    peopleLabel,
    dateLabel,
    submitButton
  },
  formValidation {
    required,
    invalidEmail,
    minPeople,
    maxPeople
  },
  formSettings {
    minPeople,
    maxPeople,
    availableDates[] {
      date,
      availableSlots
    }
  }
}`
