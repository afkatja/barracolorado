import navigation from "../lib/navigation"
import NavLink from "./NavLink"

const Header = async () => {
  const { navItems, main: mainNav } = await navigation()

  return (
    <header id="header" className="bg-gray-800 p-4">
      <h1 className="text-3xl">Barra del Colorado</h1>
      <nav>
        <ul className="flex space-x-4">
          {[...navItems, ...mainNav].map(item => (
            <li key={item.id}>
              <NavLink to={item.id}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
