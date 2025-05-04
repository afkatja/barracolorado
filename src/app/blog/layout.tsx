import React from "react"
import RootLayout from "../layout"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      <Header />
      {children}
      <Footer />
    </RootLayout>
  )
}

export default BlogLayout
