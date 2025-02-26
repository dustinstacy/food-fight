"use client"
import { NavBar } from "components"
import { WalletProvider } from "providers/WalletProvider"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <WalletProvider>
            <NavBar />
            {children}
        </WalletProvider>
    )
}
