import React from "react"
import RootLayout from "../layout"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

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
