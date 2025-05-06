import React from "react"
import RootLayout from "./layout"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const PagesLayout = ({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) => {
  return (
    <RootLayout params={{ lang }}>
      <Header />
      {children}
      <Footer />
    </RootLayout>
  )
}

export default PagesLayout
