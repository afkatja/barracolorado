"use client"
import { Calendar as CalendarIcon } from "lucide-react"
import { useParams } from "next/navigation"
import React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"


const Datepicker = ({
  label,
  date,
  onSelectDate,
  availableDates,
  error,
}: {
  label: string
  date: Date
  onSelectDate: (date: Date | undefined) => void
  availableDates: Date[]
  error: boolean
}) => {
  const params = useParams()

  const locale = (params?.lang as string) || "en"

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-start text-left font-normal border border-input py-1 px-2 has-[>svg]:px-2 h-3.5 bg-transparent gap-1",
            !date && "",
            error && "border-red-500"
          )}
        >
          <CalendarIcon className="mr-1 size-1" />
          {date ? formatDate(date) : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          weekStartsOn={1}
          mode="single"
          selected={date}
          onSelect={onSelectDate}
          disabled={(date: Date) =>
            date < new Date() ||
            !availableDates.some(
              availableDate =>
                availableDate.toDateString() === date.toDateString()
            )
          }
        />
      </PopoverContent>
    </Popover>
  )
}

export default Datepicker
