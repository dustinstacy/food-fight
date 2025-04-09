import Link from "next/link"
import React from "react"
import { navLinks } from "data"
import { classSet } from "utils"

import "./links.scss"

interface LinksProps {
    // Identifier for the menu context (e.g., 'navbar', 'burger-menu'), used for styling. (Required)
    menu: string
    // Optional click handler passed down to each individual link element.
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders a list of navigation links based on the `navLinks` data source.
 * Adapts styling and layout dynamically based on the provided `menu` context prop.
 *
 * @remarks
 * - Maps over the `navLinks` array imported from the `data` module.
 * - Dynamically generates CSS classes based on the `menu` prop for contextual styling:
 * - Passes the optional `onClick` handler to each generated link, useful for actions like closing a mobile menu upon navigation.
 * - Renders both an image/icon (`link.image`) and text (`link.name`) within each link.
 *
 * @param {LinksProps} props - The props for the Links component.
 * @param {string} props.menu - Identifier for the menu context (e.g., 'navbar', 'burger-menu'), drives styling. (Required)
 * @param {(e: React.MouseEvent<HTMLAnchorElement>) => void} [props.onClick] - Optional click handler for each link.
 *
 * @see {@link navLinks} - Data source for navigation links, containing `path`, `name`, and `image` properties.}
 */
const Links = ({ menu, onClick }: LinksProps) => {
    const containerClasses = classSet(
        `${menu}-links`,
        menu === "burger-menu" ? "top-left-column" : ""
    )

    const linkClasses = classSet(
        `${menu}-link`,
        menu === "burger-menu" ? "center" : "bottom-column"
    )

    return (
        <div className={containerClasses}>
            {navLinks.map((link) => (
                <Link
                    className={linkClasses}
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

Links.displayName = "Links"
export default Links
