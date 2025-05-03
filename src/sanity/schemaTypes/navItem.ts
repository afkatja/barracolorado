import { defineField, defineType } from "sanity"

export const navItemType = defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "navItemUrl",
      type: "link",
      title: "Navigation Item URL",
    }),
    defineField({
      name: "isMainNavItem",
      title: "Is Main Navigation Item",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "parent",
      title: "Parent Navigation Item",
      type: "reference",
      to: [{ type: "navigationItem" }],
      hidden: ({ document }) => !!document?.isMainNavItem,
      validation: Rule =>
        Rule.custom((parent, context) => {
          // Prevent circular references
          if (
            parent &&
            context.document?._id &&
            parent._ref === context.document._id
          ) {
            return "A navigation item cannot be its own parent"
          }
          return true
        }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Order in which this item appears in navigation",
    }),
  ],
  preview: {
    select: {
      title: "title",
      parent: "parent.title",
    },
    prepare({ title, parent }) {
      return {
        title,
        subtitle: parent ? `Sub-item of ${parent}` : "Main Navigation Item",
      }
    },
  },
})
