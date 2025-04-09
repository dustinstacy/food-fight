"use client"

import Link from "next/link"
import { HandleToggle } from "types"
import "./userMenu.scss"

/**
 * Renders a simple menu, typically associated with a user avatar.
 * Its visibility is controlled by the `isOpen` prop. Contains user-related navigation links.
 *
 * @remarks
 * - Conditionally renders its content based on the `isOpen` prop.
 * - Designed to be positioned relative to the UserSection of the NavBar.
 * - Calls the `toggleIsOpen` function (passed via props) when the link is clicked, usually to close the menu.
 *
 * @param {HandleToggle} props - Props controlling the menu's visibility and closure.
 * @param {boolean} props.isOpen - If true, the menu is rendered; otherwise, it's not. (Required)
 * @param {() => void} [props.toggleIsOpen] - Function to call to signal the menu should close (e.g., when a link is clicked). (Optional, but needed for self-closing behavior)
 *
 * @see {@link HandleToggle} type definition expected from 'types' module.
 */
const AvatarMenu = ({ isOpen, toggleIsOpen }: HandleToggle) => {
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

AvatarMenu.displayName = "AvatarMenu"
export default AvatarMenu
