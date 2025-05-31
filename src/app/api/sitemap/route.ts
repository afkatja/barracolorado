import { groq } from "next-sanity"

import { client } from "@/sanity/lib/client"

interface SanityDocument {
  slug: {
    current: string
  }
  _updatedAt: string
}

export async function GET() {
  const baseUrl = "https://barradelcolorado.com"

  // Fetch all pages from Sanity
  const pages = await client.fetch<SanityDocument[]>(groq`
    *[_type == "page"] {
      slug,
      _updatedAt
    }
  `)

  // Fetch all blog posts from Sanity
  const posts = await client.fetch<SanityDocument[]>(groq`
    *[_type == "post"] {
      slug,
      _updatedAt
    }
  `)

  // Generate sitemap entries for pages
  const pageEntries = pages.map(page => ({
    url: `${baseUrl}/${page.slug.current}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Generate sitemap entries for blog posts
  const postEntries = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Combine all entries
  const sitemapEntries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...pageEntries,
    ...postEntries,
  ]

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries
    .map(
      entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
