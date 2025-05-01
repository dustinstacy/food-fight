'use client'

import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'

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
  const { data: currentUser } = useCurrentUser()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  const isNewUser = useAuthStore((state) => state.isNewUser)
  const authError = useAuthStore((state) => state.authError)
  const resetNewUserFlag = useAuthStore((state) => state.resetNewUserFlag)

  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false)

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
