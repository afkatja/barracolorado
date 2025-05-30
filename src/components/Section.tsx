"use client"
import { Link, Element } from "react-scroll"
import RichText from "./RichText"
import { SanityDocument } from "sanity"
import ScrollAnimation from "./ScrollAnimation"
import { urlFor } from "../sanity/lib/image"
import Image from "next/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { useEffect, useState } from "react"

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  description?: string
  image?: SanityImageObject
  content: SanityDocument | string
  nextSection?: string
  children?: React.ReactNode
  className?: string
  asSection?: boolean
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  description,
  image,
  content,
  nextSection,
  children,
  className,
  asSection = true,
}) => {
  const isEven = parseInt(id.replace(/\D/g, "")) % 2 === 0
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height"
      )
    )
    setOffset(-headerHeight)
  }, [])

  return (
    <Element
      name={id}
      className={`main min-h-[calc(100vh-var(--header-height))] ${className}`}
    >
      <section
        id={id}
        className={`style2 dark ${image ? "bg-fixed bg-cover bg-center bg-no-repeat" : "bg-linear-to-br from-teal-800 to-cyan-900"} text-gray-50 flex items-center py-4 md:py-8 flex-1 ${asSection && isEven ? "justify-end" : "justify-center"}`}
        style={{
          backgroundImage: image ? `url(${urlFor(image).url()})` : "",
        }}
      >
        <ScrollAnimation
          direction={isEven ? "right" : "left"}
          className={`content flex flex-col box p-2.5 ${!asSection && "prose min-w-[80ch] max-w-11/12 mx-auto text-justify"}`}
          asSection={asSection}
        >
          <header className="flex items-start mb-0">
            {image && (
              <Image
                src={urlFor(image).url()}
                alt={title}
                width={100}
                height={100}
                className="rounded-lg w-1/2 h-1/2 mr-1 my-2"
              />
            )}
            <div>
              <h2 className="text-3xl font-bold text-left mt-2">{title}</h2>
              {subtitle && (
                <h3 className="text-lg my-2 font-medium text-left">
                  {subtitle}
                </h3>
              )}
              {description && <p className="mt-2">{description}</p>}
            </div>
          </header>

          {typeof content === "string" ? (
            <p>{content}</p>
          ) : (
            <RichText body={content} />
          )}
          {children}
        </ScrollAnimation>
        {nextSection && (
          <Link
            to={nextSection}
            duration={500}
            smooth
            offset={offset}
            className="button style2 down anchored hover:bg-teal-700 text-gray-50 font-bold py-2 px-1 rounded-4xl animate-pulse"
          >
            Next
          </Link>
        )}
      </section>
    </Element>
  )
}

export default Section
