"use client"

import Link from "next/link"
import { HandleToggle } from "types"
import "./userMenu.scss"

/////////////////////////////////////////////
/// Component                             ///
/////////////////////////////////////////////

/**
 * @component
 * Renders a simple menu, typically associated with a user avatar.
 * Its visibility is controlled by the `isOpen` prop. Contains user-related navigation links.
 *
 * @notice Requires `HandleToggle` type from the `types` module for prop validation.
 *
 * @remarks
 * - Designed to be positioned relative to the UserSection of the NavBar.
 * - Ideal use case includes more menu items like Settings, Logout, etc.
 * - Rendering logic:
 *   - If `isOpen` is true, the menu is displayed.
 *   - Else, nothing is rendered.
 *
 * @param {HandleToggle} props - Props controlling the menu's visibility and closure.
 * @param {boolean} props.isOpen - If true, the menu is rendered; otherwise, it's not. (Required)
 * @param {() => void} [props.toggleIsOpen] - Function to call to signal the menu should close (e.g., when a link is clicked). (Optional, but needed for self-closing behavior)
 *
 * @see {@link HandleToggle} type definition expected from 'types' module.
 */
const UserMenu = ({ isOpen, toggleIsOpen }: HandleToggle) => {
    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    return (
        <>
            {isOpen && (
                <div className='user-menu left-column black-border primary-gradient'>
                    <Link
                        className='user-menu__link'
                        href='/account'
                        onClick={() => toggleIsOpen?.()}
                    >
                        <span>Account</span>
                    </Link>
                    {/* Additional menu items like Settings, Logout, etc., would go here. A mapping would be ideal. */}
                </div>
            )}
        </>
    )
}

UserMenu.displayName = "UserMenu"
export default UserMenu
