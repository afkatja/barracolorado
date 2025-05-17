import { defineField, defineType, StringRule } from "sanity"
import { isUniqueOtherThanLanguage } from "../../lib/utils"

const titleValidation = (rule: StringRule) =>
  rule.custom((value, context) => {
    const parent = context.document?.parent
    if (parent && !value) {
      return "Title is required when there is a parent page"
    }
    return true
  })

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      // hidden: true,
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (rule: StringRule) =>
        rule.custom((value, context) => {
          if (!context.document?.title && !value) {
            return "Required"
          }
          return true
        }),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: titleValidation,
    }),
    defineField({
      name: "subtitle",
      type: "string",
      validation: titleValidation,
    }),
    defineField({
      name: "description",
      type: "string",
      validation: titleValidation,
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: rule =>
        rule
          .required()
          .error("A slug is required to generate a page on the website"),
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "isPublished",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      to: [{ type: "page" }],
      description: "Reference to the parent page. Leave empty for main items.",
    }),
    defineField({
      name: "homeSection",
      type: "boolean",
      initialValue: false,
      description: "Display in the home page?",
    }),
    defineField({
      name: "displayTitle",
      type: "string",
      description: "Display title in the navigation",
    }),
    defineField({
      name: "menuOrder",
      type: "number",
      title: "Menu Order",
      description: "Order of the page in the menu",
    }),
  ],
  initialValue: {
    isPublished: true,
  },
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
