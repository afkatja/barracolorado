"use client"
import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GalleryAnimationProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const GalleryAnimation: React.FC<GalleryAnimationProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || hasAnimated.current)
      return

    // Dynamically import GSAP
    import("gsap").then(({ default: gsap }) => {
      // Random initial position and opacity
      const randomX = (Math.random() - 0.5) * 200 // Random value between -100 and 100
      const randomY = (Math.random() - 0.5) * 200 // Random value between -100 and 100
      const randomRotation = (Math.random() - 0.5) * 20 // Random rotation between -10 and 10 degrees

      // Set initial state
      gsap.set(ref.current, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        opacity: 0,
      })

      // Animate to final position
      gsap.to(ref.current, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: Math.random() * 1.5, // Random delay between 0 and 1.5 seconds
        onComplete: () => {
          hasAnimated.current = true
        },
      })
    })
  }, [])

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  )
}

export default GalleryAnimation
