import * as React from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY, PAGES_QUERY } from "../sanity/lib/queries"
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

  const pages = await sanityFetch<SanityDocument[]>({
    query: PAGES_QUERY,
    params: { locale: lang },
  })

  const items = menu?.items || []

  const filterPagesBySlug = (item: INavigationItem) => {
    //compare pages array with menu items
    const foundItem = pages.find(
      page => page.slug.current === item.slug.current
    )
    if (foundItem) {
      return {
        ...foundItem,
        subItems: item.subItems,
      } as INavigationItem
    }
    return null
  }

  // Filter out pages that are not in the menu items
  const filteredItems = items
    .map(filterPagesBySlug)
    .filter(page => page !== null)

  if (!filteredItems.length)
    return <div className="hidden lg:block ml-auto order-2">Nothing yet</div>

  return (
    <>
      <NavigationMenu.Root className="hidden lg:block ml-auto order-2">
        <NavigationMenu.List className="flex items-center gap-1.5 m-0">
          {filteredItems.map(item => (
            <NavigationItem key={item._id} item={item} />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <MobileNavigation items={items} />
    </>
  )
}

export default Navigation
