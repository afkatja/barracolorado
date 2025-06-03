"use client"
import { useState } from "react"
import { Element } from "react-scroll"

import { TContact } from "../types"

import { Button } from "./ui/button"
import Input from "./ui/input"

const Contact = ({
  contact,
  id,
}: {
  contact: TContact | null
  id?: string
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!contact) return null

  const isFormValid =
    !error && !!formData.name && !!formData.email && !!formData.message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSuccess(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Element name={id ?? "contact"} className="main fullscreen">
      <section
        id="contact"
        className="bg-linear-to-bl from-teal-800 to-cyan-900 text-gray-50 p-8 flex-1"
      >
        <div className="content w-full">
          <header className="text-center">
            <h2 className="text-3xl mb-2 font-black">{contact.title}</h2>
            <h3 className="mb-4 font-bold text-lg">{contact.subtitle}</h3>
          </header>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
            {success ? (
              <div className="text-center text-green-600 mb-4">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            ) : null}
            {error ? (
              <div className="text-center text-red-600 mb-4">{error}</div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="fields grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="field half">
                  <Input
                    type="text"
                    name="name"
                    placeholder={contact.formLabels.nameLabel}
                    id="name"
                    label={contact.formLabels.nameLabel}
                    initialValue={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="field half">
                  <Input
                    type="email"
                    name="email"
                    placeholder={contact.formLabels.emailLabel}
                    id="email"
                    label={contact.formLabels.emailLabel}
                    initialValue={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    value={formData.message}
                    onChange={e =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="block w-full rounded-md border border-input shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <ul className="actions special flex justify-center">
                <li>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-bold p-1.5 rounded-lg focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting
                      ? "Sending..."
                      : contact.formLabels.submitButton}
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
