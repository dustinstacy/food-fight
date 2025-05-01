'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useAccount, useAccountEffect, useSignMessage } from 'wagmi'

import { useCurrentUser } from 'features/user/hooks'
import { userKeys } from 'features/user/utils'
import { useAuthStore } from 'stores'

function AuthManager() {
  const { address, chainId, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const queryClient = useQueryClient()
  const { refetch: refetchCurrentUser } = useCurrentUser()

  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  const handleAuthentication = useAuthStore((state) => state.handleAuthentication)
  const logout = useAuthStore((state) => state.logout)
  const authenticatedAddressRef = useRef<string | null>(null)

  // --- Wagmi Hooks --- //
  useAccountEffect({
    onConnect: async (data) => {
      console.log('[onConnect] Wallet connect effect triggered.', data)
      const { address, chainId, connector } = data

      // Conditions: Has details, not currently attempting, and not authenticated with this address
      if (
        address &&
        chainId &&
        connector &&
        !isAttemptingAuth &&
        authenticatedAddressRef.current?.toLowerCase() !== address.toLowerCase()
      )
        console.log(`[onConnect] Initiating authentication for ${address}...`)
      try {
        await handleAuthentication(address, chainId, signMessageAsync, true)
        await refetchCurrentUser()
        console.log(`[onConnect] Authentication successful for ${address}.`)
        authenticatedAddressRef.current = address
      } catch (error) {
        console.error('[onConnect] Error during handleAuthentication:', error)
        authenticatedAddressRef.current = null
      } finally {
        if (isAttemptingAuth) {
          useAuthStore.setState({ isAttemptingAuth: false })
        }
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

  // --- Custom Hooks --- //
  useEffect(() => {
    async function reauthenticateCheck() {
      console.log('[Switching Accounts] Address change check triggered.')
      // Conditions: Connected, has details, not currently attempting, not authenticated with this address, and previously authenticated
      if (
        isConnected &&
        address &&
        chainId &&
        !isAttemptingAuth &&
        authenticatedAddressRef.current?.toLowerCase() !== address.toLowerCase() &&
        authenticatedAddressRef.current !== null
      ) {
        console.log(`[Switching Accounts]: Address changed to ${address}, initiating re-authentication...`)
        try {
          await handleAuthentication(address, chainId, signMessageAsync, true)
          await refetchCurrentUser()
          console.log(`[Switching Accounts] Authentication successful for ${address}.`)
          authenticatedAddressRef.current = address
        } catch (error) {
          console.error('[Switching Accounts] Error during handleAuthentication:', error)
          authenticatedAddressRef.current = null
        } finally {
          if (isAttemptingAuth) {
            useAuthStore.setState({ isAttemptingAuth: false })
          }
        }
      }
    }
    reauthenticateCheck()
  }, [
    address,
    chainId,
    signMessageAsync,
    isAttemptingAuth,
    handleAuthentication,
    isConnected,
    refetchCurrentUser,
    queryClient,
    logout,
  ])

  return null
}

export default AuthManager
