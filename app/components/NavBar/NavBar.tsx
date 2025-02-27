"use client"

import { Button } from "components"
import { useWallet } from "providers"

import { BurgerMenu, Links, UserSection } from "./subcomponents"
import "./navBar.scss"

// Renders navigation Bar component that includes page links and user information
// Renders a login button based on the value of the `login` prop
const NavBar = () => {
    const { isConnected, connectWallet } = useWallet()

    return (
        <div className='navbar between background-gradient'>
            <BurgerMenu />
            <h3 className='navbar__logo center'>Food Fight</h3>
            <Links menu='navbar' />
            {isConnected ? <UserSection /> : <Button label='Connect' onClick={connectWallet} />}
        </div>
    )
}

export default NavBar
