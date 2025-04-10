import type { Metadata } from "next"
import ClientLayout from "./client-layout"
import "styles/breakpoints.scss"
import "styles/containers.scss"
import "styles/globals.scss"
import "styles/modules.scss"
import "styles/theme.scss"
import { WalletProvider } from "providers/WalletProvider"

///////////////////////////////////////////////
/// Metadata                                ///
///////////////////////////////////////////////

export const metadata: Metadata = {
    title: "Food Fight",
    icons: {
        icon: [{ url: "/icon.ico" }],
    },
    description: "A Web3 collectible card game",
}

///////////////////////////////////////////////
/// Root Layout                            ///
///////////////////////////////////////////////

/**
 * RootLayout is the main layout component for the application.
 * It wraps the entire application in a global context provider and sets up the HTML structure.
 *
 * @notice Requires `WalletProvider` for managing wallet connections.
 *
 * @see {@link WalletProvider} - Context provider for managing wallet connections.
 *
 * @param param0 - The children prop is the content to be rendered inside the layout.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <WalletProvider>
                    <ClientLayout>{children}</ClientLayout>
                </WalletProvider>
            </body>
        </html>
    )
}
