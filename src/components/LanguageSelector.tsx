"use client"
import { usePathname, useRouter } from "next/navigation"
import { locales } from "@/i18n"
import { useState, useRef, useEffect } from "react"
import { getLocaleFromPath, getPathWithLocale } from "@/lib/i18n"

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocale = getLocaleFromPath(pathname)
  const currentLanguage = locales.find(locale => locale.id === currentLocale)

  const handleLanguageChange = (locale: string) => {
    const newPathname = getPathWithLocale(pathname, locale)
    router.push(newPathname)
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative ml-2 order-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md text-gray-100 hover:text-gray-400 transition-colors text-lg font-medium cursor-pointer"
      >
        <span className={`text-xl ${currentLanguage?.flag}`} />
        <span className="hidden md:block">{currentLanguage?.title}</span>
      </button>

      <div
        className={`absolute right-0 top-0 mt-4 min-w-16 rounded-md shadow-lg bg-gray-50 ring-1 ring-gray-700 ring-opacity-5 transition-all duration-200 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 transform scale-y-100"
            : "opacity-0 transform scale-y-0 pointer-events-none"
        }`}
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          {locales.map(locale => (
            <button
              key={locale.id}
              onClick={() => handleLanguageChange(locale.id)}
              className={`${currentLanguage?.id === locale.id ? "text-gray-400 cursor-default" : "text-gray-900 cursor-pointer"} flex items-center gap-1 w-full p-1 text-sm  hover:text-gray-400`}
              role="menuitem"
            >
              <span className={locale.flag} />
              <span>{locale.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
