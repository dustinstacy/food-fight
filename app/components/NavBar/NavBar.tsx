"use client"

import { useWallet } from "providers/WalletProvider"

import "./navBar.scss"
import { BurgerMenu, Links, UserSection } from "./subcomponents"

// Renders navigation Bar component that includes page links and user information
// Renders a login button based on the value of the `login` prop
const NavBar = () => {
    const { isConnected, connectWallet } = useWallet()

    return (
        <div className='navbar between background-gradient'>
            <BurgerMenu />
            <h3 className='navbar__logo'>Food Fight</h3>
            <Links menu='navbar' />
            {isConnected ? (
                <UserSection />
            ) : (
                <button className='navbar__connect' onClick={connectWallet}>
                    Connect
                </button>
            )}
            <hr className='primary-border' />
        </div>
    )
}

export default NavBar
