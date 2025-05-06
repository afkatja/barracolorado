import { defineField, defineType } from "sanity"

export const linkType = defineType({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      title: "Internal Link",
      name: "internalLink",
      description: "Select pages for navigation",
      type: "reference",
      to: [{ type: "page" }, { type: "post" }, { type: "gallery" }],
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      description: "Use fully qualified URLS for external link",
      type: "url",
    }),
  ],
})
