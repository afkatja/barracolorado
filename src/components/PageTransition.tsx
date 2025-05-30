"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  // Show loading state when pathname changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        >
          <motion.div
            className="h-full bg-teal-600"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

export default PageTransition
