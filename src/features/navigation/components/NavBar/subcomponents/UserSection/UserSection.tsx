import { Avatar } from 'components'
import { useAuthStore } from 'features/auth'
import { IGCBalanceDisplay } from 'features/igc'
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

  const [isOpen, toggleIsOpen] = useToggle(false)

  const handleClick = () => {
    toggleIsOpen()
  }

  return (
    <div className='user-section right'>
      {/* ----- Divider ----- */}
      <hr />

      {/* ----- Username ----- */}
      <div className='user-section__name text-shadow tilt-warp'>
        {user && !isAttemptingAuth ? (
          <div className='user-section__info right-column'>
            <span>{user.username}</span>
            <IGCBalanceDisplay />
          </div>
        ) : (
          <> </>
        )}
      </div>

      {/* ----- Avatar ----- */}
      <Avatar size='small' onClick={handleClick} />

      {/* ----- User menu ----- */}
      {isOpen && <UserMenu toggleState={isOpen} toggle={toggleIsOpen} />}
    </div>
  )
}
export default UserSection
