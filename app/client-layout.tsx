'use client'

import { jwtDecode } from 'jwt-decode'
import { useEffect, useState, useCallback } from 'react'
import { IconContext } from 'react-icons'
import { useAccount, useSignMessage } from 'wagmi'

import { getChallenge, verifySignature } from 'api'
import { NavBar } from 'features/navigation'
import { useUserStore } from 'stores'
import { JwtPayload } from 'types'
import './client-layout.scss'

/**
 * Client-side layout component that orchestrates wallet connection,
 * Sign-In with Ethereum (SIWE) authentication, and user session state management.
 * It renders the persistent `NavBar`and the main page content.
 *
 * @remarks
 * - This component handles the authentication flow using Sign-In with Ethereum (SIWE) and JWT tokens.
 * - It checks for an existing JWT token in session storage and validates it.
 * - If the token is invalid or absent, it initiates the SIWE flow.
 * - It also manages the user state using Zustand's `useUserStore`.
 * - The `IconContext` from `react-icons` is used to provide a global class name for icons.
 *
 * @param props - Component props.
 * @param props.children - The page content to render within the layout.
 * @returns The ClientLayout component JSX.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { address, chainId, isConnected, isDisconnected } = useAccount()
  const { user, checkForUser, setUser } = useUserStore()
  const { signMessageAsync } = useSignMessage()

  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Define the authentication flow logic (SIWE or token validation)
  const handleAuthentication = useCallback(async () => {
    if (!isConnected || !address || !chainId) return

    let proceedWithSIWE = true
    const existingToken = localStorage.getItem('accessToken')

    if (existingToken) {
      console.log('ClientLayout: Found existing token.')
      try {
        const decodedToken = jwtDecode<JwtPayload>(existingToken)
        const currentTime = Date.now() / 1000

        // Validate token: expiry and address match
        if (
          decodedToken.exp &&
          decodedToken.exp > currentTime &&
          decodedToken.address &&
          decodedToken.address.toLowerCase() === address.toLowerCase()
        ) {
          console.log('ClientLayout: Existing token validated client-side.')
          proceedWithSIWE = false
          setIsAuthenticated(true)
        } else {
          console.log('ClientLayout: Existing token invalid/expired/mismatched.')
          localStorage.removeItem('accessToken')
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (decodeError) {
        console.error('ClientLayout: Error decoding existing token:', decodeError)
        localStorage.removeItem('accessToken')
        setUser(null)
        setIsAuthenticated(false)
        proceedWithSIWE = true
      }
    } else {
      console.log('ClientLayout: No existing token found.')
      proceedWithSIWE = true
    }

    // Start SIWE flow if no valid token is found
    // or if the token is expired or mismatched
    if (proceedWithSIWE) {
      console.log(`ClientLayout: Starting SIWE for ${address}...`)
      setAuthError(null)
      setUser(null)
      localStorage.removeItem('accessToken')

      try {
        const message = await getChallenge(address, chainId)
        const signature = await signMessageAsync({ message })
        const { accessToken } = await verifySignature({ message, signature, address })
        localStorage.setItem('accessToken', accessToken)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('ClientLayout: Authentication flow error:', error)
        let displayMessage = 'An unexpected error occurred during authentication.'

        let isUserRejection = false
        if (error && typeof error === 'object') {
          if ('code' in error && error.code === 4001) {
            isUserRejection = true
          } else if (
            'message' in error &&
            typeof error.message === 'string' &&
            /User rejected|rejected request|cancelled/i.test(error.message)
          ) {
            isUserRejection = true
          }
        }

        if (isUserRejection) {
          displayMessage = 'Signature request cancelled.'
        } else if (error instanceof Error) {
          displayMessage = error.message || displayMessage
        } else if (typeof error === 'string') {
          displayMessage = error
        }
        setAuthError(`Authentication failed: ${displayMessage}`)
        localStorage.removeItem('accessToken')
        setUser(null)
        setIsAuthenticated(false)
      }
    }
  }, [isConnected, address, chainId, setUser, signMessageAsync])

  // Manage authentication state and user session
  useEffect(() => {
    if (isConnected && address) {
      if (!isAuthenticated) {
        handleAuthentication()
      }
    } else if (isDisconnected) {
      console.log('ClientLayout: Wallet disconnected, clearing session.')
      localStorage.removeItem('accessToken')
      setUser(null)
      setAuthError(null)
      setIsAuthenticated(false)
    }
  }, [isConnected, isDisconnected, address, handleAuthentication, setUser, isAuthenticated])

  // Fetch user data if authenticated and address matches
  useEffect(() => {
    const needsUserFetch = isAuthenticated && address && (!user || user.address.toLowerCase() !== address.toLowerCase())

    if (needsUserFetch) {
      checkForUser().catch((fetchError) => {
        console.error('ClientLayout: Error fetching user data after auth:', fetchError)
        setAuthError(`Failed to load profile: ${fetchError.message || 'Please try again.'}`)
      })
    }
  }, [isAuthenticated, address, user, checkForUser])

  return (
    <>
      {/* Display auth error if it occurred */}
      {authError && (
        <p className='center auth-text error-text' style={{ color: 'red' }}>
          {authError}
        </p>
      )}
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <NavBar />
        {children}
      </IconContext.Provider>
    </>
  )
}
