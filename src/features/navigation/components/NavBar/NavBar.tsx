'use client'

import { useAppKit } from '@reown/appkit/react'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'

import { smallLogo1 } from 'assets'
import { Button } from 'components'

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
      <BurgerMenu />
      {/* --- Logo linking to the home page --- */}
      <Link href='/'>
        <Image className='navbar__logo abs-center' src={smallLogo1} alt='Food Fight logo' priority={true} />
      </Link>
      <Links menu='navbar' />
      {/* --- Conditional rendering using wagmi's isConnected --- */}
      {isConnected ? (
        // Render user-specific section if wallet is connected
        <UserSection />
      ) : (
        // Render connect button if wallet is not connected
        <Button label='Connect' onClick={handleConnectWallet} />
      )}
    </div>
  )
}

NavBar.displayName = 'NavBar'
export default NavBar
