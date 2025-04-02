"use client"
import { Link, Element } from "react-scroll"

interface SectionProps {
  id: string
  title: string
  content: string
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
      <div className="content box style2 text-center">
        <header>
          <h2 className="text-3xl mb-4">{title}</h2>
        </header>
        <p className="mb-4">{content}</p>
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
