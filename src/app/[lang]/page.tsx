import Intro from "../../components/Intro"
import Section from "../../components/Section"
import Contact from "../../components/Contact"
import { sanityFetch } from "../../sanity/lib/client"
import {
  ALL_PAGES_QUERY,
  GALLERY_QUERY,
  HOME_QUERY,
  CONTACT_QUERY,
} from "../../sanity/lib/queries"
import PagesLayout from "./(pages)/layout"
import GalleryClient from "./gallery/GalleryClient"
import { defaultLocale } from "../../i18n"
import {
  Home as HomeType,
  Gallery as GalleryType,
  Page as PageType,
  TContact,
} from "../../types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const home = await sanityFetch<HomeType>({
    query: HOME_QUERY,
    revalidate: 0,
    params: {
      locale: lang ?? defaultLocale,
    },
  })

  const content = await sanityFetch<PageType[]>({
    query: ALL_PAGES_QUERY,
    revalidate: 0,
    params: {
      category: "Pages",
      locale: lang,
    },
  })

  const gallery = await sanityFetch<GalleryType>({
    query: GALLERY_QUERY,
    params: { locale: lang },
  })

  const contact = await sanityFetch<TContact>({
    query: CONTACT_QUERY,
    params: { language: lang },
  })

  return (
    <PagesLayout params={params}>
      {home ? (
        <Intro
          title={home.title}
          subtitle={home.subtitle}
          media={home.media}
          description={home.description}
          nextSection={content[0]?._id ?? "gallery"}
        />
      ) : (
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="mt-4">
            Content for this language is not available yet.
          </p>
        </div>
      )}
      {content.map((item, index) => (
        <Section
          key={item._id}
          id={item._id}
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          image={item.mainImage}
          content={item.content}
          nextSection={content[index + 1]?._id ?? "gallery"}
        >
          <Link
            href={`/${lang}/${item.slug.current}`}
            className="flex items-center justify-end text-teal-600 hover:text-teal-700 mt-auto group text-sm font-medium"
          >
            Read more
            <ArrowRightIcon className="w-1.5 h-1.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Section>
      ))}
      <section
        id="gallery"
        className={`style2 dark bg-linear-to-br from-teal-800 to-cyan-900 text-gray-50 flex justify-center items-center py-4 md:py-8 flex-1`}
      >
        <GalleryClient gallery={gallery} />
      </section>
      {contact && <Contact contact={contact} />}
    </PagesLayout>
  )
}

export default Home
