import type { Metadata, Viewport } from "next"
import Head from "next/head"
import { Geist, Geist_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import { locales } from "@/i18n"
import { client } from "@/sanity/lib/client"
import { seoSettingsQuery } from "@/sanity/lib/queries"
import WhatsAppButton from "@/components/WhatsAppButton"
import "react-day-picker/style.css"
import "../styles/globals.css"
import "../styles/main.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await client.fetch(seoSettingsQuery)

  return {
    title: seoSettings?.title || "Barra Colorado",
    description:
      seoSettings?.description ||
      "Barra Colorado - Your trusted partner in Barra del Colorado",
    metadataBase: new URL("https://barradelcolorado.com"),
    keywords: seoSettings?.keywords || [
      "Barra del Colorado",
      "Costa Rica",
      "Wildlife Refuge",
      "Ecotourism",
      "Nature Reserve",
      "Tropical Rainforest",
      "Biodiversity",
      "Conservation",
      "Wildlife",
      "Nature Tours",
    ],
    openGraph: {
      title: seoSettings?.ogTitle || "Barra del Colorado Wildlife Refuge",
      description:
        seoSettings?.ogDescription ||
        "Experience the beauty of Costa Rica's wildlife refuge, home to diverse ecosystems and unique biodiversity.",
      url: "https://barradelcolorado.com",
      siteName: "Barra del Colorado",
      images: [
        {
          url: seoSettings?.ogImage || "/images/logo.png",
          width: 1200,
          height: 630,
          alt: "Barra del Colorado Wildlife Refuge",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoSettings?.ogTitle || "Barra del Colorado Wildlife Refuge",
      description:
        seoSettings?.ogDescription ||
        "Experience the beauty of Costa Rica's wildlife refuge, home to diverse ecosystems and unique biodiversity.",
      images: [seoSettings?.ogImage || "/images/logo.png"],
    },
    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        {
          url: "/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/favicon/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "android-chrome-192x192",
          url: "/favicon/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          rel: "android-chrome-512x512",
          url: "/favicon/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    manifest: "/favicon/site.webmanifest",
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateStaticParams() {
  return locales.map(locale => ({
    lang: locale.id,
  }))
}

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }> | { lang: string }
}) => {
  const { lang } = await params
  return (
    <html lang={lang}>
      <Head>
        <title>Barra del Colorado</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen ${inter.className}`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

export default RootLayout
