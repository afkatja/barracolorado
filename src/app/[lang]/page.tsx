import Intro from "../../components/Intro"
import Section from "../../components/Section"
import Contact from "../../components/Contact"
import { sanityFetch } from "../../sanity/lib/client"
import {
  ALL_PAGES_QUERY,
  GALLERY_QUERY,
  HOME_QUERY,
} from "../../sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import PagesLayout from "./(pages)/layout"
import GalleryClient from "./gallery/GalleryClient"
import { defaultLocale } from "../../i18n"

const Home = async ({ params }: { params: { lang: string } }) => {
  const { lang } = await params
  const home = await sanityFetch<{
    _id: string
    title: string
    subtitle: string
    description: string
    image: SanityImageObject
    language: string
  }>({
    query: HOME_QUERY,
    revalidate: 0,
    params: {
      locale: lang ?? defaultLocale,
    },
  })

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
      locale: lang,
    },
  })

  const gallery = await sanityFetch<{
    title: string
    description?: string
    images: Array<{
      _key: string
      asset: {
        _ref: string
      }
      alt: string
      caption?: string
    }>
  }>({
    query: GALLERY_QUERY,
    params: { locale: lang },
  })

  return (
    <PagesLayout params={params}>
      {home ? (
        <Intro
          title={home.title}
          subtitle={home.subtitle}
          image={home.image}
          description={home.description}
        />
      ) : (
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="mt-4">
            Content for this language is not available yet.
          </p>
        </div>
      )}
      {content.map(item => (
        <Section
          key={item._id}
          id={item._id}
          title={item.title}
          content={item.body}
          nextSection="gallery"
        />
      ))}
      <section
        id="gallery"
        className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-white flex justify-center items-center py-4 md:py-8 flex-1`}
      >
        <GalleryClient gallery={gallery} />
      </section>
      <Contact />
    </PagesLayout>
  )
}

export default Home
