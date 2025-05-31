import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React from "react"

interface BreadcrumbsProps {
  items: {
    label: string
    href: string
  }[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link href="/" className="hover:text-gray-700">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="h-1 w-1" />
          <Link
            href={item.href}
            className={`hover:text-gray-700 ${
              index === items.length - 1
                ? "text-gray-900 font-medium cursor-default"
                : ""
            }`}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs
