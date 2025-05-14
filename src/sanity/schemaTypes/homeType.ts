import { defineField, defineType } from "sanity"

export const homeType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      validation: rule =>
        rule.required().custom(async (value, context) => {
          if (!value || !context.document) return true
          const { document, getClient } = context
          const client = getClient({ apiVersion: "2025-05-06" })
          const id = document._id.replace(/^drafts\./, "")
          const params = {
            draft: `drafts.${id}`,
            published: id,
            language: value,
          }
          const query = `!defined(*[
          !(_id in [$draft, $published]) &&
          _type == "home" &&
          language == $language
        ][0]._id)`
          const result = await client.fetch(query, params)
          return result || "Only one home document is allowed per language"
        }),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title, language }) {
      return {
        title: `${title} (${language})`,
      }
    },
  },
})
