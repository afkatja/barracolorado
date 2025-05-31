"use client"
import * as Collapsible from "@radix-ui/react-collapsible"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { ChevronDown, Close } from "./icons"
import { INavigationItem } from "./Navigation"

const MobileNavigation = ({ items }: { items: INavigationItem[] }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  return (
    <div className="lg:hidden ml-auto order-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-100 hover:text-gray-500 transition-colors"
      >
        <div className="w-3 h-2 flex flex-col justify-between">
          <motion.span
            className="h-0.5 w-full bg-current"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0,
            }}
          />
          <motion.span
            className="h-0.5 w-full bg-current"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
          />
          <motion.span
            className="h-0.5 w-full bg-current"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
            }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0.2 }}
            className="fixed inset-0 bg-gray-50 z-50 p-1"
          >
            <div className="flex justify-between items-center mb-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 ml-auto hover:text-primary transition-colors"
              >
                <Close />
              </button>
            </div>

            <nav className="p-2">
              {items.map(item => (
                <Collapsible.Root key={item._id} className="py-1">
                  <Collapsible.Trigger asChild>
                    <Link
                      href={`/${item.slug.current}`}
                      className={`w-full py-1 text-lg font-medium flex items-center justify-between ${
                        pathname === `/${item.slug.current}`
                          ? "text-primary"
                          : ""
                      }`}
                    >
                      {item.title}
                      {!!item.subItems?.length && <ChevronDown />}
                    </Link>
                  </Collapsible.Trigger>
                  {!!item.subItems?.length && (
                    <Collapsible.Content className="pl-2 w-full">
                      {item.subItems?.map(subItem => (
                        <Link
                          key={subItem._id}
                          href={`/${item.slug.current}/${subItem.slug.current}`}
                          className={`block py-1 ${
                            pathname ===
                            `/${item.slug.current}/${subItem.slug.current}`
                              ? "text-gray-500"
                              : "text-gray-900"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </Collapsible.Content>
                  )}
                </Collapsible.Root>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavigation
