"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdLogout } from "react-icons/md"

import { useUserStore } from "stores"
import { HandleToggle } from "types"

import "./avatarMenu.scss"
import { useWallet } from "providers"

// Renders the menu that is displayed when the user clicks on their navigation bar image.
const AvatarMenu = ({ isOpen, toggleIsOpen }: HandleToggle) => {
    return (
        <>
            {isOpen && (
                <div className='avatar-menu box left-column'>
                    <Link href='/account' onClick={() => toggleIsOpen?.()}>
                        Account
                    </Link>
                </div>
            )}
        </>
    )
}

export default AvatarMenu
