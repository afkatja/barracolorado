"use client"

import React from "react"
import ErrorLayout from "./errorLayout"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ErrorLayout>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        Oops!
      </h1>
      <h2 className="text-2xl md:text-3xl text-gray-700 mb-2">
        Something went wrong
      </h2>
      <p className="text-lg text-gray-600 mb-2">
        We&apos;re sorry, but something went wrong. Please try again later.
      </p>
      <button
        onClick={reset}
        className="inline-block bg-teal-600 hover:bg-teal-700 text-gray-50 font-semibold p-1 rounded-lg transition-colors duration-200"
      >
        Try Again
      </button>
    </ErrorLayout>
  )
}
