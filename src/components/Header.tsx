import Link from "next/link"

const Header = () => (
  <header id="header" className="bg-gray-800  p-4">
    <h1 className="text-3xl">Big Picture</h1>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="#intro">Intro</Link>
        </li>
        <li>
          <Link href="#one">One</Link>
        </li>
        <li>
          <Link href="#two">Two</Link>
        </li>
        <li>
          <Link href="#work">Gallery</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
