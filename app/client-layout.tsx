'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
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
  const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUser()
  const { signMessageAsync } = useSignMessage()
  const queryClient = useQueryClient()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isSwitchingAccounts = useAuthStore((state) => state.isSwitchingAccounts)
  const isNewUser = useAuthStore((state) => state.isNewUser)
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut)
  const authError = useAuthStore((state) => state.authError)
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  const logout = useAuthStore((state) => state.logout)
  const handleAuthentication = useAuthStore((state) => state.handleAuthentication)
  const resetNewUserFlag = useAuthStore((state) => state.resetNewUserFlag)

  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false)
  const authenticatedAddressRef = useRef<string | null>(null)

  // Effect 1: Handle authentication and logout based on wallet connection status
  useEffect(() => {
    // Conditions: Connected, has details, not logging out, not already authenticated, and not already trying to authenticate.
    if (
      isConnected &&
      address &&
      chainId &&
      !isLoggingOut &&
      !isAuthenticated &&
      !isAttemptingAuth &&
      !isSwitchingAccounts
    ) {
      console.log(`[ClientLayout] Effect 1: Initiating authentication for ${address}...`)
      handleAuthentication(address, chainId, signMessageAsync, true)
      authenticatedAddressRef.current = address
    }

    // Conditions: Disconnected, not logging out, and authenticated.
    if (isDisconnected && !isLoggingOut && isAuthenticated) {
      console.log(`[ClientLayout] Effect 1: Wallet disconnected, logging out...`)
      queryClient.removeQueries({ queryKey: ['currentUser', authenticatedAddressRef] })
      logout()
      authenticatedAddressRef.current = null
    }
  }, [
    address,
    chainId,
    isConnected,
    isAuthenticated,
    isAttemptingAuth,
    isDisconnected,
    isLoggingOut,
    handleAuthentication,
    logout,
    queryClient,
    signMessageAsync,
    isSwitchingAccounts,
  ])

  // Effect 2: Handle account switch reauthentication
  useEffect(() => {
    async function reauthenticateCheck() {
      if (
        isConnected &&
        address &&
        chainId &&
        address !== authenticatedAddressRef.current &&
        authenticatedAddressRef.current !== null
      ) {
        useAuthStore.setState({ isSwitchingAccounts: true })
        console.log(`[ClientLayout] Effect 2: Address changed to ${address}, refetching current user...`)
        await handleAuthentication(address, chainId, signMessageAsync, true)
        authenticatedAddressRef.current = address
        await refetchCurrentUser()
        useAuthStore.setState({ isSwitchingAccounts: false })
      }
    }

    reauthenticateCheck()
  }, [address, chainId, isConnected, handleAuthentication, signMessageAsync, refetchCurrentUser])

  // Effect 3: Clear the current user data when switching accounts
  useEffect(() => {
    if (isSwitchingAccounts) {
      console.log('[ClientLayout] Effect 3: Clearing current user data due to account switch.')
      queryClient.setQueryData(['currentUser', authenticatedAddressRef], null)
    }
  }, [isSwitchingAccounts, queryClient])

  // Effect 4: Control the display of the username prompt modal
  useEffect(() => {
    // Conditions: User is authenticated, is a new user, and modal is not open
    if (isAuthenticated && isNewUser === true && !isUsernameModalOpen) {
      console.log('[ClientLayout] Effect 4: New user detected, opening username prompt.')
      setIsUsernameModalOpen(true)
      // Conditions: User is not a new user or logging out, and modal is open
    } else if (isNewUser !== true && isUsernameModalOpen) {
      console.log('[ClientLayout] Effect 4: isNewUser flag changed or user logged out, closing modal.')
      setIsUsernameModalOpen(false)
    }
  }, [isAuthenticated, isNewUser, isUsernameModalOpen])

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
      {isAttemptingAuth && <p className='center auth-text'>Authenticating...</p>}

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
