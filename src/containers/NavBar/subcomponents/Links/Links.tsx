import Link from "next/link"
import React from "react"
import { navLinks } from "data"
import { classSet } from "utils"
import "./links.scss"

/////////////////////////////////////////////
/// Types                                 ///
/////////////////////////////////////////////

interface LinksProps {
    // Identifier for the menu context (e.g., 'navbar', 'burger-menu'), used for styling. (Required)
    menu: string
    // Optional click handler passed down to each individual link element.
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/////////////////////////////////////////////
/// Component                             ///
/////////////////////////////////////////////

/**
 * @component
 * Renders a list of navigation links based on the `navLinks` data source.
 * Adapts styling and layout dynamically based on the provided `menu` context prop.
 *
 * @notice Requires `navLinks` data from the `data` module for link information.
 *
 * @remarks
 * - Renders both an image/icon (`link.image`) and text (`link.name`) within each link.
 * - If using 'navbar' links, the links are displayed in a row and only on screens >= 768px.
 * - If using 'burger-menu' links, the links are displayed in a column and only on screens < 768px.
 *
 * @param {LinksProps} props - The props for the Links component.
 * @param {string} props.menu - Identifier for the menu context (e.g., 'navbar', 'burger-menu'), drives styling. (Required)
 * @param {(e: React.MouseEvent<HTMLAnchorElement>) => void} [props.onClick] - Optional click handler for each link.
 *
 * @see {@link navLinks} - Data source for navigation links, containing `path`, `name`, and `image` properties.}
 */
const Links = ({ menu, onClick }: LinksProps) => {
    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    const containerClasses = classSet(
        `${menu}-links`,
        menu === "burger-menu"
            ? "top-left-column" // Module class
            : ""
    )

    const linkClasses = classSet(
        `${menu}-link`,
        menu === "burger-menu"
            ? "center" // Module class
            : "bottom-column" // Module class
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
