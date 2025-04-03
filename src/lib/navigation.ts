import { sanityFetch } from "../sanity/lib/client"
import { NAV_QUERY } from "../sanity/lib/queries"

type navItem = {
  _id: string
  title: string
  slug: { current: string }
  isPublished: boolean
}
const navigation = async () => {
  const navItems = [
    { id: "intro", name: "Intro" },
    { id: "gallery", name: "Gallery" },
    { id: "contact", name: "Contact" },
  ]

  const mainNav = await sanityFetch<navItem[]>({
    query: NAV_QUERY,
    revalidate: 0,
    params: { category: "Pages" },
  })

  const main = mainNav
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
  return { navItems, main }
}
export default navigation
