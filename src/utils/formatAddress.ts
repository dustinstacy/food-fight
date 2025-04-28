/**
 * Truncates an Ethereum address to the format "0x1234...abcd".
 *
 * @param address The full Ethereum address string.
 * @param startChars The number of characters to show at the start (after '0x'). Defaults to 4.
 * @param endChars The number of characters to show at the end. Defaults to 4.
 * @returns The truncated address string or the original string if invalid/too short.
 */
export const formatAddress = (address: string | undefined | null, startChars = 4, endChars = 4): string => {
  if (!address) {
    return ''
  }

  const addressLower = address.toLowerCase()
  const prefix = '0x'

  // Check if the address starts with '0x' and has enough characters to truncate meaningfully
  if (!addressLower.startsWith(prefix) || addressLower.length < prefix.length + startChars + endChars + 3) {
    return address
  }

  const start = addressLower.substring(0, prefix.length + startChars)
  const end = addressLower.substring(addressLower.length - endChars)
  return `${start}...${end}`
}
