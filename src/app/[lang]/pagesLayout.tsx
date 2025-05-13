import React from "react"
import RootLayout from "./layout"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const PagesLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) => {
  const { lang } = await params
  return (
    <RootLayout params={{ lang }}>
      <Header />
      {children}
      <Footer />
    </RootLayout>
  )
}

export default PagesLayout
