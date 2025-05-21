import Link from "next/link"
import Navigation from "./Navigation"
import { Logo } from "./icons"
import LanguageSelector from "./LanguageSelector"

const Header = ({ lang, id }: { lang: string; id?: string }) => {
  return (
    <header
      id={id || "header"}
      className="bg-linear-to-bl from-teal-800 to-cyan-900 z-50 h-[var(--header-height)]"
    >
      <div className="mx-auto w-11/12 flex items-center py-1">
        <Link
          href="/"
          className="block w-6 h-6 text-3xl text-slate-900 order-1"
        >
          <Logo className="fill-gray-50" />
        </Link>
        <LanguageSelector />
        <Navigation lang={lang} />
      </div>
    </header>
  )
}

export default Header
