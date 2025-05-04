import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./styles/globals.css"
import "./styles/main.css"
import Head from "next/head"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Barra del Colorado",
  description: "Wildlife Refuge in Costa Rica",
  metadataBase: new URL("https://barradelcolorado.com"),
  keywords: [
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
    title: "Barra del Colorado Wildlife Refuge",
    description:
      "Experience the beauty of Costa Rica's wildlife refuge, home to diverse ecosystems and unique biodiversity.",
    url: "https://barradelcolorado.com",
    siteName: "Barra del Colorado",
    images: [
      {
        url: "/images/logo.png", // You'll need to add this image to your public folder
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
    title: "Barra del Colorado Wildlife Refuge",
    description:
      "Experience the beauty of Costa Rica's wildlife refuge, home to diverse ecosystems and unique biodiversity.",
    images: ["/images/logo.png"], // You'll need to add this image to your public folder
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Barra del Colorado</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
