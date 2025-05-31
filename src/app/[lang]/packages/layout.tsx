import React from "react"

import Footer from "../../../components/Footer"
import Header from "../../../components/Header"
import PageTransition from "../../../components/PageTransition"
import RootLayout from "../layout"

const PackagesLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) => {
  const { lang } = await params
  return (
    <RootLayout params={{ lang }}>
      <PageTransition>
        <Header id="packages" lang={lang} />
        <main
          className="min-h-[calc(100vh-var(--header-height))] flex flex-col"
          style={{
            viewTimelineName: "--scroll-timeline",
            scrollTimelineName: "--scroll-timeline",
          }}
        >
          {children}
        </main>
        <Footer id="packages" lang={lang} />
      </PageTransition>
    </RootLayout>
  )
}

export default PackagesLayout
