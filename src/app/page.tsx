import Head from "next/head"
import Header from "../components/Header"
import Intro from "../components/Intro"
import Section from "../components/Section"
import Gallery from "../components/Gallery"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import { sanityFetch } from "../sanity/lib/client"
import { PAGES_QUERY } from "../sanity/lib/queries"

const Home = async () => {
  const content = await sanityFetch<
    {
      _id: string
      slug: { current: string }
      title: string
      body: any
    }[]
  >({
    query: PAGES_QUERY,
    revalidate: 0,
  })
  console.log({ content })

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
      <Header />
      <Intro />
      {content.map(item => (
        <Section
          key={item._id}
          id={item._id}
          title={item.title}
          content={item.body}
          nextSection="gallery"
        />
      ))}
      <Section
        id="one"
        title="One"
        content="Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
                  Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu,
                  id varius justo euismod in. Curabitur egestas consectetur magna."
        nextSection="two"
      />
      <Section
        id="two"
        title="Two"
        content="Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
                  Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu,
                  id varius justo euismod in. Curabitur egestas consectetur magna."
        nextSection="gallery"
      />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
export default Home
