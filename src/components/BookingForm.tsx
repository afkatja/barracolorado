"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Datepicker from "./Datepicker"
import { TFormData } from "../types"
import Input from "./ui/input"

type BookingFormProps = {
  data: TFormData
  onSubmit: (formData: {
    name: string
    email: string
    people: number
    date: Date
  }) => void
}

const generateDateRange = (startDate: Date, days: number = 30) => {
  const dates = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < days; i++) {
    dates.push({
      date: new Date(currentDate),
      availableSlots: 1,
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

const BookingForm = ({ data, onSubmit }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    people: data.formSettings.minPeople,
    date: new Date(),
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = data.formValidation.required
    }

    if (!formData.email) {
      newErrors.email = data.formValidation.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = data.formValidation.invalidEmail
    }

    if (formData.people < data.formSettings.minPeople) {
      newErrors.people = data.formValidation.minPeople
    } else if (formData.people > data.formSettings.maxPeople) {
      newErrors.people = data.formValidation.maxPeople
    }

    if (!formData.date) {
      newErrors.date = data.formValidation.required
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        people: data.formSettings.minPeople,
        date: new Date(),
      })
      setErrors({})
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    !!Object.keys(errors).length &&
    !!formData.name.trim() &&
    !!formData.email.trim() &&
    !!formData.date

  // Generate available dates if none are provided
  const availableDates = data.formSettings.availableDates?.length
    ? data.formSettings.availableDates.map(date => new Date(date.date))
    : generateDateRange(new Date(), 30).map(date => date.date)

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4">
      {data.title && <h2 className="text-2xl font-bold mt-0">{data.title}</h2>}
      {data.subtitle && <h3 className="text-xl">{data.subtitle}</h3>}
      {data.description && <p className="text-gray-600">{data.description}</p>}

      <div className="space-y-2">
        <Input
          id="name"
          label={data.formLabels.nameLabel}
          type="text"
          initialValue={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          error={errors.name}
        />
        <Input
          id="email"
          label={data.formLabels.emailLabel}
          type="email"
          initialValue={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
        />
        <div>
          <label htmlFor="people" className="block text-sm font-medium mb-1">
            {data.formLabels.peopleLabel}
          </label>
          <Select
            value={formData.people.toString()}
            onValueChange={(value: string) =>
              setFormData({ ...formData, people: parseInt(value) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={data.formLabels.peopleLabel} />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                {
                  length:
                    data.formSettings.maxPeople -
                    data.formSettings.minPeople +
                    1,
                },
                (_, i) => data.formSettings.minPeople + i
              ).map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.people && (
            <p className="mt-1 text-sm text-red-600">{errors.people}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {data.formLabels.dateLabel}
          </label>
          <Datepicker
            label={data.formLabels.dateLabel}
            onSelectDate={(date: Date | undefined) =>
              date && setFormData({ ...formData, date })
            }
            date={formData.date}
            error={!!errors.date}
            availableDates={availableDates}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>
      </div>
      <footer className="flex">
        <Button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-gray-50 cursor-pointer text-lg py-1 px-2 ml-auto mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "..." : data.formLabels.submitButton}
        </Button>
      </footer>
    </form>
  )
}
export default BookingForm
