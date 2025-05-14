import { defineField, defineType } from "sanity"

export const contactType = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "formLabels",
      title: "Form Labels",
      type: "object",
      fields: [
        defineField({
          name: "nameLabel",
          title: "Name Label",
          type: "string",
          initialValue: "Name",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "emailLabel",
          title: "Email Label",
          type: "string",
          initialValue: "Email",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "messageLabel",
          title: "Message Label",
          type: "string",
          initialValue: "Message",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "submitButton",
          title: "Submit Button Text",
          type: "string",
          initialValue: "Send Message",
          validation: Rule => Rule.required(),
        }),
      ],
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
