import { defineField, defineType } from "sanity"

export const navigationType = defineType({
  name: "navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "navId",
      type: "string",
      title: "Navigation ID",
    }),
    defineField({
      name: "menuPages",
      type: "array",
      title: "Menu Pages",
      of: [{ type: "reference", to: [{ type: "page" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      navId: "navId.current",
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
