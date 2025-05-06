import React from "react"
import RootLayout from "./layout"
import Header from "../components/Header"
import Footer from "../components/Footer"

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      <Header />
      {children}
      <Footer />
    </RootLayout>
  )
}

export default PagesLayout
