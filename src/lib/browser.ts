const isMobile = (): boolean => {
  if (typeof window === "undefined") return false
  return /Mobi|Android/i.test(window.navigator.userAgent)
}

const getBrowserName = (): string => {
  if (typeof window === "undefined") return "unknown"
  const ua = window.navigator.userAgent
  if (/chrome|crios|crmo/i.test(ua)) return "chrome"
  if (/firefox|iceweasel|fxios/i.test(ua)) return "firefox"
  if (/safari/i.test(ua)) return "safari"
  if (/msie|trident/i.test(ua)) return "ie"
  if (/opr\//i.test(ua)) return "opera"
  if (/edg/i.test(ua)) return "edge"
  return "unknown"
}

export { isMobile, getBrowserName }
