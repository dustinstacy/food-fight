/**
 * Factory function to create unique query keys for user data
 */
export const userKeys = {
  currentUser: (address: string | undefined) => ['currentUser', address] as const,
}
