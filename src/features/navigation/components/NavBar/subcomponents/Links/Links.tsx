'use client'
import Link from 'next/link'
import React from 'react'

import { LinksProps, navLinks } from 'features/navigation'
import { classSet } from 'utils'
import './links.scss'

/**
 * Renders a list of navigation links.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying a set of navigation links based on the provided `menu` prop.
 * - Applying specific styles based on the `menu` context.
 * - Handling optional click events for each link.
 *
 * @param props - Props conforming to the {@link LinksProps} interface.
 * @param props.menu - Identifier for the menu context.
 * @param props.onClick - Optional click handler passed down to each individual link element.
 */
const Links = ({ menu, onClick }: LinksProps) => {
  const containerClasses = classSet(
    `${menu}-links`,
    'tilt-warp',
    'text-shadow',
    menu === 'burger-menu' ? 'top-left-column' : ''
  )

  const linkClasses = classSet(`${menu}-link`, menu === 'burger-menu' ? 'center' : 'bottom-column')

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

Links.displayName = 'Links'
export default Links
