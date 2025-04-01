import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faDribbble,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons"
// import Link from "next/link"

const Footer = () => (
  <footer id="footer" className="bg-gray-900 text-white p-4">
    <ul className="icons flex justify-center space-x-4 mb-4">
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
      </li>
    </ul>
    <ul className="menu flex justify-center space-x-4">
      <li>&copy; Barra Coronado</li>
      <li>
        Design:{" "}
        <a href="#" className="underline">
          Katja Hollaar
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer
