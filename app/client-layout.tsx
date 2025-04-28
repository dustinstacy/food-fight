'use client'

import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { useAccount, useSignMessage } from 'wagmi'

import { NavBar } from 'features/navigation'
import { UsernamePromptModal } from 'features/user/components'
import { useCurrentUser } from 'features/user/hooks'
import { useAuthStore } from 'stores'
import { formatAddress } from 'utils'
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
 * - Managing the display of the username prompt modal.
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
    isNewUser,
    resetNewUserFlag,
    isLoggingOut,
  } = useAuthStore()

  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false)
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser()

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
      const shouldAttemptAuth = !isAuthenticated && !isAuthLoading && !isLoggingOut
      if (shouldAttemptAuth) {
        console.log('ClientLayout Effect 2: Condition met, triggering authentication flow...')
        handleAuthentication(address, chainId, signMessageAsync, isConnected)
      }
    }
  }, [
    // Dependencies that should trigger this effect logic
    isConnected,
    isDisconnected,
    isLoggingOut,
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

  useEffect(() => {
    if (isNewUser === true && !isUsernameModalOpen && isAuthenticated /*&& !isUserLoading*/) {
      console.log('ClientLayout: New user detected, opening username prompt.')
      setIsUsernameModalOpen(true)
    } else if (isNewUser !== true && isUsernameModalOpen) {
      console.log('ClientLayout: isNewUser flag changed or user logged out, closing modal.')
      setIsUsernameModalOpen(false)
    }
  }, [isNewUser, isUsernameModalOpen, isAuthenticated, isUserLoading])

  const handleCloseUsernameModal = () => {
    setIsUsernameModalOpen(false)
    if (useAuthStore.getState().isNewUser === true) {
      resetNewUserFlag()
    }
  }

  const formattedDefaultUsername = formatAddress(currentUser?.address)
  const currentAddressValue = currentUser?.address ?? ''

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
        <UsernamePromptModal
          isOpen={isUsernameModalOpen}
          onClose={handleCloseUsernameModal}
          defaultUsername={formattedDefaultUsername}
          currentAddress={currentAddressValue}
        />
      </IconContext.Provider>
    </>
  )
}
