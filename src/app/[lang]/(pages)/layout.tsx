import React from "react"
import RootLayout from "../layout"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import PageTransition from "../../../components/PageTransition"

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
      <PageTransition>
        <Header lang={lang} />
        <main
          className="min-h-[calc(100vh-var(--header-height))] flex flex-col"
          style={{
            viewTimelineName: "--scroll-timeline",
            scrollTimelineName: "--scroll-timeline",
          }}
        >
          {children}
        </main>
        <Footer id="pageslayout" lang={lang} />
      </PageTransition>
    </RootLayout>
  )
}

export default PagesLayout
