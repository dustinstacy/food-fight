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
  /** Indicates if the user is new. */
  isNewUser: boolean | null
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

  /** Action to set manually reset the NewUser flag */
  resetNewUserFlag: () => void
}
