import React from "react"
import RootLayout from "../layout"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      <Header />
      <main
        className="min-h-screen"
        style={{
          viewTimelineName: "--scroll-timeline",
          scrollTimelineName: "--scroll-timeline",
        }}
      >
        {children}
      </main>
      <Footer />
    </RootLayout>
  )
}

export default PagesLayout
