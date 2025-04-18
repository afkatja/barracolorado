import Link from "next/link"
import navigation from "../lib/navigation"
import NavItem from "./NavItem"
import Image from "next/image"

const Header = async () => {
  const { main: mainNav, routeNavItems: routeNav } = await navigation()

  return (
    <header id="header" className="bg-gray-800">
      <div className="mx-auto w-11/12 flex items-center">
        <Link href="/" className="text-3xl text-slate-900 font-black">
          <Image
            src="/images/logo.png"
            alt="Barra del Colorado"
            width={100}
            height={100}
          />
        </Link>
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            {[...mainNav, ...routeNav].map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
