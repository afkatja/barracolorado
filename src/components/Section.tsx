"use client"
import { Link, Element } from "react-scroll"
import RichText from "./RichText"
import { SanityDocument } from "sanity"

interface SectionProps {
  id: string
  title: string
  content: SanityDocument
  nextSection: string
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  content,
  nextSection,
}) => (
  <Element name={id} className="main fullscreen">
    <section
      id={id}
      className={`style2 ${
        id === "one" ? "right" : "left"
      } dark bg-gray-800 text-white flex justify-center items-center p-8 flex-1`}
    >
      <div className="content box style2">
        <header>
          <h2 className="text-3xl mb-4 text-center">{title}</h2>
        </header>
        <RichText body={content} />
      </div>
      <Link
        to={nextSection}
        duration={500}
        smooth
        offset={-50}
        className="button style2 down anchored bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </Link>
    </section>
  </Element>
)

export default Section
