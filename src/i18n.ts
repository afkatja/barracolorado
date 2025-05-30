export const locales = [
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

export const defaultLocale = locales.find(item => item.isDefault)?.id

export const localePrefix = "as-needed"
