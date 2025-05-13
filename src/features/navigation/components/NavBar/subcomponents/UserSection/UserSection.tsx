import { Avatar } from 'components'
import { useAuthStore } from 'features/auth'
import { IGCBalanceDisplay, MintIGCPrompt } from 'features/igc'
import { CustomModal } from 'features/notifications'
import { useCurrentUser } from 'features/user'
import { useToggle } from 'hooks'

import { UserMenu } from './subcomponents'
import './userSection.scss'

/**
 * Renders the user section of the navigation bar.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying the user's avatar.
 * - Showing the user's username.
 * - Toggling the visibility of the user menu when the avatar is clicked.
 */
const UserSection = () => {
  const { data: user } = useCurrentUser()
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)

  const [isUserMenuOpen, toggleUserMenu] = useToggle(false)
  const [isMintModalOpen, toggleMintModal] = useToggle(false)

  return (
    <div className='user-section right'>
      {/* ----- Divider ----- */}
      <hr />

      {/* ----- Username ----- */}
      <div className='user-section__name text-shadow tilt-warp'>
        {user && !isAttemptingAuth ? (
          <div className='user-section__info right-column'>
            <span>{user.username}</span>
            <IGCBalanceDisplay onClick={toggleMintModal} />
          </div>
        ) : (
          <> </>
        )}
      </div>

      {/* ----- Avatar ----- */}
      <Avatar size='small' onClick={toggleUserMenu} />

      {/* ----- User menu ----- */}
      {isUserMenuOpen && <UserMenu toggleState={isUserMenuOpen} toggle={toggleUserMenu} />}

      {/* ----- Mint IGC Modal ----- */}
      {isMintModalOpen && (
        <CustomModal isOpen={isMintModalOpen} onClose={toggleMintModal} ariaLabel='Mint IGC' ariaDescription='Mint IGC'>
          <MintIGCPrompt />
        </CustomModal>
      )}
    </div>
  )
}
export default UserSection
