'use client'

import Image from 'next/image'

import { Button } from 'components'
import { mainLogo } from 'data'
import { useAuthStore } from 'features/auth/stores'
import { navLinks } from 'features/navigation'
import { useCurrentUser } from 'features/user'
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
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)

  return (
    <div className='home page bottom background-gradient'>
      <Image
        className='home__logo abs-top-center'
        src={mainLogo}
        alt='Food Fight logo'
        width={2000}
        height={1000}
      />
      {user && !isAttemptingAuth ? (
        <div className='home__buttons bottom-column'>
          {navLinks.map(
            (link) =>
              link.name !== 'Home' && <Button key={link.name} label={link.name} path={link.path} />
          )}
        </div>
      ) : (
        <> </>
      )}
    </div>
  )
}
