import {
  StructureResolver,
  DefaultDocumentNodeResolver,
  ListItemBuilder,
  ListItem,
  Divider,
  StructureBuilder,
} from "sanity/structure"

import { locales } from "../i18n"

const languagesMap: ({
  S,
  title,
  schemaType,
}: {
  S: StructureBuilder
  title: string
  schemaType: string
}) => ListItemBuilder[] | ListItem[] | Divider[] = ({
  S,
  title,
  schemaType,
}) => {
  return [
    ...locales.map(locale =>
      S.listItem()
        .id(`${locale.id}-${schemaType}`)
        .title(`${locale.title} ${title}`)
        .schemaType(schemaType)
        .child(
          S.documentList()
            .id(`${locale.id}-${schemaType}-list`)
            .title(`${locale.title} ${title}`)
            .schemaType(schemaType)
            .filter(`_type == "${schemaType}" && language == $language`)
            .params({ language: locale.id })
            .canHandleIntent((intentName, params) => {
              return intentName === "edit" || params.template === title
            })
            .defaultOrdering([{ field: "title", direction: "asc" }])
            .child((documentId: string) =>
              S.document().documentId(documentId).schemaType(schemaType)
            )
        )
    ),
  ]
}

// List of document types that should have language support
const languageDocumentTypes = ["page", "post", "home"]

export const structure: StructureResolver = S => {
  return S.list()
    .title("Content")
    .items([
      // Map through document types that have a language field
      ...languageDocumentTypes.map(schemaType => {
        const title =
          schemaType.charAt(0).toUpperCase() + schemaType.slice(1) + "s" // Capitalize and pluralize
        return S.listItem()
          .id(`${schemaType}-section`)
          .title(title)
          .child(
            S.list()
              .id(`${schemaType}-list`)
              .title(title)
              .items(languagesMap({ S, title, schemaType }))
          )
      }),
      // Add a divider
      S.divider(),
      // Add other document types that don't have a language field
      ...S.documentTypeListItems().filter(
        item => !languageDocumentTypes.includes(item.getId() || "")
      ),
    ])
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (languageDocumentTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      // preview(S, client)
    ])
  }
  return S.document()
}
