"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavLink from "./NavLink"
import { navItem } from "../lib/navigation"

const NavItem = ({
  item,
}: {
  item: navItem & { href: string; name: string; id: string }
}) => {
  const pathname = usePathname()

  return (
    <li>
      {item.route ? (
        <Link
          href={`/${item.href}`}
          className={`cursor-pointer hover:text-shadow-lg ${pathname.includes(item.slug.current) ? "text-shadow-lg text-amber-700" : ""}`}
        >
          {item.name}
        </Link>
      ) : (
        <NavLink to={item.id}>{item.name}</NavLink>
      )}
    </li>
  )
}

export default NavItem
