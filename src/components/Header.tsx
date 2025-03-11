import Link from "next/link"

const Header = () => (
  <header id="header" className="bg-gray-800 text-white p-4">
    <h1 className="text-3xl">Big Picture</h1>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="#intro">Intro</Link>
        </li>
        <li>
          <Link href="#one">What I Do</Link>
        </li>
        <li>
          <Link href="#two">Who I Am</Link>
        </li>
        <li>
          <Link href="#work">My Work</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
