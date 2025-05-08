'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useAccount, useAccountEffect, useSignMessage } from 'wagmi'

import { useAuthStore } from 'features/auth'
import { useCurrentUser, userKeys } from 'features/user'

/**
 * Headless component that manages authentication events
 *
 * @remarks
 * This component is responsible for:
 * - Handling wallet connection and disconnection events.
 * - Attempting authentication when the wallet is connected.
 * - Refetching the current user data after successful authentication.
 * - Logging out the user when the wallet is disconnected.
 * - Handling account switching by attempting re-authentication.
 *
 * @returns null - This component does not render anything to the DOM.
 */
function AuthManager() {
  /////////////////////////////////////////////////////////
  /// Variables                                         ///
  /////////////////////////////////////////////////////////

  const { address, chainId, connector, isConnected } = useAccount()
  const { refetch: refetchCurrentUser } = useCurrentUser()
  const { signMessageAsync } = useSignMessage()
  const queryClient = useQueryClient()

  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  const handleAuthentication = useAuthStore((state) => state.handleAuthentication)
  const logout = useAuthStore((state) => state.logout)

  const authenticatedAddressRef = useRef<string | null>(null)

  /////////////////////////////////////////////////////////
  /// Functions                                         ///
  /////////////////////////////////////////////////////////

  const attemptAuthentication = useCallback(
    async (prevAddress: string | null, currentAddress: string, chainId: number, origin: string) => {
      try {
        if (prevAddress) {
          queryClient.removeQueries({ queryKey: userKeys.currentUser(prevAddress) })
          authenticatedAddressRef.current = null
        }
        await handleAuthentication(currentAddress, chainId, signMessageAsync, true)
        authenticatedAddressRef.current = currentAddress
        await refetchCurrentUser()
        console.log(`[${origin}] Authentication successful for ${currentAddress}`)
      } catch (error) {
        console.error(`[${origin}] Error during handleAuthentication:`, error)
        authenticatedAddressRef.current = null
      } finally {
        if (isAttemptingAuth) {
          useAuthStore.setState({ isAttemptingAuth: false })
        }
      }
    },
    [queryClient, handleAuthentication, signMessageAsync, refetchCurrentUser, isAttemptingAuth]
  )

  /////////////////////////////////////////////////////////
  /// Effects                                           ///
  /////////////////////////////////////////////////////////

  // --- Wagmi onConnect/onDisconnect effect --- //
  useAccountEffect({
    onConnect: async (data) => {
      console.log('[onConnect] Wallet connect effect triggered.', data)
      const { address, chainId, connector } = data
      const previouslyAuthenticatedAddress = authenticatedAddressRef.current
      const canAuthenticate =
        address &&
        chainId &&
        connector &&
        !isAttemptingAuth &&
        previouslyAuthenticatedAddress?.toLowerCase() !== address.toLowerCase()

      if (canAuthenticate) {
        console.log(`[onConnect] Initiating authentication for ${address}...`)
        attemptAuthentication(previouslyAuthenticatedAddress, address, chainId, 'onConnect')
      }
    },

    onDisconnect: () => {
      console.log('[onDisconnect] Walled disconnect effect triggered.')
      const previouslyAuthenticatedAddress = authenticatedAddressRef.current

      if (previouslyAuthenticatedAddress) {
        queryClient.removeQueries({ queryKey: userKeys.currentUser(previouslyAuthenticatedAddress) })
        logout()
        authenticatedAddressRef.current = null
        console.log('[onDisconnect] Wallet disconnected. User logged out.')
      }
    },
  })

  // --- Custom onAccountSwitch effect --- //
  useEffect(() => {
    const previouslyAuthenticatedAddress = authenticatedAddressRef.current
    const canAuthenticate =
      isConnected &&
      address &&
      chainId &&
      connector &&
      !isAttemptingAuth &&
      previouslyAuthenticatedAddress &&
      previouslyAuthenticatedAddress.toLowerCase() !== address.toLowerCase()

    async function onAccountSwitch() {
      if (canAuthenticate) {
        console.log(`[onAccountSwitch]: Switching from ${previouslyAuthenticatedAddress} to ${address}`)
        attemptAuthentication(previouslyAuthenticatedAddress, address, chainId, 'onAccountSwitch')
      }
    }

    onAccountSwitch()
  }, [address, attemptAuthentication, chainId, connector, isConnected, isAttemptingAuth])

  return null
}

export default AuthManager
