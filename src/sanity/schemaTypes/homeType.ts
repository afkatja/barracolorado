import { defineField, defineType } from "sanity"
// import { isUniqueOtherThanLanguage } from "../../lib/utils"

export const homeType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      // hidden: true,
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
})
