import * as React from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY } from "../sanity/lib/queries"
import NavigationItem from "./NavigationItem"
import MobileNavigation from "./MobileNavigation"
import { SanityDocument } from "next-sanity"
export interface INavigationItem extends SanityDocument {
  _id: string
  title: string
  displayTitle: string
  slug: { current: string }
  language: string
  menuOrder: number
  subItems?: INavigationItem[]
}

const Navigation = async ({ lang }: { lang: string }) => {
  const menu = await sanityFetch<{
    items: INavigationItem[]
  }>({
    query: NAV_QUERY,
    params: { language: lang },
  })
  const items = menu?.items || []

  const pages = items.map(item => item.pages)

  if (!pages.length)
    return <div className="hidden lg:block ml-auto order-2">Nothing yet</div>

  return (
    <>
      <NavigationMenu.Root className="hidden lg:block ml-auto order-2">
        <NavigationMenu.List className="flex items-center gap-1.5 m-0">
          {pages.map(item => (
            <NavigationItem key={item._id} item={item} lang={lang} />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <MobileNavigation items={items} />
    </>
  )
}

export default Navigation
