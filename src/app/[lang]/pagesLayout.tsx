import React from "react"
import RootLayout from "./layout"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const PagesLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) => {
  const { lang } = await params

  return (
    <RootLayout params={{ lang }}>
      <Header lang={lang} />
      {children}
      <Footer />
    </RootLayout>
  )
}

export default PagesLayout
