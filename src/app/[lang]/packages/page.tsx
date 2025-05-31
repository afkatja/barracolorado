import React from "react"

import PageCard from "../(pages)/[slug]/pageCard"
import { sanityFetch } from "../../../sanity/lib/client"
import { PACKAGES_QUERY } from "../../../sanity/lib/queries"
import { Page } from "../../../types"

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const packages = await sanityFetch<Page[]>({
    query: PACKAGES_QUERY,
    params: { language: lang },
  })

  return (
    <>
      {!packages?.length ? null : (
        <div className="main flex-1 md:fullscreen bg-linear-to-br from-teal-800 to-cyan-900 py-2">
          <section className="md:py-4 w-11/12 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2">
              {packages.map((page, i) => (
                <PageCard
                  key={page._id}
                  page={page}
                  slug="packages"
                  index={i}
                  lang={lang}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default page
