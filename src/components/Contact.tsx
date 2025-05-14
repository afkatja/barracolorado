"use client"
import { Element } from "react-scroll"
import { TContact } from "../types"

const Contact = ({ contact }: { contact: TContact }) => {
  if (!contact) return null

  return (
    <Element name="contact" className="main fullscreen">
      <section
        id="contact"
        className="style3 bg-linear-to-bl from-teal-800 to-cyan-900 text-gray-50 p-8 flex-1"
      >
        <div className="content text-center">
          <header>
            <h2 className="text-3xl mb-4">{contact.title}</h2>
            <p className="mb-4">{contact.subtitle}</p>
          </header>
          <div className="bg-gray-50 p-4">
            <form method="post" action="#">
              <div className="fields grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="field half">
                  <input
                    type="text"
                    name="name"
                    placeholder={contact.formLabels.nameLabel}
                    className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder:text-gray-700"
                  />
                </div>
                <div className="field half">
                  <input
                    type="email"
                    name="email"
                    placeholder={contact.formLabels.emailLabel}
                    className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder:text-gray-700"
                  />
                </div>
                <div className="field col-span-2">
                  <textarea
                    name="message"
                    placeholder={contact.formLabels.messageLabel}
                    rows={6}
                    className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder:text-gray-700"
                  ></textarea>
                </div>
              </div>
              <ul className="actions special flex justify-center">
                <li>
                  <input
                    type="submit"
                    value={contact.formLabels.submitButton}
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-bold p-1.5 rounded-lg focus:outline-none cursor-pointer"
                  />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>
    </Element>
  )
}

export default Contact
