import { PortableText, PortableTextReactComponents } from "next-sanity"

import Image from "next/image"

import Title from "./Title"
import { urlFor } from "../sanity/lib/image"
import Link from "next/link"

const RichText = ({ body }: { body: any }) => {
  if (!body) return
  const components: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => <p className="my-2">{children}</p>,
      blockquote: ({ children }) => <p>{children}</p>,
      h1: ({ children }) => (
        <Title Heading="h1" titleClassName="col-span-2" title={children} />
      ),
      h2: ({ children }) => (
        <Title titleClassName="col-span-2" title={children} />
      ),
    },
    types: {
      image: ({ value }) => (
        <Image
          src={urlFor(value).url()}
          alt=""
          width={1024}
          height={700}
          className="mt-0"
        />
      ),
    },

    marks: {
      internalLink: ({ value, children }) => {
        return (
          value?.slug && (
            <Link href={value.slug.current} className="dark:text-zinc-100">
              {children}
            </Link>
          )
        )
      },
      strong: ({ children }) => (
        <strong className="dark:text-zinc-100 font-bold">{children}</strong>
      ),
    },
  }

  return <PortableText value={body} components={components} />
}

export default RichText
