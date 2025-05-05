"use client"
import { Link, Element } from "react-scroll"
import RichText from "./RichText"
import { SanityDocument } from "sanity"
import ScrollAnimation from "./ScrollAnimation"

interface SectionProps {
  id: string
  title: string
  content: SanityDocument | string
  nextSection?: string
  children?: React.ReactNode
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  content,
  nextSection,
  children,
}) => {
  const isEven = parseInt(id.replace(/\D/g, "")) % 2 === 0
  return (
    <Element name={id} className="main md:h-screen">
      <section
        id={id}
        className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-white flex justify-center items-center py-4 md:py-8 flex-1`}
      >
        <ScrollAnimation
          direction={isEven ? "right" : "left"}
          className="content flex flex-col box p-2.5"
        >
          <header>
            <h2 className="text-3xl mb-4 text-center">{title}</h2>
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
            offset={-50}
            className="button style2 down anchored  hover:bg-teal-700 text-white font-bold py-2 px-1 rounded-4xl animate-pulse"
          >
            Next
          </Link>
        )}
      </section>
    </Element>
  )
}

export default Section
