"use client"
import Link from "next/link"
import React, { useState } from "react"

interface INavigationItem {
  slug: { current: string }
  title: string
  _id: string
}

const NavigationItem = ({
  item,
  navigationMap,
}: {
  item: INavigationItem
  navigationMap: Map<string, INavigationItem[]>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="group relative">
      <Link
        href={`/${item.slug.current}`}
        className="block py-2 text-gray-100 text-lg font-medium hover:text-primary"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {item.title}
      </Link>
      {navigationMap.has(item._id) && isOpen && (
        <div className="absolute left-0 bottom-0">
          {navigationMap.get(item._id)?.map(subItem => (
            <Link
              key={subItem._id}
              href={`/${item.slug.current}/${subItem.slug.current}`}
              className="block text-gray-100 text-sm hover:text-primary"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavigationItem
