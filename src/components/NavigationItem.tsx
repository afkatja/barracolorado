"use client"
import React from "react"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { usePathname } from "next/navigation"
import { INavigationItem } from "./Navigation"

const NavigationItem = ({
  item,
  lang,
}: {
  item: INavigationItem
  lang: string
}) => {
  const pathname = usePathname()

  return (
    <NavigationMenu.Item key={item._id} className="relative">
      <NavigationMenu.Trigger className="group" asChild>
        <Link
          href={`/${lang}/${item.slug.current}`}
          className={`block text-gray-100 text-lg font-medium hover:text-gray-400 transition-colors ${
            pathname === `/${lang}/${item.slug.current}` ? "text-gray-400" : ""
          }`}
        >
          {item.displayTitle ?? item.title}
        </Link>
      </NavigationMenu.Trigger>
      {!!item.subItems?.length && (
        <NavigationMenu.Content className="absolute top-full left-0 w-15 bg-gray-50 shadow-lg rounded-md p-1 z-50">
          {item.subItems?.map(subItem => (
            <Link
              key={subItem._id}
              href={`/${lang}/${item.slug.current}/${subItem.slug.current}`}
              className={`block p-1 hover:text-gray-400 transition-colors ${
                pathname === `/${item.slug.current}/${subItem.slug.current}`
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <div className="font-medium">
                {subItem.displayTitle ?? subItem.title}
              </div>
            </Link>
          ))}
        </NavigationMenu.Content>
      )}
    </NavigationMenu.Item>
  )
}
export default NavigationItem
