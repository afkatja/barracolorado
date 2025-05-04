const truncateString = (str: string, length: number): string => {
  if (!str) return ""
  const trimmedString =
    str.length > length
      ? str.substring(0, length - 3) + "..."
      : str.substring(0, length)
  return trimmedString
}

export { truncateString }
