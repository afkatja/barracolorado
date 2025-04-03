import { type SchemaTypeDefinition } from "sanity"

import {
  blockContentType,
  categoryType,
  pageType,
  postType,
} from "./schemaTypes"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, pageType, postType],
}
