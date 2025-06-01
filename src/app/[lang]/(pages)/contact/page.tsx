import { notFound } from "next/navigation"

import Contact from "@/components/Contact"
import { availableLocaleIds, getFallbackLocale } from "@/i18n"
import { sanityFetch } from "@/sanity/lib/client"
import { CONTACT_QUERY } from "@/sanity/lib/queries"
import { TContact } from "@/types"

import PagesLayout from "../layout"

export async function generateStaticParams() {
  return availableLocaleIds.map(lang => ({
    lang,
  }))
}

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const fallbackLang = getFallbackLocale(lang)
  const contact = await sanityFetch<TContact>({
    query: CONTACT_QUERY,
    params: { locale: fallbackLang },
  })

  if (!contact) {
    return notFound()
  }

  return (
    <PagesLayout params={params}>
      <Contact contact={contact} />
    </PagesLayout>
  )
}

export default page
