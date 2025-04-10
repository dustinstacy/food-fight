"use client"

import { NavBar } from "containers"
import { useWallet } from "providers"
import { useEffect } from "react"
import { IconContext } from "react-icons"
import { useUserStore } from "stores"

/**
 * ClientLayout is a layout component that wraps the main application content.
 * It includes a navigation bar and handles user authentication state.
 *
 * @notice Requires `useWallet` for wallet connection status and `useUserStore` for user data.
 *
 * @remarks
 * - The `NavBar` component is rendered at the top of the layout.
 * - The `useWallet` hook provides the current wallet accounts.
 * - The `useUserStore` hook is used to check for the user based on the wallet address.
 * - The `IconContext` is used to provide a className for all icons within this layout.
 * - The layout is designed to be used in a client-side context (hence the "use client" directive).
 *
 * @param param0 - The children prop is the content to be rendered inside the layout.
 *
 * @see {@link NavBar} - Component for the navigation bar.
 * @see {@link useWallet} - Hook for wallet connection status and accounts.
 * @see {@link useUserStore} - Hook for user data and authentication.
 * @see {@link IconContext} - Context for providing icon properties.
 *
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    ////////////////////////////////////////////////
    /// Hooks                                    ///
    ////////////////////////////////////////////////

    const { accounts } = useWallet()
    const checkForUser = useUserStore((state) => state.checkForUser)

    ////////////////////////////////////////////////
    /// Effects                                  ///
    ////////////////////////////////////////////////

    useEffect(() => {
        checkForUser(accounts[0])
    }, [accounts, checkForUser])

    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    return (
        <div>
            <IconContext.Provider value={{ className: "react-icons" }}>
                <NavBar />
                {children}
            </IconContext.Provider>
        </div>
    )
}
