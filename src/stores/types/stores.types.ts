////////////////////////////////////////////////////
/// useAuthStore                                 ///
////////////////////////////////////////////////////

/**
 * Defines the structure of the authentication state.
 */
export interface AuthState {
  /** Indicates if the user is authenticated. */
  isAuthenticated: boolean
  /** Indicates if the authentication process is currently in progress. */
  isLoading: boolean
  /** Any error that occurred during authentication. */
  authError: string | null
}

/**
 * Describes the actions available for managing authentication state.
 */
export interface AuthActions {
  /**
   * Action to handle SIWE flow and token validation.
   * @param address - The user's wallet address.
   * @param chainId - The chain ID of the connected wallet.
   * @param signMessageAsync - Function to sign a message asynchronously.
   */
  handleAuthentication: (
    address: string,
    chainId: number,
    signMessageAsync: (args: { message: string }) => Promise<`0x${string}`>
  ) => Promise<void>

  /**
   * Action to check existing JWT token in storage.
   * @param currentAddress - The user's current wallet address.
   */
  checkExistingToken: (currentAddress: string | undefined) => void

  /** Action for logging out the user. */
  logout: () => void
}

////////////////////////////////////////////////////
/// useThemeStore                                ///
////////////////////////////////////////////////////

/** Defines the available themes for the application. */
export type Theme = 'light' | 'dark'

/** Describes the structure of the theme state. */
export interface ThemeState {
  /** The current active theme. */
  theme: Theme
}

/**
 * Describes the actions available for managing the theme state.
 */
export interface ThemeActions {
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

/** Represents a user profile within the application. */
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

/** Describes the structure of the user state. */
export interface UserState {
  /** The current authenticated user's profile data (`User` object), or `null` if not logged in or data hasn't been fetched yet. */
  user: User | null

  /** A boolean flag indicating if an asynchronous operation (fetch/create user) is currently in progress. Useful for showing loading indicators. */
  checkingForUser: boolean
}

/**
 * Describes the actions available for managing user state.
 */
export interface UserActions {
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
