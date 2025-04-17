////////////////////////////////////////////////////
/// useThemeStore                                ///
////////////////////////////////////////////////////

/** Defines the available themes for the application. */
export type Theme = 'light' | 'dark'

/** Describes the state structure and actions provided by the theme management store. */
export interface ThemeState {
  /** The current active theme. */
  theme: Theme

  /**
   * Action to explicitly set the application theme.
   * @param newTheme - The theme to activate ('light' or 'dark').
   */
  setTheme: (theme: Theme) => void

  /** Action to toggle the application theme between 'light' and 'dark'. */
  toggleTheme: () => void
}

////////////////////////////////////////////////////
/// useUserStore                                 ///
////////////////////////////////////////////////////

/**
 * Represents a user profile within the application.
 */
export interface User {
  /** The user's unique wallet address (e.g., Ethereum Address).  */
  address: string

  /** The user's chosen display name. May not be unique initially. */
  username: string

  /** The date string representing when the user account was first created in the system. */
  createdAt: string

  /** URL pointing to the user's avatar/profile image. */
  image: string
}

/**
 * Describes the state structure and actions provided by the user management store.
 */
export interface UserState {
  /** The current authenticated user's profile data (`User` object), or `null` if not logged in or data hasn't been fetched yet. */
  user: User | null

  /** A boolean flag indicating if an asynchronous operation (fetch/create user) is currently in progress. Useful for showing loading indicators. */
  checkingForUser: boolean

  /**
   * Action to directly set the `user` state within the store.
   * @param user - The `User` object (or `null`) to set as the current user state.
   */
  setUser: (user: User | null) => void

  /**
   * Asynchronous action to initiate fetching the *authenticated* user's data or creating a new user
   * @returns A promise that resolves once the check/create operation and subsequent state updates are complete.
   */
  checkForUser: () => Promise<void>
}
