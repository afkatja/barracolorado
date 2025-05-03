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
  parent: INavigationItem | null
  order: number
}
const Navigation = async () => {
  const { items } = await sanityFetch<{ items: INavigationItem[] }>({
    query: NAV_QUERY,
  })

  // Group items by parent
  const mainItems = items.filter(item => !item.parent)
  const subItems = items.filter(item => item.parent)

  // Create a map of parent items to their children
  const navigationMap = new Map<string, INavigationItem[]>()
  subItems.forEach(item => {
    if (item.parent) {
      const parentId = item.parent._id
      if (!navigationMap.has(parentId)) {
        navigationMap.set(parentId, [])
      }
      navigationMap.get(parentId)?.push(item)
    }
  })

  return (
    <>
      <NavigationMenu.Root className="hidden md:block">
        <NavigationMenu.List className="flex items-center gap-1.5">
          {mainItems.map(item => (
            <NavigationItem
              key={item._id}
              item={item}
              navigationMap={navigationMap}
            />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <MobileNavigation mainItems={mainItems} navigationMap={navigationMap} />
    </>
  )
}

export default Navigation
