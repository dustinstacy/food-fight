'use client'

import Image from 'next/image'

import { largeLogo1 } from 'assets'
import { Button } from 'components'
import { navLinks } from 'features/navigation/data'
import { useCurrentUser } from 'features/user/hooks'
import './home.scss'

/**
 * @component Home
 * Renders the main home page ('/') for the Food Fight application.
 * Displays a background logo and conditionally renders navigation buttons
 * (excluding 'Home') based on the user's authentication status fetched from `useCurrentUser()`.
 *
 * @remarks
 * Rendering Logic:
 * - Displays logo using next/image (requires `fill` and `sizes` props).
 * - If `user` exists in the store, maps over `navLinks` (excluding 'Home') to render navigation `Button` components.
 * - If `user` does not exist (or is being checked), no buttons are rendered.
 *
 * @returns The JSX element representing the Home page structure.
 */
export default function Home() {
  const { data: user } = useCurrentUser()
  return (
    <div className='home page bottom background-gradient'>
      <Image className='home__logo abs-top-center' src={largeLogo1} alt='Food Fight logo' sizes='100vw' />
      {user ? (
        <div className='home__buttons bottom-column'>
          {navLinks.map(
            (link) => link.name !== 'Home' && <Button key={link.name} label={link.name} path={link.path} />
          )}
        </div>
      ) : (
        <> </>
      )}
    </div>
  )
}
