'use client'

import Image from 'next/image'

import { largeLogo1 } from 'assets'
import { Button } from 'components'
import { navLinks } from 'features/navigation/data'
import { useCurrentUser } from 'features/user/hooks'
import './home.scss'

/**
 * Renders the home page of the application.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying the application logo.
 * - Rendering navigation buttons based on the user's authentication status.
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
