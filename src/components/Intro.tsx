"use client"
import { Link, Element } from "react-scroll"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { urlFor } from "../sanity/lib/image"

const headerHeight = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--header-height")
)

const Intro = ({
  title,
  subtitle,
  image,
  description,
  nextSection,
}: {
  title: string
  subtitle: string
  image: SanityImageObject
  description: string
  nextSection: string
}) => (
  <Element name="intro" className="main fullscreen">
    <section
      id="intro"
      className="dark style1 bg-gray-900 text-white flex justify-center items-center p-8 flex-1 bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${urlFor(image).url()})` }}
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
            smooth
            duration={500}
            offset={headerHeight * -1}
            className="cursor-pointer button style2 down text-gray-50 font-bold py-2 px-1 rounded-4xl motion-safe:animate-bounce hover:animate-bounce absolute bottom-0 left-1/2 -translate-x-1/2"
          >
            More
          </Link>
        </footer>
      </div>
    </section>
  </Element>
)

export default Intro
