import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

import { JwtPayload } from '@types'
import { getChallenge, verifySignature } from 'api'
import { AuthActions, AuthState } from 'stores/types'

type AuthStore = AuthState & AuthActions

/**
 * Zustand store hook for managing the application's authentication state.
 *
 * @remarks
 * This store handles the authentication flow using Sign-In with Ethereum (SIWE) and JWT tokens.
 * It provides actions to:
 * - Handle authentication (`handleAuthentication`).
 * - Check for an existing JWT token (`checkExistingToken`).
 * - Log out the user (`logout`).
 * - Set authentication errors (`setAuthError`).
 */
export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  isLoading: false,
  authError: null,
  isLoggingOut: false,
  isNewUser: null,

  // Actions
  handleAuthentication: async (address, chainId, signMessageAsync, isConnected) => {
    if (get().isLoading) {
      console.warn('useAuthStore: Authentication already in progress')
      return
    }
    if (get().isLoggingOut) {
      console.warn('useAuthStore: Auth attempt aborted, logout in progress.')
      return
    }
    if (!isConnected) {
      console.warn('useAuthStore: Auth attempt aborted, connector not connected.')
      return
    }
    set({ isLoading: true, authError: null, isLoggingOut: false, isNewUser: null })

    // Check for existing token in localStorage before SIWE
    const token = localStorage.getItem('accessToken')
    let proceedWithSIWE = true
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token)
        const currentTime = Math.floor(Date.now() / 1000)
        if (
          decodedToken.exp &&
          decodedToken.exp > currentTime &&
          decodedToken.address &&
          decodedToken.address.toLowerCase() === address.toLowerCase()
        ) {
          console.log('useAuthStore: Token check passed before SIWE.')
          set({ isAuthenticated: true, isLoading: false, isNewUser: false })
          proceedWithSIWE = false
        } else {
          localStorage.removeItem('accessToken')
          set({ isNewUser: null })
        }
      } catch {
        localStorage.removeItem('accessToken')
        set({ isNewUser: null })
      }
    }

    // Return early if token is valid
    if (!proceedWithSIWE) {
      if (get().isLoading) set({ isLoading: false })
      return
    }

    // Proceed with SIWE flow
    console.log(`useAuthStore: Starting SIWE for ${address}...`)
    localStorage.removeItem('accessToken')
    set({ isAuthenticated: false })

    try {
      if (get().isLoggingOut) {
        console.log('useAuthStore: Auth cancelled (logout) before getChallenge.')
        set({ isLoading: false })
        return
      }

      // Fetch challenge message and sign it
      const message = await getChallenge(address, chainId)

      if (get().isLoggingOut) {
        console.log('useAuthStore: Auth cancelled (logout) before signing.')
        set({ isLoading: false })
        return
      }

      // Sign the message
      const signature = await signMessageAsync({ message })

      if (get().isLoggingOut) {
        console.log('useAuthStore: Auth cancelled (logout) before verifySignature.')
        set({ isLoading: false })
        return
      }

      // Verify the signature and get the access token
      const { accessToken, isNewUser } = await verifySignature({ message, signature, address })
      localStorage.setItem('accessToken', accessToken)

      if (get().isLoggingOut) {
        console.log('useAuthStore: Auth cancelled (logout) before setting final token.')
        set({ isLoading: false, isNewUser: null })
        return
      }

      set({ isAuthenticated: true, isLoading: false, authError: null, isNewUser })
      console.log('useAuthStore: SIWE successful.')
    } catch (error: unknown) {
      if (!get().isLoggingOut) {
        console.error('useAuthStore: Authentication flow error:', error)
        let displayMessage = 'An unexpected error occurred during authentication.'
        let isUserRejection = false

        // Type guard for error handling
        if (error && typeof error === 'object') {
          // Check for standard EIP-1193 user rejection code
          if ('code' in error && typeof error.code === 'number' && error.code === 4001) {
            isUserRejection = true
            console.log('useAuthStore: Detected user rejection (EIP-1193 code 4001)')
          }
          // Check for common rejection messages (only if not already rejected by code)
          else if (!isUserRejection && 'message' in error && typeof error.message === 'string') {
            if (/User rejected|rejected request|cancelled|denied/i.test(error.message)) {
              isUserRejection = true
              console.log('useAuthStore: Detected user rejection (message content)')
            }
          }
        }
        if (isUserRejection) {
          displayMessage = 'Signature request cancelled.'
        } else if (error instanceof Error) {
          displayMessage = error.message || displayMessage
        } else if (typeof error === 'string') {
          displayMessage = error
        }
        set({
          isAuthenticated: false,
          authError: `Authentication failed: ${displayMessage}`,
          isNewUser: null,
        })
      } else {
        console.log('useAuthStore: Auth flow error caught, but likely due to logout cancellation.')
      }
      // Ensure token is removed on any error path if not cancelled by logout
      if (!get().isLoggingOut) {
        localStorage.removeItem('accessToken')
      }
    } finally {
      // Always ensure loading/loggingOut flags are reset if the function exits for any reason
      // Check the current state before setting to avoid unnecessary updates if logout already cleared them
      const finalState = get()
      if (finalState.isLoading || finalState.isLoggingOut) {
        set({ isLoading: false, isLoggingOut: false })
      }
    }
  },
  checkExistingToken: (currentAddress) => {
    if (get().isLoggingOut || get().isLoading) return
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ isAuthenticated: false, isLoading: false, isNewUser: null })
      return
    }
    try {
      const decodedToken = jwtDecode<JwtPayload>(token)
      const currentTime = Math.floor(Date.now() / 1000)
      const isValid =
        decodedToken.exp &&
        decodedToken.exp > currentTime &&
        decodedToken.address &&
        currentAddress &&
        decodedToken.address.toLowerCase() === currentAddress.toLowerCase()

      if (isValid) {
        console.log('useAuthStore: Existing token is valid')
        set({ isAuthenticated: true, isLoading: false, authError: null, isNewUser: false })
      } else {
        console.log('useAuthStore: Existing token is invalid')
        localStorage.removeItem('accessToken')
        set({ isAuthenticated: false, isLoading: false, authError: null, isNewUser: null })
      }
    } catch (error) {
      console.error('useAuthStore: Error decoding token:', error)
      localStorage.removeItem('accessToken')
      set({ isAuthenticated: false, isLoading: false, authError: null, isNewUser: null })
    }
  },
  logout: () => {
    set({ isLoggingOut: true, isLoading: false, isAuthenticated: false, authError: null, isNewUser: null })
    localStorage.removeItem('accessToken')
    set({ isLoggingOut: false })
  },
  resetNewUserFlag: () => {
    set({ isNewUser: false })
  },
}))

export default useAuthStore
