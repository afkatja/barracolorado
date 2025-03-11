import Head from "next/head"
import Header from "../components/Header"
import Intro from "../components/Intro"
import Section from "../components/Section"
import Gallery from "../components/Gallery"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Head>
        <title>Big Picture by HTML5 UP</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <div className="is-preload">
        <Header />
        <Intro />
        <Section
          id="one"
          title="What I Do"
          content="Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
                  Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu,
                  id varius justo euismod in. Curabitur egestas consectetur magna."
          nextSection="two"
        />
        <Section
          id="two"
          title="Who I Am"
          content="Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
                  Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu,
                  id varius justo euismod in. Curabitur egestas consectetur magna."
          nextSection="work"
        />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
