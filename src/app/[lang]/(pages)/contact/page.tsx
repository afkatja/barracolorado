import React from "react"
import Contact from "../../../../components/Contact"
import { sanityFetch } from "../../../../sanity/lib/client"
import { CONTACT_QUERY } from "../../../../sanity/lib/queries"
import { TContact } from "../../../../types"

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const contact = await sanityFetch<TContact>({
    query: CONTACT_QUERY,
    params: { language: lang },
  })
  return <Contact contact={contact} />
}

export default page
