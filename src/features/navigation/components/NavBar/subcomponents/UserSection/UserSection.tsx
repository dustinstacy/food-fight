import { Avatar } from 'components'
import { useToggle } from 'hooks'
import { useUserStore } from 'stores'

import { UserMenu } from './subcomponents'
import './userSection.scss'

/**
 * Renders the user section of the navigation bar that displays the user's avatar and name.
 * It also provides a dropdown menu for user-related actions.
 *
 * @remarks
 * - The `useToggle` hook is used to manage the open/close state of the menu.
 * - The `UserMenu` component is displayed when the menu is open.
 * - The component uses the `useUserStore` hook to access the user's information.
 * - The `Avatar` component is used to display the user's avatar.
 *
 * @see {@link useToggle} for more details on the toggle functionality.
 * @see {@link UserMenu} for more details on the menu functionality.
 * @see {@link useUserStore} for more details on the user store functionality.
 * @see {@link Avatar} for more details on the avatar functionality.
 *
 * @returns The UserSection component JSX element (a `<div>` containing the user's avatar,
 * username, and menu).
 */
const UserSection = () => {
  const user = useUserStore((state) => state.user)
  const [isOpen, toggleIsOpen] = useToggle(false)

  const handleClick = () => {
    toggleIsOpen()
  }

  return (
    <div className='user-section right'>
      <hr />
      <div className='user-section__name center-column text-shadow tilt-warp'>
        <p>{user?.username}</p>
      </div>
      <Avatar size='small' onClick={handleClick} />
      {isOpen && <UserMenu isOpen toggleIsOpen={toggleIsOpen} />}
    </div>
  )
}
export default UserSection
