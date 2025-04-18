import { SanityDocument } from "next-sanity"

const defaults = { nonTextBehavior: "remove" }

const blocksToText = (blocks: SanityDocument, opts = {}): string => {
  const options = Object.assign({}, defaults, opts)
  return blocks
    ?.map((block: { _type: string; children: { text: string }[] }) => {
      if (block?._type !== "block" || !block?.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join("")
    })
    .join("\n\n")
}

export default blocksToText
