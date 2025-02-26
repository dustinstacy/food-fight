"use client"
import { NavBar } from "components"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}
