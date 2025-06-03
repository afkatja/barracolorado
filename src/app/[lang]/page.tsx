import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import Contact from "../../components/Contact"
import Intro from "../../components/Intro"
import Section from "../../components/Section"
import { getFallbackLocale } from "../../i18n"
import { sanityFetch } from "../../sanity/lib/client"
import {
  ALL_PAGES_QUERY,
  GALLERY_QUERY,
  HOME_QUERY,
  CONTACT_QUERY,
  // PAGES_QUERY,
} from "../../sanity/lib/queries"
import {
  Home as HomeType,
  Gallery as GalleryType,
  Page as PageType,
  TContact,
  Page,
} from "../../types"

import PagesLayout from "./(pages)/layout"
import HomeGallery from "./HomeGallery"

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const fallbackLang = getFallbackLocale(lang)

  const home = await sanityFetch<HomeType>({
    query: HOME_QUERY,
    params: { locale: fallbackLang },
  })

  const pages = await sanityFetch<Page[]>({
    query: ALL_PAGES_QUERY,
    params: { locale: fallbackLang },
  })

  const gallery = await sanityFetch<GalleryType>({
    query: GALLERY_QUERY,
  })

  const contact = await sanityFetch<TContact>({
    query: CONTACT_QUERY,
    params: { locale: fallbackLang },
  })

  return (
    <PagesLayout params={params}>
      {home ? (
        <Intro
          title={home.title}
          subtitle={home.subtitle}
          media={home.media}
          description={home.description}
          nextSection={pages?.[0]?._id ?? "gallery"}
        />
      ) : (
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="mt-4">
            Content for this language is not available yet.
          </p>
        </div>
      )}
      {pages &&
        pages.length > 0 &&
        pages.map((item, index) => (
          <Section
            key={item._id}
            id={item._id}
            index={index + 1}
            title={item.title}
            description={item.description}
            image={item.mainImage}
            content={item.content}
            nextSection={pages[index + 1]?._id ?? "gallery"}
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
      {gallery && <HomeGallery gallery={gallery} contact={!!contact} />}
      {contact && <Contact id="contact" contact={contact} />}
    </PagesLayout>
  )
}

export default Home
