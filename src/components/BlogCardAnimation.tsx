"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface BlogCardAnimationProps {
  children: React.ReactNode
  index: number
  className?: string
}

const BlogCardAnimation: React.FC<BlogCardAnimationProps> = ({
  children,
  index,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return

    // Set initial state
    gsap.set(ref.current, {
      y: 50,
      opacity: 0,
    })

    // Animate to final position with staggered delay
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: index * 0.1, // Stagger the animation based on index
      onComplete: () => {
        hasAnimated.current = true
      },
    })
  }, [index])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}

export default BlogCardAnimation
