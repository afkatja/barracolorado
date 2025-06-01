import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as React from "react"

import { sanityFetch } from "@/sanity/lib/client"
import { NAV_QUERY } from "@/sanity/lib/queries"
import { Document, NavigationPage } from "@/types"

import MobileNavigation from "./MobileNavigation"
import NavigationItem from "./NavigationItem"

export interface INavigationItem extends Document {
  _id: string
  title: string
  navSlug: string
  pages?: NavigationPage
}

const Navigation = async ({ lang }: { lang: string }) => {
  const nav = await sanityFetch<{
    items: INavigationItem[]
  }>({
    query: NAV_QUERY,
    params: { locale: lang },
  })
  const items = nav?.items || []

  const pages = items
    .map(item => item.pages)
    .filter(
      (page): page is NavigationPage =>
        page !== undefined &&
        page !== null &&
        typeof page._id === "string" &&
        typeof page.title === "string" &&
        typeof page.slug?.current === "string"
    )

  if (!pages.length)
    return <div className="hidden lg:block ml-auto order-2">Nothing yet</div>

  return (
    <>
      <NavigationMenu.Root className="hidden lg:block ml-auto order-2">
        <NavigationMenu.List className="flex items-center gap-1.5 m-0">
          {pages.map(page => (
            <NavigationItem key={page._id} item={page} lang={lang} />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <MobileNavigation items={pages} />
    </>
  )
}

export default Navigation
