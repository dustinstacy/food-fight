"use client"

import Link from "next/link"
import { HandleToggle } from "types"

import "./avatarMenu.scss"

// Renders the menu that is displayed when the user clicks on their navigation bar image.
const AvatarMenu = ({ isOpen, toggleIsOpen }: HandleToggle) => {
    return (
        <>
            {isOpen && (
                <div className='avatar-menu box left-column background-gradient'>
                    <Link href='/account' onClick={() => toggleIsOpen?.()}>
                        Account
                    </Link>
                </div>
            )}
        </>
    )
}

export default AvatarMenu
