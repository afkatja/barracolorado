"use client"

import React from "react"

interface DialogProps {
  onClose: () => void
  children: React.ReactNode
}

const Dialog = ({ onClose, children }: DialogProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <button
        className="absolute top-4 right-4 text-gray-50 text-2xl hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </div>
  )
}

export default Dialog
