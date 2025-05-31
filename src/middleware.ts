import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { locales } from "@/i18n"

// Get the preferred locale from the request headers
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0]
    if (locales.some(loc => loc.id === preferredLocale)) {
      return preferredLocale
    }
  }
  return "en" // Default to English
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    locale =>
      pathname.startsWith(`/${locale.id}/`) || pathname === `/${locale.id}`
  )

  // If the pathname already has a locale, let it pass through
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Skip if the pathname starts with any of these prefixes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("favicon") ||
    pathname.startsWith("images") ||
    pathname.startsWith("image") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Redirect to the default locale if no locale is present
  const locale = getLocale(request)
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|studio|.*\\..*).*)",
  ],
}
