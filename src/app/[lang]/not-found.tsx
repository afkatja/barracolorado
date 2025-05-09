import React from "react"
import Link from "next/link"
import ErrorLayout from "./errorLayout"

export default function NotFound() {
  return (
    <ErrorLayout>
      <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-teal-600 hover:bg-teal-700 text-gray-50 font-semibold p-1 rounded-lg transition-colors duration-200"
      >
        Return Home
      </Link>
    </ErrorLayout>
  )
}
