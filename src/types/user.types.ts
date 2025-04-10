/**
 * @interface User represents a user in the application.
 * @property {string} address - The user's wallet address.
 * @property {string} username - The user's chosen username.
 * @property {string} createdAt - The date and time when the user was created.
 * @property {string} image - The URL of the user's profile image.
 */
export interface User {
  address: string
  username: string
  createdAt: string
  image: string
}

/**
 * @interface UserState represents the state of the user in the application.
 * @property {User | null} user - The current user object or null if no user is logged in.
 * @property {boolean} checkingForUser - A boolean indicating if the application is currently checking for a user.
 * @property {(user: User | null) => void} setUser - A function to set the user state.
 * @param user - The user object or null to set.
 * @property {(address: string) => Promise<void>} checkForUser - A function to check for a user based on the provided address.
 * @param address - The user's wallet address to check against the backend.
 * @returns A promise that resolves when the check is complete.
 */
export interface UserState {
  user: User | null
  checkingForUser: boolean
  setUser: (user: User | null) => void
  checkForUser: (address: string) => Promise<void>
}
