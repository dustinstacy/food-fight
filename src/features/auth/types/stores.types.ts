/////////////////////////////////////////////////////
/// AuthStore Types                               ///
/////////////////////////////////////////////////////

/**
 * Defines the structure of the authentication state.
 */
export interface AuthState {
  /** Indicates if the user is authenticated. */
  isAuthenticated: boolean
  /** Indicates if the authentication process is currently in progress. */
  isAttemptingAuth: boolean
  /** Indicates if the user is logging out. */
  isLoggingOut: boolean
  /** Indicates if the user is new. */
  isNewUser: boolean | null
  /** Any error that occurred during authentication. */
  authError: string | null
}

/**
 * Defines the actions available for managing authentication state.
 */
export interface AuthActions {
  /**
   * Action to handle SIWE flow and token validation.
   * @param address - The user's wallet address.
   * @param chainId - The chain ID of the connected wallet.
   * @param signMessageAsync - Function to sign a message asynchronously.
   * @param isConnected - Indicates if the wallet is connected.
   */
  handleAuthentication: (
    address: string,
    chainId: number,
    signMessageAsync: (args: { message: string }) => Promise<`0x${string}`>,
    isConnected: boolean
  ) => Promise<void>

  /** Action for logging out the user. */
  logout: () => void

  /** Action to set manually reset the NewUser flag */
  resetNewUserFlag: () => void
}

/**
 * Defines the complete structure of the authentication store, combining state and actions.
 */
export type AuthStore = AuthState & AuthActions
