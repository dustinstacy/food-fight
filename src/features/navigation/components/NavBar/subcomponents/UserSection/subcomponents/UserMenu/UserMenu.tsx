'use client'

import Switch from '@mui/material/Switch'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDisconnect } from 'wagmi'

import { UseToggleProps } from 'hooks/types'
import { useThemeStore } from 'stores'
import './userMenu.scss'

/**
 * Renders the user menu.
 *
 * @remarks
 * - This component is responsible for:
 * - Displaying the user's account link.
 * - Providing a toggle for dark mode.
 * - Allowing the user to log out.
 *
 * @param props - The component props.
 * @param props.toggleState - Boolean indicating whether the menu is open or closed.
 * @param props.toggle- Function to toggle the menu open/closed state.
 */
const UserMenu = ({ toggleState: isOpen, toggle: toggleIsOpen }: UseToggleProps) => {
  const { theme, toggleTheme } = useThemeStore()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const isDarkMode = theme === 'dark'

  const handleThemeChange = () => {
    toggleTheme()
  }

  const handleLogout = async () => {
    console.log('UserMenu: Logging out...')
    disconnect()
    toggleIsOpen?.()
    router.push('/')
  }

  const handleDivKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleTheme()
    }
  }

  return (
    <>
      {isOpen && (
        <div className='user-menu left-column black-border primary-gradient tilt-warp'>
          {/* ----- Account Link ----- */}
          <Link className='user-menu__link text-shadow' href='/account' onClick={() => toggleIsOpen?.()}>
            <span>Account</span>
          </Link>

          {/* ----- Dark Mode Toggle ----- */}
          <div
            className='user-menu__toggle left'
            onClick={toggleTheme}
            role='button'
            tabIndex={0}
            onKeyDown={handleDivKeyDown}
          >
            <span className='user-menu__link text-shadow'>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <Switch
              checked={isDarkMode}
              onChange={handleThemeChange}
              size='small'
              onClick={(e) => e.stopPropagation()} // Prevent double toggle
              slotProps={{
                input: { 'aria-label': 'toggle dark mode' },
              }}
            />
          </div>

          {/* ----- Logout ----- */}
          <div
            className='left text-shadow'
            onClick={handleLogout}
            role='button'
            tabIndex={0}
            onKeyDown={handleDivKeyDown}
          >
            <span className='user-menu__link'>Logout</span>
          </div>
        </div>
      )}
    </>
  )
}

UserMenu.displayName = 'UserMenu'
export default UserMenu
