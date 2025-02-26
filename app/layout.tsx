import type { Metadata } from "next"

import ClientLayout from "./client-layout"
import "./styles/globals.scss"
import "./styles/containers.scss"
import "./styles/modules.scss"
import "./styles/theme.scss"

export const metadata: Metadata = {
    title: "Food Fight",
    // icons: {
    //     icon: [{ url: "/favicon.png" }],
    // },
    description: "Food Fight is a web3 collectible card game",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    )
}
