import { Avatar } from 'components'
import { useCurrentUser } from 'features/user/hooks'
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
        <p>{user?.username}</p>
      </div>

      {/* ----- Avatar ----- */}
      <Avatar size='small' onClick={handleClick} />

      {/* ----- User menu ----- */}
      {isOpen && <UserMenu toggleState={isOpen} toggle={toggleIsOpen} />}
    </div>
  )
}
export default UserSection
