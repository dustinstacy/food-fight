"use client"

import Image from "next/image"
import { smallLogo1 } from "assets"
import { Button } from "components"
import { useWallet } from "providers"
import { BurgerMenu, Links, UserSection } from "./subcomponents"
import "./navBar.scss"

///////////////////////////////////////////
/// Layout Component                    ///
///////////////////////////////////////////

/**
 * Renders the main application navigation bar.
 * Includes the logo, navigation links, a burger menu,
 * and conditionally displays either a user section or a connect wallet button.
 *
 * @remarks
 * - Fetches wallet connection status (`isConnected`) and `connectWallet` function from `useWallet`.
 * - Rendering Logic:
 *   - If the wallet is connected, it displays the `UserSection` component.
 *   - If the wallet is not connected, it displays a "Connect" button.
 *   - The BurgerMenu will display on screens < 922px in width.
 *   - The Logo will not be displayed on screens < 576px in width.
 *
 * @see {@link BurgerMenu} - Component for menu navigation toggle.
 * @see {@link Links} - Component displaying navigation links.
 * @see {@link UserSection} - Component displaying user info/actions when connected.
 * @see {@link Button} - Reusable button component used for "Connect".
 * @see {@link useWallet} - Hook/Context providing wallet status and actions.
 */
const NavBar = () => {
    ////////////////////////////////////////////////
    /// Hooks                                    ///
    ////////////////////////////////////////////////

    const { isConnected, connectWallet } = useWallet()

    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    return (
        <div className='navbar between secondary-gradient'>
            <BurgerMenu />
            {/* --- Logo linking to the home page --- */}
            <a href='/'>
                <Image
                    className='navbar__logo abs-center'
                    src={smallLogo1}
                    alt='Food Fight logo'
                    priority={true}
                />
            </a>
            <Links menu='navbar' />
            {/* --- Conditional rendering based on wallet connection status --- */}
            {isConnected ? (
                // Render user-specific section if wallet is connected
                <UserSection />
            ) : (
                // Render connect button if wallet is not connected
                <Button label='Connect' onClick={connectWallet} />
            )}
        </div>
    )
}

NavBar.displayName = "NavBar"
export default NavBar
