import { locales, defaultLocale } from "@/i18n"

export type InternationalizedField = {
  _key: string
  _type: string
  value: string
  language: string
}

export function getLocalizedField(
  field: InternationalizedField[],
  locale: string
): string {
  if (!field) return ""

  // Try to get the field in the requested locale
  const localizedField = field.find(f => f.language === locale)
  if (localizedField) return localizedField.value

  // Fallback to English if the requested locale is not available
  const englishField = field.find(f => f.language === "en")
  if (englishField) return englishField.value

  // If no English version is available, return the first available translation
  return field[0]?.value || ""
}

export function getLocalizedFields(
  fields: Record<string, InternationalizedField[]>,
  locale: string
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(fields)) {
    result[key] = getLocalizedField(value, locale)
  }

  return result
}

export function isValidLocale(locale: string): boolean {
  return locales.some(loc => loc.id === locale)
}

export function getDefaultLocale(): string {
  return defaultLocale || "en"
}

export function getLocaleFromPath(path: string): string {
  const segments = path.split("/")
  const locale = segments[1]
  return isValidLocale(locale) ? locale : getDefaultLocale()
}

export function getPathWithLocale(path: string, locale: string): string {
  const segments = path.split("/")
  segments[1] = locale
  return segments.join("/")
}

export function getAlternateLocales(currentLocale: string): typeof locales {
  return locales.filter(locale => locale.id !== currentLocale)
}
