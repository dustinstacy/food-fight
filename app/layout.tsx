import type { Metadata } from "next"

import ClientLayout from "./client-layout"
import "styles/globals.scss"
import "styles/containers.scss"
import "styles/modules.scss"
import "styles/theme.scss"
import { WalletProvider } from "providers/WalletProvider"

export const metadata: Metadata = {
    title: "Food Fight",
    icons: {
        icon: [{ url: "/icon.ico" }],
    },
    description: "A Web3 collectible card game",
}

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
