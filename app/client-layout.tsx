"use client"

import { NavBar } from "components"
import { useWallet } from "providers"
import { useEffect } from "react"
import { useUserStore } from "stores"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { accounts } = useWallet()
    const checkForUser = useUserStore((state) => state.checkForUser)

    useEffect(() => {
        checkForUser(accounts[0])
    }, [accounts])

    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}
