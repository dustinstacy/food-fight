"use client"

import Image from "next/image"

import { smallLogo1 } from "assets"
import { Button } from "components"
import { useWallet } from "providers"

import { BurgerMenu, Links, UserSection } from "./subcomponents"
import "./navBar.scss"

const NavBar = () => {
    const { isConnected, connectWallet } = useWallet()

    return (
        <div className='navbar between background-gradient'>
            <BurgerMenu />
            <a href='/'>
                <Image className='navbar__logo center' src={smallLogo1} alt='Food Fight logo' />
            </a>
            <Links menu='navbar' />
            {isConnected ? <UserSection /> : <Button label='Connect' onClick={connectWallet} />}
        </div>
    )
}

export default NavBar
