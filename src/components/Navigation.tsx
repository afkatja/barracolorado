import * as React from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY } from "../sanity/lib/queries"
import NavigationItem from "./NavigationItem"
import MobileNavigation from "./MobileNavigation"
export interface INavigationItem {
  _id: string
  title: string
  slug: { current: string }
  language: string
  menuOrder: number
  subItems?: INavigationItem[]
}
const Navigation = async () => {
  const { items } = await sanityFetch<{
    items: INavigationItem[]
  }>({
    query: NAV_QUERY,
    params: { language: "en" },
  })

  return (
    <>
      <NavigationMenu.Root className="hidden lg:block ml-auto order-2">
        <NavigationMenu.List className="flex items-center gap-1.5 m-0">
          {items.map(item => (
            <NavigationItem key={item._id} item={item} />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <MobileNavigation items={items} />
    </>
  )
}

export default Navigation
