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
        <footer>
          <Link
            to="one"
            smooth
            duration={500}
            offset={-50}
            className="button style2 down bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            More
          </Link>
        </footer>
      </div>
    </section>
  </Element>
)

export default Intro
