import Link from "next/link"
// import navigation from "../lib/navigation"
// import NavItem from "./NavItem"
import Image from "next/image"
import Navigation from "./Navigation"

const Header = async () => {
  // const { main: mainNav } = await navigation()

  return (
    <header id="header" className="bg-linear-to-bl from-teal-800 to-cyan-900">
      <div className="mx-auto w-11/12 flex items-center p-1">
        <Link href="/" className="text-3xl text-slate-900">
          <Image
            src="/images/logo.svg"
            alt="Barra del Colorado"
            width={70}
            height={70}
          />
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
