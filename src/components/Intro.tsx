"use client"
import { Link } from "react-scroll"
import { urlFor } from "@/sanity/lib/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"

interface IntroProps {
  title: string
  subtitle: string
  description: string
  backgroundImage: SanityImageObject
  sectionId?: string
  nextSection: string
}

export default function Intro({
  title,
  subtitle,
  description,
  backgroundImage,
  nextSection,
}: IntroProps) {
  return (
    <div className="main fullscreen" data-name="intro">
      <section
        data-testid={`intro-section`}
        className="dark style1 bg-gray-900 text-gray-50 flex justify-center items-center p-8 flex-1 bg-fixed bg-cover bg-center bg-no-repeat"
        id="intro"
        style={{
          backgroundImage: `url(${urlFor(backgroundImage).url()})`,
        }}
      >
        <div className="content text-center">
          <header>
            <h2 className="text-4xl mb-4 font-black">{title}</h2>
          </header>
          <h3 className="mb-4 font-bold text-xl">{subtitle}</h3>
          <p className="mb-4">{description}</p>
          <footer className="relative py-4">
            <Link
              to={nextSection}
              className="cursor-pointer button style2 down text-gray-50 font-bold py-2 px-1 rounded-4xl motion-safe:animate-bounce hover:animate-bounce absolute bottom-0 left-1/2 -translate-x-1/2"
              duration={500}
              offset={-64}
              smooth="true"
            >
              More
            </Link>
          </footer>
        </div>
      </section>
    </div>
  )
}
