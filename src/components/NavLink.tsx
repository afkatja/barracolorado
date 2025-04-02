"use client"
import React from "react"
import { Link } from "react-scroll"

const NavLink = ({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) => {
  return (
    <Link
      to={to}
      smooth
      duration={500}
      offset={-50}
      className="cursor-pointer hover:font-bold"
      activeClass="font-bold"
    >
      {children}
    </Link>
  )
}

export default NavLink
