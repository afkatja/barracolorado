"use client"

import { useState } from "react"
import { FaInfoCircle } from "react-icons/fa"

import Dialog from "./Dialog"
import { Button } from "./ui/button"
import Input from "./ui/input"

const MoreInfoForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isFormValid = !error && !!formData.name && !!formData.email

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
        body: JSON.stringify({
          ...formData,
          subject: "More information request",
          message: "Request for more information",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSuccess(true)
      setFormData({ name: "", email: "" })
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        Request More Information
      </h2>
      {success ? (
        <div className="text-center text-green-600 mb-2">
          Thank you for your interest! We&apos;ll get back to you soon.
        </div>
      ) : null}
      {error ? (
        <div className="text-center text-red-600 mb-2">{error}</div>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-2 w-full">
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          id="name"
          label="Name"
          initialValue={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          id="email"
          label="Email"
          initialValue={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-bold p-1.5 rounded-lg focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  )
}

const MoreInfoButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      key="more-info"
      className="max-w-1/3"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      button={{
        onButtonClick: () => setIsOpen(true),
        className:
          "bg-transparent hover:bg-transparent text-teal-700 hover:text-teal-800 p-0! transition-colors duration-300 cursor-pointer",
        buttonChildren: <FaInfoCircle size={10} className="w-1 h-1" />,
      }}
    >
      <MoreInfoForm onClose={() => setIsOpen(false)} />
    </Dialog>
  )
}

export default MoreInfoButton
