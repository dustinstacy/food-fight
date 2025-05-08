'use client'

import { useEffect } from 'react'
import { IconContext } from 'react-icons'

import { LoadingText } from 'components'
import { useAuthStore } from 'features/auth'
import { NavBar } from 'features/navigation'
import { CustomModal, UsernamePrompt } from 'features/notifications'
import { useCurrentUser } from 'features/user'
import { useToggle } from 'hooks'
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
  const { data: currentUser } = useCurrentUser()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  const isNewUser = useAuthStore((state) => state.isNewUser)
  const authError = useAuthStore((state) => state.authError)
  const resetNewUserFlag = useAuthStore((state) => state.resetNewUserFlag)

  const [isPromptOpen, , setIsPromptOpen] = useToggle(false)

  // Effect 1: Handle the rendering of the username prompt modal
  useEffect(() => {
    if (isAuthenticated && isNewUser === true && currentUser?.address && !isPromptOpen) {
      console.log('[ClientLayout] New user detected, opening username prompt.')
      setIsPromptOpen(true)
    }

    if ((!isAuthenticated || !currentUser?.address) && isPromptOpen) {
      console.log('[ClientLayout] User logged out or user data lost, closing modal.')
      setIsPromptOpen(false)
    }
  }, [isAuthenticated, isNewUser, currentUser?.address, isPromptOpen, setIsPromptOpen])

  const handlePromptSuccess = () => {
    resetNewUserFlag()
    setIsPromptOpen(false)
  }

  const handleModalClose = () => {
    console.log('[ClientLayout] Modal closed.')
    setIsPromptOpen(false)
  }

  const currentAddressValue = currentUser?.address ?? ''

  return (
    <>
      {/*!! Display auth error? */}
      {authError && (
        <p className='center auth-text error-text' style={{ color: 'red' }}>
          {authError}
        </p>
      )}

      <IconContext.Provider value={{ className: 'react-icons' }}>
        <NavBar />
        {children}

        {/*--- Attempting Auth Modal --- */}
        {isAttemptingAuth && (
          <CustomModal
            isOpen={isAttemptingAuth}
            onClose={handleModalClose}
            ariaLabel='username-prompt-modal'
            ariaDescription='Modal prompting for username setup'
          >
            <LoadingText text='Waiting for signature' size='large' />
          </CustomModal>
        )}

        {/*--- Username Prompt Modal ---*/}
        {currentAddressValue && (
          <CustomModal
            isOpen={isPromptOpen}
            onClose={handleModalClose}
            ariaLabel='username-prompt-modal'
            ariaDescription='Modal prompting for username setup'
          >
            <UsernamePrompt currentAddress={currentAddressValue} onSuccess={handlePromptSuccess} />
          </CustomModal>
        )}
      </IconContext.Provider>
    </>
  )
}
