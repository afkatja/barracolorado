"use client"

import React, { useEffect, useRef, useState } from "react"

import { Button } from "./ui/button"

interface DialogProps {
  children: React.ReactNode
  button?: { className?: string; buttonChildren?: React.ReactNode }
}

const Dialog = ({ children, button }: DialogProps) => {
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
      {
        <Button
          variant="default"
          size="sm"
          onClick={() => setIsOpen(true)}
          className={`bg-teal-500 hover:bg-teal-700 text-gray-50 cursor-pointer text-lg ml-auto ${button?.className}`}
        >
          {button?.buttonChildren}
        </Button>
      }
      <div
        ref={popoverRef}
        style={{ opacity: 0 }}
        className={`${!isOpen ? "pointer-events-none" : ""} fixed top-0 w-screen h-screen inset-0 bg-gray-900/90 bg-opacity-75 z-50 flex flex-col items-center justify-center`}
      >
        <button
          className="absolute top-4 right-4 text-gray-50 text-2xl hover:text-gray-300 transition-colors cursor-pointer z-10"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
        <div className="w-11/12 min-h-11/12 md:w-1/2 md:min-h-1/2 flex flex-col items-center relative p-4 overflow-y-scroll bg-gray-50 rounded-lg">
          {children}
        </div>
      </div>
    </>
  )
}

export default Dialog
