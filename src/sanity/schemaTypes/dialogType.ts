import { defineField, defineType, ValidationContext } from "sanity"

interface FormSettings {
  minPeople: number
  maxPeople: number
  availableDates: Array<{
    date: string
    availableSlots: number
  }>
}

export const dialogType = defineType({
  name: "dialog",
  title: "Dialog",
  type: "document",
  fields: [
    defineField({
      name: "dialogTitle",
      title: "Title",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "dialogSubtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "dialogDescription",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "formLabels",
      title: "Form Labels",
      type: "object",
      fields: [
        {
          name: "nameLabel",
          title: "Name Label",
          type: "string",
          validation: rule => rule.required(),
        },
        {
          name: "emailLabel",
          title: "Email Label",
          type: "string",
          validation: rule => rule.required(),
        },
        {
          name: "peopleLabel",
          title: "Number of People Label",
          type: "string",
          validation: rule => rule.required(),
        },
        {
          name: "dateLabel",
          title: "Date Label",
          type: "string",
          validation: rule => rule.required(),
        },
        {
          name: "submitButton",
          title: "Submit Button Text",
          type: "string",
          validation: rule => rule.required(),
        },
      ],
    }),
    defineField({
      name: "formValidation",
      type: "object",
      title: "Form Validation Messages",
      fields: [
        defineField({
          name: "required",
          type: "string",
          title: "Required Field Message",
          initialValue: "This field is required",
        }),
        defineField({
          name: "invalidEmail",
          type: "string",
          title: "Invalid Email Message",
          initialValue: "Please enter a valid email address",
        }),
        defineField({
          name: "minPeople",
          type: "string",
          title: "Minimum People Message",
          initialValue: "Minimum number of people required",
          validation: rule =>
            rule.custom((value, context: ValidationContext) => {
              const parent = context.parent as {
                formSettings?: FormSettings
              }
              const minPeople = parent?.formSettings?.minPeople
              if (minPeople && !value?.includes(minPeople.toString())) {
                return `Message should include the minimum number of people (${minPeople})`
              }
              return true
            }),
        }),
        defineField({
          name: "maxPeople",
          type: "string",
          title: "Maximum People Message",
          initialValue: "Maximum number of people exceeded",
          validation: rule =>
            rule.custom((value, context: ValidationContext) => {
              const parent = context.parent as {
                formSettings?: FormSettings
              }
              const maxPeople = parent?.formSettings?.maxPeople
              if (maxPeople && !value?.includes(maxPeople.toString())) {
                return `Message should include the maximum number of people (${maxPeople})`
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: "formSettings",
      title: "Form Settings",
      type: "object",
      fields: [
        {
          name: "minPeople",
          title: "Minimum Number of People",
          type: "number",
          validation: rule => rule.required().min(1),
        },
        {
          name: "maxPeople",
          title: "Maximum Number of People",
          type: "number",
          validation: rule => rule.required().min(1),
        },
        {
          name: "availableDates",
          title: "Available Dates",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "date",
                  title: "Date",
                  type: "datetime",
                  validation: rule => rule.required(),
                },
                {
                  name: "availableSlots",
                  title: "Available Slots",
                  type: "number",
                  validation: rule => rule.required().min(0),
                },
              ],
            },
          ],
        },
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
