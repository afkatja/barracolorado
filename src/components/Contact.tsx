"use client"
import { Element } from "react-scroll"
import { TContact } from "../types"
import Input from "./ui/input"
import { Button } from "./ui/button"

const Contact = ({ contact }: { contact: TContact }) => {
  if (!contact) return null

  return (
    <Element name="contact" className="main fullscreen">
      <section
        id="contact"
        className="bg-linear-to-bl from-teal-800 to-cyan-900 text-gray-50 p-8 flex-1"
      >
        <div className="content w-full">
          <header className="text-center">
            <h2 className="text-3xl mb-4">{contact.title}</h2>
            <p className="mb-4">{contact.subtitle}</p>
          </header>
          <div className="bg-gray-50 p-4 rounded-lg">
            <form method="post" action="#">
              <div className="fields grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="field half">
                  <Input
                    type="text"
                    name="name"
                    placeholder={contact.formLabels.nameLabel}
                    id="name"
                    label={contact.formLabels.nameLabel}
                    initialValue=""
                    onChange={() => {}}
                  />
                </div>
                <div className="field half">
                  <Input
                    type="email"
                    name="email"
                    placeholder={contact.formLabels.emailLabel}
                    id="email"
                    label={contact.formLabels.emailLabel}
                    initialValue=""
                    onChange={() => {}}
                  />
                </div>
                <div className="field col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    {contact.formLabels.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    placeholder={contact.formLabels.messageLabel}
                    rows={6}
                    className="block w-full rounded-md border border-input shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <ul className="actions special flex justify-center">
                <li>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-bold p-1.5 rounded-lg focus:outline-none cursor-pointer"
                  >
                    {contact.formLabels.submitButton}
                  </Button>
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
