export const allLocales = [
  {
    id: "en",
    countryCode: "US",
    title: "English",
    flag: "fi fi-us",
    isDefault: true,
  },
  { id: "fr", countryCode: "FR", title: "Français", flag: "fi fi-fr" },
  { id: "nl", countryCode: "NL", title: "Nederlands", flag: "fi fi-nl" },
  { id: "es", countryCode: "CR", title: "Español", flag: "fi fi-cr" },
]

// Filter locales based on environment
const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
export const locales = isProduction
  ? allLocales.filter(locale => ["en", "es"].includes(locale.id))
  : allLocales

export const defaultLocale = locales.find(item => item.isDefault)?.id || "en"

// Get available locale IDs for static generation
export const availableLocales = locales.map(locale => ({
  id: locale.id,
  title: locale.title,
  flag: locale.flag,
}))

export const availableLocaleIds = locales.map(locale => locale.id)

// Get fallback language for content
export const getFallbackLocale = (requestedLocale: string) => {
  const isAvailable = availableLocaleIds.includes(requestedLocale)
  return isAvailable ? requestedLocale : defaultLocale
}

export const localePrefix = "as-needed"
