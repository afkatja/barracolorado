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
      type: "slug",
      title: "Navigation ID",
      description: "This is used to identify the navigation item in the URL",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Navigation items",
      of: [{ type: "reference", to: [{ type: "navigationItem" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      navId: "navId.current",
    },
    prepare({ title, navId }) {
      return {
        title,
        subtitle: navId ? `ID: ${navId}` : "No ID set",
      }
    },
  },
})
