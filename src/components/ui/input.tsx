import React, { ChangeEventHandler } from "react"

import { cn } from "@/lib/utils"

const Input = ({
  id,
  label,
  type,
  name,
  initialValue,
  onChange,
  error,
  placeholder,
  ...props
}: {
  id: string
  label: string
  name: string
  initialValue: string
  type: "text" | "email" | "password"
  onChange: ChangeEventHandler
  error?: string
  placeholder?: string
  className?: string
  [prop: string]: any
}) => {
  return (
    <div className={cn(props.className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={initialValue}
        onChange={onChange}
        placeholder={placeholder}
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
