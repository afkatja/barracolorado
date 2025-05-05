"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: "left" | "right"
  className?: string
  style?: React.CSSProperties
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction = "left",
  className = "",
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // GSAP fallback for browsers that don't support scroll-timeline
    if (!CSS.supports("animation-timeline: scroll()")) {
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
    }
  }, [direction])

  return (
    <div
      ref={ref}
      className={cn(
        className,
        direction === "left" ? "animate-slideleft" : "animate-slideright"
      )}
      style={{
        ...(CSS.supports("animation-timeline: scroll()")
          ? {
              viewTimelineName: "--scroll-timeline",
              animationTimeline: "--scroll-timeline",
              animationRange: "0 entry 70%", //"entry 20% cover 50%",
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
