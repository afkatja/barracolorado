import React from "react"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import Footer from "../../components/Footer"
import { Logo } from "../../components/icons"
import Link from "next/link"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({ subsets: ["latin"] })

const errorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <html lang="en">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen ${inter.className}`}
    //   >
    <>
      <header
        id="header"
        className="bg-linear-to-bl from-teal-800 to-cyan-900 z-50 h-[var(--header-height)]"
      >
        <div className="mx-auto w-11/12 flex items-center py-1">
          <Link href="/" className="block w-6 h-6 text-3xl text-slate-900">
            <Logo className="fill-gray-50" />
          </Link>
        </div>
      </header>
      <main
        className="flex flex-col"
        style={{
          viewTimelineName: "--scroll-timeline",
          scrollTimelineName: "--scroll-timeline",
        }}
      >
        <div className="min-h-[calc(100vh-var(--header-height)*1.5)] flex items-center justify-center bg-linear-to-br from-teal-800 to-cyan-900">
          <div className="bg-gray-100 rounded-lg shadow-lg my-4 p-4 max-w-2xl mx-auto text-center">
            {children}
          </div>
        </div>
      </main>
      <Footer id="error" lang="en" />
    </>
    //   </body>
    // </html>
  )
}

export default errorLayout
