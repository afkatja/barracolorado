import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY } from "../sanity/lib/queries"

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
      // .filter(item => item.isPublished)
      .sort((a, b) => {
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      })

  const mainNav = await sanityFetch<{
    title: string
    slug: string
    items: { navItemUrl: { internalLink: navItem } }[]
  }>({
    query: NAV_QUERY,
    revalidate: 0,
  })

  const main = mapNav(
    mainNav?.items.map(item => ({
      ...item.navItemUrl?.internalLink,
      route: true,
    }))
  )
  return { main }
}
export default navigation
