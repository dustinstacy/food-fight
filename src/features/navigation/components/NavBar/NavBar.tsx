'use client'

import { useAppKit } from '@reown/appkit/react'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'

import { Button } from 'components'
import { smallLogo } from 'data'

import { BurgerMenu, Links, UserSection } from './subcomponents'

import './navBar.scss'

/**
 * Renders the navigation bar for the application.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying the application logo.
 * - Providing navigation links.
 * - Allowing users to connect their wallets.
 * - Conditionally rendering user-specific sections based on wallet connection status.
 * - Conditionally rendering the burger menu or navigation links based on media queries (SCSS).
 */
const NavBar = () => {
  const { isConnected } = useAccount()
  const { open } = useAppKit()

  const handleConnectWallet = () => {
    open()
  }

  return (
    <div className='navbar between secondary-gradient'>
      {/* ----- Burger menu ----- */}
      <BurgerMenu />

      {/* ----- Logo ----- */}
      <Link href='/'>
        <Image
          className='navbar__logo abs-center'
          src={smallLogo}
          alt='Food Fight logo'
          priority={true}
          width={100}
          height={100}
        />
      </Link>

      {/* ----- Navigation links ----- */}
      <Links menu='navbar' />

      {/* ----- Connect wallet button or user section ----- */}
      {isConnected ? <UserSection /> : <Button label='Connect' onClick={handleConnectWallet} />}
    </div>
  )
}

NavBar.displayName = 'NavBar'
export default NavBar
