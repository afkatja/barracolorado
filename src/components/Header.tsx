import Link from "next/link"

import { Logo } from "./icons"
import LanguageSelector from "./LanguageSelector"
import Navigation from "./Navigation"

const Header = ({ lang, id }: { lang: string; id?: string }) => {
  return (
    <header
      id={id || "header"}
      className="bg-linear-to-bl from-teal-800 to-cyan-900 z-50 sticky top-0 transition-all duration-300"
    >
      <div className="mx-auto w-11/12 flex items-center py-1">
        <Link href="/" className="block text-3xl text-slate-900 order-1">
          <Logo
            className="fill-gray-50 w-[var(--header-height)] h-[var(--header-height)]"
            style={{
              animationName: "header-shrink",
              animationTimeline: "scroll()",
              animationRange: "entry 150px exit",
            }}
          />
        </Link>
        <LanguageSelector />
        <Navigation lang={lang} />
      </div>
    </header>
  )
}

export default Header
