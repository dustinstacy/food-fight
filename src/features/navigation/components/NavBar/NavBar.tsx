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
 * - The navigation bar includes a logo, links, and a user section.
 * - The logo links to the home page.
 * - The links are conditionally rendered based on the user's connection status.
 * - The user section displays the user's avatar and name if connected.
 * - If not connected, a "Connect" button is displayed.
 *
 * @returns The NavBar component JSX element (a `<div>` containing the navigation bar).
 */
const NavBar = () => {
  const { isConnected } = useAccount()
  const { open } = useAppKit()

  const handleConnectWallet = () => {
    // Open the wallet connection modal
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
