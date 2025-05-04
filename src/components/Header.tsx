import Link from "next/link"
// import navigation from "../lib/navigation"
// import NavItem from "./NavItem"
import Navigation from "./Navigation"
import { Logo } from "./icons"

const Header = async () => {
  // const { main: mainNav } = await navigation()

  return (
    <header id="header" className="bg-linear-to-bl from-teal-800 to-cyan-900">
      <div className="mx-auto w-11/12 flex items-center py-1">
        <Link href="/" className="block w-6 h-6 text-3xl text-slate-900">
          <Logo className="fill-gray-50" />
        </Link>
        <Navigation />
        {/* <nav className="ml-auto">
          <ul className="flex space-x-4">
            {[...mainNav].map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  )
}

export default Header
