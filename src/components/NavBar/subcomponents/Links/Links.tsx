import Link from "next/link"
import React from "react"

import { navLinks } from "data"
import { classSet } from "utils"

import "./links.scss"

interface LinksProps {
    menu: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

// Renders a list of navigation links with customizable CSS classes and functionality.
// - menu: The identifier for the menu, used to generate CSS class names.
// - onClick: Add additional click event handler for the links.
const Links = ({ menu, onClick }: LinksProps) => {
    const linkClasses = () => classSet(`${menu}-link`, "center")

    return (
        <div className={`${menu}-links`}>
            {navLinks.map((link) => (
                <Link
                    className={linkClasses()}
                    key={link.name}
                    href={link.path}
                    onClick={(e) => onClick?.(e)}
                >
                    {link.image}
                    <span>{link.name}</span>
                </Link>
            ))}
        </div>
    )
}

export default Links
