import React from "react"

// import RootLayout from "./layout"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

const PagesLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) => {
  const { lang } = await params

  return (
    <>
      <Header lang={lang} id="pages" />
      {children}
      <Footer id="pages" lang={lang} />
    </>
  )
}

export default PagesLayout
