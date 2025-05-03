import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY } from "../sanity/lib/queries"
import NavigationItem from "./NavigationItem"

interface NavigationItem {
  _id: string
  title: string
  slug: { current: string }
  isMainNavItem: boolean
  parent: NavigationItem | null
  order: number
  description?: string
}

export default async function Navigation() {
  const { items: navigationItems } = await sanityFetch<{
    items: NavigationItem[]
  }>({
    query: NAV_QUERY,
  })

  // Group items by parent
  const mainItems = navigationItems.filter(item => !item.parent)
  const subItems = navigationItems.filter(item => item.parent)

  // Create a map of parent items to their children
  const navigationMap = new Map<string, NavigationItem[]>()
  subItems.forEach(item => {
    if (item.parent) {
      const parentId = item.parent._id
      if (!navigationMap.has(parentId)) {
        navigationMap.set(parentId, [])
      }
      navigationMap.get(parentId)?.push(item)
    }
  })

  console.log({ navigationMap })

  return (
    <nav className="flex items-center gap-1.5">
      {mainItems.map(item => (
        <NavigationItem
          key={item._id}
          item={item}
          navigationMap={navigationMap}
        />
      ))}
    </nav>
  )
}
