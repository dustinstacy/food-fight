'use client'
import Link from 'next/link'
import React from 'react'

import { navLinks } from 'features/navigation/data'
import type { LinksProps } from 'features/navigation/types'
import { classSet } from 'utils'
import './links.scss'

/**
 * Renders a list of navigation links.
 *
 * @remarks
 * - Maps over the `navLinks` array, rendering each item as a Next.js <Link> element containing an icon and text.
 * - Dynamically applies CSS classes based on the `menu` prop.
 *
 * @param props - Props conforming to the {@link LinksProps} interface.
 * @param props.menu - Identifier for the menu context (e.g., 'navbar', 'burger-menu'), used for styling.
 * @param props.onClick - Optional click handler passed down to each individual link element.
 * @returns The Links component JSX element (a `<div>` containing multiple `<Link>` elements).
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
        <Link className={linkClasses} key={link.name} href={link.path} onClick={(e) => onClick?.(e)}>
          {link.image}
          <span>{link.name}</span>
        </Link>
      ))}
    </div>
  )
}

Links.displayName = 'Links'
export default Links
