"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { navItem } from "../lib/navigation"

import NavLink from "./NavLink"


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
          className={`cursor-pointer hover:text-shadow-lg text-gray-50 ${pathname.includes(item.slug.current) ? "text-shadow-lg text-amber-700" : ""}`}
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
