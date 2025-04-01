const breakpoints = {
  xxlarge: [1681, 1920],
  xlarge: [1281, 1680],
  large: [1001, 1280],
  medium: [737, 1000],
  small: [481, 736],
  xsmall: [null, 480],
}

const getBreakpoint = (width: number): string => {
  for (const [key, [min, max]] of Object.entries(breakpoints)) {
    if ((min === null || width >= min) && (max === null || width <= max)) {
      return key
    }
  }
  return "unknown"
}

export { breakpoints, getBreakpoint }
