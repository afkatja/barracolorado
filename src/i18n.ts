export const locales = [
  {
    id: "en",
    countryCode: "US",
    title: "English",
    flag: "🇺🇸",
    isDefault: true,
  },
  { id: "fr", countryCode: "FR", title: "Français", flag: "🇫🇷" },
  { id: "nl", countryCode: "NL", title: "Nederlands", flag: "🇳🇱" },
  { id: "es", countryCode: "CR", title: "Español", flag: "🇨🇷" },
]

export const defaultLocale = locales.find(item => item.isDefault)?.id

export const localePrefix = "as-needed"
