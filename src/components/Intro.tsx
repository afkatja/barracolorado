"use client"
import { Link, Element } from "react-scroll"

const Intro = () => (
  <Element name="intro" className="main fullscreen">
    <section
      id="intro"
      className="dark style1 bg-gray-900 text-white flex justify-center items-center p-8 flex-1"
    >
      <div className="content text-center">
        <header>
          <h2 className="text-4xl mb-4">Hola.</h2>
        </header>
        <p className="mb-4">
          Welcome to <strong>Barra Coronado</strong>
        </p>
        <footer className="relative py-4">
          <Link
            to="one"
            smooth
            duration={500}
            offset={-50}
            className="button style2 down text-gray-50 font-bold py-2 px-1 rounded-4xl motion-safe:animate-bounce hover:animate-bounce absolute bottom-0 left-1/2 -translate-x-1/2"
          >
            More
          </Link>
        </footer>
      </div>
    </section>
  </Element>
)

export default Intro
