import React, { ChangeEventHandler } from "react"
import { cn } from "@/lib/utils"

const Input = ({
  id,
  label,
  type,
  initialValue,
  onChange,
  error,
}: {
  id: string
  label: string
  initialValue: string
  type: "text" | "email" | "password"
  onChange: ChangeEventHandler
  error?: string
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={initialValue}
        onChange={onChange}
        className={cn(
          "block w-full rounded-md border border-input shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-2 py-1 text-sm",
          error && "border-red-500"
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input
