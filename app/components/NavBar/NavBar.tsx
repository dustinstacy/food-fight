"use client"

import "./navBar.scss"
import { Links, UserSection } from "./subcomponents"

// Renders navigation Bar component that includes page links and user information
// Renders a login button based on the value of the `login` prop
const NavBar = () => {
    return (
        <div className='navbar between background-gradient'>
            <Links menu='navbar' />
            <UserSection />
            <hr className='gold-border' />
        </div>
    )
}

export default NavBar
