import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { getChallenge, verifySignature } from 'api'
import { AuthActions, AuthState, JwtPayload } from 'types'

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

  // Actions
  handleAuthentication: async (address, chainId, signMessageAsync) => {
    if (get().isLoading) {
      console.log('useAuthStore: Authentication already in progress')
      return
    }
    set({ isLoading: true, authError: null })

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
          set({ isAuthenticated: true, isLoading: false })
          proceedWithSIWE = false
        } else {
          localStorage.removeItem('accessToken')
        }
      } catch {
        localStorage.removeItem('accessToken')
      }
    }

    // Return early if token is valid
    if (!proceedWithSIWE) return

    // Proceed with SIWE flow
    console.log(`useAuthStore: Starting SIWE for ${address}...`)
    localStorage.removeItem('accessToken')
    set({ isAuthenticated: false })

    try {
      // Fetch challenge message and sign it
      const message = await getChallenge(address, chainId)
      const signature = await signMessageAsync({ message })
      const { accessToken } = await verifySignature({ message, signature, address })

      localStorage.setItem('accessToken', accessToken)
      set({ isAuthenticated: true, isLoading: false, authError: null })
      console.log('useAuthStore: SIWE successful.')
    } catch (error: any) {
      console.error('useAuthStore: Authentication flow error:', error)
      let displayMessage = 'An unexpected error occurred during authentication.'
      let isUserRejection = false
      if (error && typeof error === 'object') {
        if ('code' in error && error.code === 4001) {
          isUserRejection = true
          console.log('useAuthStore: Detected user rejection (EIP-1193 code 4001)')
        } else if (
          'message' in error &&
          typeof error.message === 'string' &&
          /User rejected|rejected request|cancelled|denied/i.test(error.message)
        ) {
          isUserRejection = true
          console.log('useAuthStore: Detected user rejection (message content)')
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
        isLoading: false,
        authError: `Authentication failed: ${displayMessage}`,
      })
      localStorage.removeItem('accessToken')
    }
  },
  checkExistingToken: (currentAddress) => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ isAuthenticated: false, isLoading: false })
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
        set({ isAuthenticated: true, isLoading: false, authError: null })
      } else {
        console.log('useAuthStore: Existing token is invalid')
        localStorage.removeItem('accessToken')
        set({ isAuthenticated: false, isLoading: false, authError: null })
      }
    } catch (error) {
      console.error('useAuthStore: Error decoding token:', error)
      localStorage.removeItem('accessToken')
      set({ isAuthenticated: false, isLoading: false, authError: null })
    }
  },
  logout: () => {
    localStorage.removeItem('accessToken')
    set({ isAuthenticated: false, isLoading: false, authError: null })
  },
}))

export default useAuthStore
