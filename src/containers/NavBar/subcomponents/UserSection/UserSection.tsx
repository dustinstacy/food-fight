import { Avatar } from "components"
import { useToggle } from "hooks"
import { useUserStore } from "stores"
import { UserMenu } from "./subcomponents"
import "./userSection.scss"

/////////////////////////////////////////////////////
/// Component                                     ///
/////////////////////////////////////////////////////

/**
 * @component
 * Renders a user section in the navigation bar, displaying the user's avatar and username.
 * Clicking the avatar toggles a user menu.
 *
 * @notice Requires `Avatar` for displaying the user's image, `useUserStore` for accessing user data,
 * useToggle for managing the menu state, and `UserMenu` for rendering the menu.
 *
 * @remarks
 * - The `Avatar` component is clickable and triggers the menu toggle.
 * - Rendering logic:
 *   - Displays the user's username.
 *   - Displays the user's avatar.
 *   - If the avatar is clicked, the `UserMenu` component is displayed.
 *   - If it is clicked again, the menu is hidden.
 *   - Divide will not display on screens < 768px in width.
 *
 * @see {@link Avatar} - Component for displaying user avatars.
 * @see {@link useToggle} - Custom hook for managing toggle state.
 * @see {@link useUserStore} - Hook for accessing user data.
 * @see {@link UserMenu} - Component for rendering the user menu.
 *
 */
const UserSection = () => {
    //////////////////////////////////////////////////
    /// Hooks                                      ///
    //////////////////////////////////////////////////

    const user = useUserStore((state) => state.user)
    const [isOpen, toggleIsOpen] = useToggle(false)

    //////////////////////////////////////////////////
    /// Handlers                                   ///
    //////////////////////////////////////////////////

    const handleClick = () => {
        toggleIsOpen()
    }

    //////////////////////////////////////////////////
    /// Render                                     ///
    //////////////////////////////////////////////////

    return (
        <div className='user-section right'>
            <hr />
            <div className='user-section__name center-column'>
                <p>{user?.username}</p>
            </div>
            <Avatar size='small' onClick={handleClick} />
            {isOpen && <UserMenu isOpen toggleIsOpen={toggleIsOpen} />}
        </div>
    )
}
export default UserSection
