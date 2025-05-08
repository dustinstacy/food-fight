import { create } from 'zustand'

import { getChallenge, verifySignature } from 'api'
import { AuthStore, parseAuthError, validateToken } from 'features/auth'

/**
 * Zustand store hook for managing the application's authentication state.
 *
 * @remarks
 * This store is responsible for:
 * - Handling user authentication using SIWE (Sign-In with Ethereum)
 * - Managing the authentication state (isAuthenticated, isAttemptingAuth, etc.)
 * - Handling user logout
 * - Storing and validating access tokens
 * - Managing the new user flag
 */
export const useAuthStore = create<AuthStore>((set, get) => ({
  //////////////////////////////////////////////////
  /// Initial State                              ///
  //////////////////////////////////////////////////

  isAuthenticated: false,
  isAttemptingAuth: false,
  isLoggingOut: false,
  isNewUser: null,
  authError: null,

  //////////////////////////////////////////////////
  /// HandleAuthentication                       ///
  //////////////////////////////////////////////////

  handleAuthentication: async (address, chainId, signMessageAsync, isConnected) => {
    if (get().isAttemptingAuth || get().isLoggingOut || !isConnected) {
      console.warn(
        `[AuthStore] Auth attempt prevented, ${
          get().isAttemptingAuth
            ? 'already attempting authentication'
            : get().isLoggingOut
              ? 'currently logging out'
              : !isConnected
                ? 'wallet not connected'
                : ''
        }`
      )
      return
    }
    set({ isAttemptingAuth: true, authError: null, isLoggingOut: false, isNewUser: null })

    // Skip SIWE if a valid token is found
    const token = localStorage.getItem('accessToken')
    const { isValid: isTokenValid } = validateToken({ token, address, chainId })
    if (isTokenValid) {
      console.log('[AuthStore] Existing token is valid. Skipping SIWE.')
      set({ isAuthenticated: true, isAttemptingAuth: false, isNewUser: false })
      return
    }

    // Proceed with SIWE
    console.log(`[AuthStore] Starting SIWE for ${address} on chain ${chainId}...`)
    if (token) localStorage.removeItem('accessToken')
    set({ isAuthenticated: false })

    try {
      // Generate SIWE message
      const message = await getChallenge(address, chainId)

      // Ask user to sign the message
      const signature = await signMessageAsync({ message })

      // Verify SIWE signature and get access token
      const { accessToken, isNewUser } = await verifySignature({ message, signature, address })
      localStorage.setItem('accessToken', accessToken)

      // Success
      set({ isAuthenticated: true, isAttemptingAuth: false, authError: null, isNewUser })
      console.log('[AuthStore] SIWE successful.')
    } catch (error: unknown) {
      if (!get().isLoggingOut) {
        console.error('[AuthStore] Authentication flow error:', error)
        const { displayMessage } = parseAuthError(error)
        set({
          isAuthenticated: false,
          authError: displayMessage,
          isNewUser: null,
        })
        localStorage.removeItem('accessToken')
      } else {
        console.log('[AuthStore] Authentication flow interrupted by logout.')
      }
    } finally {
      if (get().isAttemptingAuth) {
        set({ isAttemptingAuth: false })
      }
    }
  },

  /////////////////////////////////////////////////////
  /// Logout                                        ///
  /////////////////////////////////////////////////////

  logout: () => {
    set({ isLoggingOut: true, isAttemptingAuth: false, isAuthenticated: false, authError: null, isNewUser: null })
    localStorage.removeItem('accessToken')
    set({ isLoggingOut: false })
    console.log('[AuthStore] User logged out.')
  },

  /////////////////////////////////////////////////////
  /// Reset New User Flag                           ///
  /////////////////////////////////////////////////////

  resetNewUserFlag: () => {
    if (get().isNewUser === true) {
      set({ isNewUser: false })
    }
  },
}))

export default useAuthStore
