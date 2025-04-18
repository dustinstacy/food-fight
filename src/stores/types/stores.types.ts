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
  /** Indicates if the user is logging out. */
  isLoggingOut: boolean
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
