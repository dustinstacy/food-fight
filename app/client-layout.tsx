'use client'

import { useEffect, useState, useCallback } from 'react'
import { IconContext } from 'react-icons'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'

import { NavBar } from 'features/navigation'
import { useAuthStore, useUserStore } from 'stores'

import './client-layout.scss'

/**
 * Client-side layout component that coordinates wallet connection status
 * with Zustand authentication and user stores.
 *
 * @remarks
 * This layout component is responsible for:
 * - Managing the authentication flow using Sign-In with Ethereum (SIWE) and JWT tokens.
 * - Handling user session state and profile data.
 * - Displaying authentication errors.
 * - Rendering the navigation bar and page content.
 *
 * @param props - Component props.
 * @param props.children - The page content to render within the layout.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { address, chainId, isConnected, isDisconnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    authError,
    handleAuthentication,
    logout: logoutFromAuthStore,
    checkExistingToken,
  } = useAuthStore()
  const { user, checkForUser, setUser } = useUserStore()

  // Check token on initial load
  useEffect(() => {
    if (isConnected && address && chainId) {
      console.log('ClientLayout: Checking existing token...')
      checkExistingToken(address)

      const { isAuthenticated: currentAuthStatus, isLoading: currentLoadingStatus } = useAuthStore.getState()

      if (!currentAuthStatus && !currentLoadingStatus) {
        console.log('ClientLayout: No existing token, authenticating user...')
        setUser(null)
        handleAuthentication(address, chainId, signMessageAsync)
      } else if (currentAuthStatus && user && user.address.toLowerCase() !== address.toLowerCase()) {
        console.log('ClientLayout: Address changed, fetching new user data...')
        setUser(null)
      }
    }
  }, [isConnected, address, checkExistingToken])

  // Trigger authentication of logout based on connection status & auth state
  useEffect(() => {
    if (isConnected && address && chainId) {
      if (!isAuthenticated && !isAuthLoading) {
        console.log('ClientLayout: Authenticating user...')
        handleAuthentication(address, chainId, signMessageAsync)
      }
    } else if (isDisconnected) {
      console.log('ClientLayout: Wallet disconnected, logging out...')
      if (useAuthStore.getState().isAuthenticated) {
        logoutFromAuthStore()
        setUser(null)
      }
    }
  }, [
    isConnected,
    isDisconnected,
    address,
    chainId,
    isAuthenticated,
    isAuthLoading,
    handleAuthentication,
    signMessageAsync,
    logoutFromAuthStore,
    setUser,
  ])

  // Fetch user data if authenticated and address has changed
  useEffect(() => {
    const needsUserFetch = isAuthenticated && address && (!user || user.address.toLowerCase() !== address.toLowerCase())

    if (needsUserFetch) {
      console.log('ClientLayout: Fetching user data...')
      checkForUser().catch((fetchError) => {
        console.error('ClientLayout: Error fetching user data:', fetchError)
      })
    }
  }, [isAuthenticated, address, user, checkForUser])

  return (
    <>
      {/*!! Display auth error? */}
      {authError && (
        <p className='center auth-text error-text' style={{ color: 'red' }}>
          {authError}
        </p>
      )}
      {/*!! Display Loading Modal? */}
      {isAuthLoading && <p className='center auth-text'>Authenticating...</p>}

      <IconContext.Provider value={{ className: 'react-icons' }}>
        <NavBar />
        {children}
      </IconContext.Provider>
    </>
  )
}
