"use client"

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { media } from "sanity-plugin-media"
import { documentInternationalization } from "@sanity/document-internationalization"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env"
import { schema } from "./src/sanity/schema"
import { structure } from "./src/sanity/structure"
import { locales } from "./src/i18n"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    documentInternationalization({
      supportedLanguages: locales,
      weakReferences: true,
      // base: defaultLocale,
      apiVersion: apiVersion,
      // Define which document types should be internationalized
      schemaTypes: ["page", "post", "home", "contact", "package"],
      bulkPublish: true,
    }),
  ],
})
