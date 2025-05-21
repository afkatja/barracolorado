import React from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

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
          {date ? format(date, "PPP") : <span>{label}</span>}
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
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default Datepicker
