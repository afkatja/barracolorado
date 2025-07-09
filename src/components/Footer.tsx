import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faWhatsapp,
  // faLinkedinIn,
  // faDribbble,
  // faPinterest,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { sanityFetch } from "../sanity/lib/client"
import { FOOTER_PAGE_QUERY } from "../sanity/lib/queries"

const Footer = async ({ id, lang }: { id?: string; lang: string }) => {
  const footerPages = await sanityFetch<
    { title: string; slug: { current: string }; name?: string }[]
  >({
    query: FOOTER_PAGE_QUERY,
    params: { locale: lang, category: "footer" },
  })

  return (
    <footer
      id={id || "footer"}
      className="bg-gray-900 text-gray-50 py-4 px-2 md:p-4"
    >
      <ul className="icons grid auto-cols-auto grid-flow-col justify-center space-x-4 mb-2 md:mb-4">
        <li>
          <a href="#" className="icon brands">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a href="#" className="icon brands">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </li>
        <li>
          <a href="#" className="icon brands">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
        <li>
          <a href="http://wa.me/50688748375" className="icon brands">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </li>
        {/* <li>
        <a href="#" className="icon brands">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </li>
      <li>
        <a href="#" className="icon brands">
          <FontAwesomeIcon icon={faDribbble} />
        </a>
      </li>
      <li>
        <a href="#" className="icon brands">
          <FontAwesomeIcon icon={faPinterest} />
        </a>
      </li> */}
      </ul>
      <ul className="grid grid-cols-1 md:auto-cols-auto md:grid-flow-col justify-center md:space-x-4 space-y-1">
        <li>&copy; Barra Colorado</li>
        {footerPages.map(page => (
          <li key={crypto.randomUUID()}>
            <Link href={`${lang}/${page.slug.current}`}>
              {page.name ?? page.title}
            </Link>{" "}
          </li>
        ))}
        <li>
          Design & development:{" "}
          <a href="http://afkatja.github.io" className="underline">
            Katja Hollaar
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
