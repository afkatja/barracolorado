import NavLink from "./NavLink"

const navItems = [
  { id: "intro", name: "Intro" },
  { id: "one", name: "One" },
  { id: "two", name: "Two" },
  { id: "gallery", name: "Gallery" },
  { id: "contact", name: "Contact" },
]

const Header = () => (
  <header id="header" className="bg-gray-800  p-4">
    <h1 className="text-3xl">Barra del Colorado</h1>
    <nav>
      <ul className="flex space-x-4">
        {navItems.map(item => (
          <li key={item.id}>
            <NavLink to={item.id}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default Header
