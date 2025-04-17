'use client'

import { useEffect } from 'react'
import { IconContext } from 'react-icons'
import { useAccount, useSignMessage } from 'wagmi'

import { NavBar } from 'features/navigation'
import { useAuthStore } from 'stores'

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

  // Check token on initial load
  useEffect(() => {
    if (isConnected && address && chainId) {
      console.log('ClientLayout: Checking existing token...')
      checkExistingToken(address)
    }
  }, [isConnected, address, chainId, checkExistingToken])

  // Effect 2: Trigger authentication (if needed) or logout
  useEffect(() => {
    if (isDisconnected) {
      const { isAuthenticated: currentAuthStatus } = useAuthStore.getState()
      if (currentAuthStatus) {
        console.log('ClientLayout Effect 2: Wallet disconnected, logging out...')
        logoutFromAuthStore()
      }
      return
    }

    if (isConnected && address && chainId) {
      const { isAuthenticated: currentAuthStatus, isLoading: currentLoadingStatus } = useAuthStore.getState()

      if (!currentAuthStatus && !currentLoadingStatus) {
        console.log('ClientLayout Effect 2: Triggering authentication flow...')
        handleAuthentication(address, chainId, signMessageAsync)
      }
    }
  }, [
    // Dependencies that should trigger this effect logic
    isConnected,
    isDisconnected,
    address,
    chainId,
    // Include functions called within the effect (React ESLint rule)
    handleAuthentication,
    signMessageAsync,
    logoutFromAuthStore,
    // Note: We don't strictly need isAuthenticated/isAuthLoading in deps if using getState(),
    isAuthenticated,
    isAuthLoading,
  ])

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
