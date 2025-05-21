import { defineField, defineType } from "sanity"
import { pageType } from "./pageType"
import { dialogType } from "./dialogType"

export const packageType = defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    ...pageType.fields,
    defineField({
      name: "packageDialog",
      title: "Package Dialog",
      type: "object",
      fields: [...dialogType.fields],
    }),
  ],
  preview: {
    select: {
      title: "title",
      name: "name",
      subtitle: "subtitle",
      description: "description",
      media: "mainImage",
      language: "language",
    },
    prepare(selection) {
      const { title, name, language, ...rest } = selection
      return {
        ...rest,
        title: `${title || name} ${language ? `(${language})` : ""}`,
      }
    },
  },
})
