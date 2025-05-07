"use client"
import React from "react"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { usePathname } from "next/navigation"

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
  const pathname = usePathname()

  return (
    <NavigationMenu.Item key={item._id}>
      <NavigationMenu.Trigger className="group" asChild>
        <Link
          href={`/${item.slug.current}`}
          className={`block text-gray-100 text-lg font-medium hover:text-gray-400 transition-colors ${
            pathname === `/${item.slug.current}` ? "text-gray-400" : ""
          }`}
        >
          {item.title}
        </Link>
      </NavigationMenu.Trigger>
      {navigationMap.has(item._id) && (
        <NavigationMenu.Content className="absolute top-full left-0 w-full max-w-15 bg-gray-50 shadow-lg rounded-md p-1">
          {navigationMap.get(item._id)?.map(subItem => (
            <Link
              key={subItem._id}
              href={`/${item.slug.current}/${subItem.slug.current}`}
              className={`block p-1 hover:text-gray-400 transition-colors ${
                pathname === `/${item.slug.current}/${subItem.slug.current}`
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <div className="font-medium">{subItem.title}</div>
            </Link>
          ))}
        </NavigationMenu.Content>
      )}
    </NavigationMenu.Item>
  )
}
export default NavigationItem
