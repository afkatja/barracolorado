import { type SchemaTypeDefinition } from "sanity"

import {
  blockContentType,
  categoryType,
  pageType,
  postType,
  linkType,
  navItemType,
  navigationType,
  galleryType,
} from "./schemaTypes"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    pageType,
    postType,
    linkType,
    navItemType,
    navigationType,
    galleryType,
  ],
}
