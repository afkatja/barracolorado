"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"

interface DialogProps {
  children: React.ReactNode
  buttonText: string
}

const Dialog = ({ children, buttonText }: DialogProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Toggle body class when dialog is open
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  useEffect(() => {
    if (typeof window === "undefined" || !popoverRef.current) return
    import("gsap").then(({ default: gsap }) => {
      if (isOpen) {
        // Animate in
        gsap.fromTo(
          popoverRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        )
      } else {
        // Animate out
        gsap.to(popoverRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    })
  })

  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="bg-teal-500 hover:bg-teal-700 text-gray-50 cursor-pointer text-lg ml-auto"
      >
        {buttonText}
      </Button>
      <div
        ref={popoverRef}
        style={{ opacity: 0 }}
        className={`${!isOpen ? "pointer-events-none" : ""} fixed top-0 w-screen h-screen inset-0 bg-gray-900/90 bg-opacity-75 z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-50 text-2xl hover:text-gray-300 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
        <div className="w-full h-full flex flex-col items-center relative p-4 overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  )
}

export default Dialog
