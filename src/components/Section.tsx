import Link from "next/link"

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
  <section
    id={id}
    className={`main style2 ${
      id === "one" ? "right" : "left"
    } dark fullscreen bg-gray-800 text-white flex justify-center items-center p-8`}
  >
    <div className="content box style2 text-center">
      <header>
        <h2 className="text-3xl mb-4">{title}</h2>
      </header>
      <p className="mb-4">{content}</p>
    </div>
    <Link
      href={`#${nextSection}`}
      className="button style2 down anchored bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Next
    </Link>
  </section>
)

export default Section
