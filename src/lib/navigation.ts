import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY, NAV_ROUTE_QUERY } from "../sanity/lib/queries"

export type navItem = {
  _id: string
  title: string
  slug: { current: string }
  isPublished: boolean
  route?: boolean
}
const navigation = async () => {
  // const navItems = [
  //   { id: "intro", name: "Intro" },
  //   { id: "gallery", name: "Gallery" },
  //   { id: "contact", name: "Contact" },
  // ]

  const mapNav = (navItems: navItem[]) =>
    navItems
      .map(item => ({
        href: item?.slug.current,
        id: item._id,
        name: item.title,
        ...item,
      }))
      .filter(item => item.isPublished)
      .sort((a, b) => {
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      })

  const mainNav = await sanityFetch<navItem[]>({
    query: NAV_QUERY,
    revalidate: 0,
    params: { category: "Pages", route: false },
  })

  const routeNav = await sanityFetch<navItem[]>({
    query: NAV_ROUTE_QUERY,
    revalidate: 0,
    params: { category: "Pages", route: true },
  })

  const main = mapNav(mainNav)
  const routeNavItems = mapNav(routeNav)
  return { main, routeNavItems }
}
export default navigation
