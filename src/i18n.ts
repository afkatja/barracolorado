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
export const locales =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? allLocales.filter(locale => ["en", "es"].includes(locale.id))
    : allLocales

export const defaultLocale = locales.find(item => item.isDefault)?.id

export const localePrefix = "as-needed"
