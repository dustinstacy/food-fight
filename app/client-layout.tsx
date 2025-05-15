'use client'

import { useEffect } from 'react'
import { IconContext } from 'react-icons'

import { LoadingText } from 'components'
import { useAuthStore } from 'features/auth'
import { NavBar } from 'features/navigation'
import { GlobalNotification, UsernamePrompt, useNotificationStore } from 'features/notifications'
import { useCurrentUser } from 'features/user'
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
 * - Managing global notifications and modals.
 * - Handling the loading state during authentication.
 * - Displaying a username prompt for new users.
 *
 * @param props - Component props.
 * @param props.children - The page content to render within the layout.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: currentUser } = useCurrentUser()
  const {
    openModal: openGlobalModal,
    closeModal: closeGlobalModal,
    isOpen: isGlobalModalOpen,
  } = useNotificationStore()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  const isNewUser = useAuthStore((state) => state.isNewUser)
  const authError = useAuthStore((state) => state.authError)
  const resetNewUserFlag = useAuthStore((state) => state.resetNewUserFlag)

  // Effect 1: Handle the "Attempting Auth" loading modal
  useEffect(() => {
    if (isAttemptingAuth) {
      openGlobalModal(<LoadingText text='Waiting for signature' size='large' />, {
        ariaLabel: 'Authentication Progress',
        ariaDescription: 'Waiting for wallet signature to authenticate.',
      })
    } else {
      closeGlobalModal()
    }
  }, [isAttemptingAuth, openGlobalModal, closeGlobalModal])

  // Effect 2: Handle the rendering of the username prompt modal
  useEffect(() => {
    if (isAuthenticated && isNewUser === true && currentUser?.address) {
      console.log('[ClientLayout] New user detected.')
      openGlobalModal(
        <UsernamePrompt
          currentAddress={currentUser.address}
          onSuccess={() => {
            resetNewUserFlag()
            closeGlobalModal()
          }}
        />,
        {
          ariaLabel: 'Username Setup Prompt',
          ariaDescription: 'Modal prompting for new user username setup.',
        }
      )
    }

    if ((!isAuthenticated || !currentUser?.address) && isGlobalModalOpen) {
      console.log('[ClientLayout] User logged out or user data lost.')
      closeGlobalModal()
    }
  }, [
    isAuthenticated,
    isNewUser,
    currentUser?.address,
    openGlobalModal,
    closeGlobalModal,
    isGlobalModalOpen,
    resetNewUserFlag,
  ])

  // Effect 3: Handle the rendering of authentication errors
  useEffect(() => {
    if (authError) {
      openGlobalModal(<p className='manage__error-message'>{authError}</p>, {
        ariaLabel: 'Authentication Error',
        ariaDescription: 'Error during authentication process.',
      })
    }
  }, [authError, openGlobalModal])

  return (
    <>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <GlobalNotification />
        <NavBar />
        {children}
      </IconContext.Provider>
    </>
  )
}
