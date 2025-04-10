"use client"

import Image from "next/image"
import { largeLogo5 } from "assets"
import { Button } from "components"
import { navLinks } from "data"
import { useUserStore } from "stores"
import "./home.scss"

///////////////////////////////////////
// Home Page Component              ///
///////////////////////////////////////

/**
 * This page is responsible for rendering the home page of the application.
 * It displays the logo and a set of buttons based on the user's authentication status.
 *
 * @notice Requires `navLinks` for button navigation, `useUserStore` for user authentication status,
 * `Button` component for rendering buttons, and `largeLogo5` for the logo image.
 *
 * @remarks
 * - Rendering Logic:
 *   - If the user is authenticated, it displays buttons for navigation.
 *   - If the user is not authenticated, it does not display any buttons.
 *
 * @see {@link navLinks} for the list of navigation links.
 * @see {@link useUserStore} for user authentication status.
 * @see {@link Button} for button component.
 */
export default function Home() {
    ////////////////////////////////////////////
    /// Hooks                                ///
    ////////////////////////////////////////////

    const { user } = useUserStore()

    ////////////////////////////////////////////
    /// Render                               ///
    ////////////////////////////////////////////

    return (
        <div className='home page bottom background-gradient'>
            <Image className='home__logo abs-top-center' src={largeLogo5} alt='Food Fight logo' />
            {user ? (
                <div className='home__buttons bottom-column'>
                    {navLinks.map(
                        (link) =>
                            link.name !== "Home" && (
                                <Button key={link.name} label={link.name} path={link.path} />
                            )
                    )}
                </div>
            ) : (
                <> </>
            )}
        </div>
    )
}
