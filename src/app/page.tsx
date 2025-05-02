import Intro from "../components/Intro"
import Section from "../components/Section"
import Gallery from "../components/Gallery"
import Contact from "../components/Contact"
import { sanityFetch } from "../sanity/lib/client"
import { ALL_PAGES_QUERY } from "../sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import PagesLayout from "./(pages)/layout"

const Home = async () => {
  const content = await sanityFetch<
    {
      _id: string
      slug: { current: string }
      title: string
      body: SanityDocument
    }[]
  >({
    query: ALL_PAGES_QUERY,
    revalidate: 0,
    params: {
      category: "Pages",
    },
  })

  return (
    <PagesLayout>
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
      <Gallery />
      <Contact />
    </PagesLayout>
  )
}
export default Home
