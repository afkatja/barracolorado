"use client"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: "left" | "right"
  className?: string
  style?: React.CSSProperties
  dataTestId?: string
  asSection?: boolean
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction = "left",
  className = "",
  style = {},
  dataTestId,
  asSection,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const isMobile = window.innerWidth < 768
    if (isMobile) return

    if (!asSection) return

    // Check for scroll-timeline support
    setSupportsScrollTimeline(CSS.supports("animation-timeline: scroll()"))
    if (!supportsScrollTimeline && ref.current) {
      // Dynamically import GSAP only if needed
      import("gsap").then(({ default: gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          gsap.fromTo(
            ref.current,
            {
              x: direction === "left" ? -100 : 100,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              },
            }
          )
        })
      })
    }
  }, [direction, supportsScrollTimeline, asSection])

  const animationClass = () => {
    if (!asSection) return ""
    if (direction === "left") return "md:animate-slideleft"
    if (direction === "right") return "md:animate-slideright"
  }

  return (
    <div
      ref={ref}
      data-testid={dataTestId}
      className={cn(className, animationClass())}
      style={{
        ...(supportsScrollTimeline
          ? {
              viewTimelineName: "--scroll-timeline",
              animationTimeline: "--scroll-timeline",
              animationRange: "0 entry 70%",
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation
