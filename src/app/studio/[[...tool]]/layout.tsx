export const metadata = {
  title: "Barra Colorado CMS",
  description: "Edit your content here",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
