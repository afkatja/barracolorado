import { defineField, defineType } from "sanity"

export const seoSettingsType = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Default Title",
      type: "string",
      description: "The default title for your website",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Default Description",
      type: "text",
      description: "The default meta description for your website",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords for SEO (comma-separated)",
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Share Image",
      type: "image",
      description: "The default image used when sharing on social media",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ogTitle",
      title: "Default Social Share Title",
      type: "string",
      description: "The default title used when sharing on social media",
    }),
    defineField({
      name: "ogDescription",
      title: "Default Social Share Description",
      type: "text",
      description: "The default description used when sharing on social media",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
