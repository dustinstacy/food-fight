'use client'

import Switch from '@mui/material/Switch'
import Link from 'next/link'
import { useDisconnect } from 'wagmi'

import { useThemeStore } from 'stores'
import { UseToggleProps } from 'types'
import './userMenu.scss'

/**
 * Renders the user menu with options for account, dark mode toggle, and logout.
 *
 * @remarks
 * - This component is conditionally rendered based on the `isOpen` prop.
 * - The account link navigates to the user's account page.
 * - The dark mode toggle updates the theme in the global store.
 * - The logout option disconnects the user from the current session (both wallet and app).
 *
 * @param props - The component props.
 * @param props.isOpen - Boolean indicating whether the menu is open or closed.
 * @param props.toggleIsOpen - Function to toggle the menu open/closed state.
 * @returns The UserMenu component JSX element (a `<div>` containing user-related options).
 */
const UserMenu = ({ isOpen, toggleIsOpen }: UseToggleProps) => {
  const { theme, toggleTheme } = useThemeStore()
  const { disconnect } = useDisconnect()

  const isDarkMode = theme === 'dark'

  const handleThemeChange = () => {
    toggleTheme()
  }

  const handleLogout = () => {
    disconnect()
    toggleIsOpen?.()
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
          <Link className='user-menu__link text-shadow' href='/account' onClick={() => toggleIsOpen?.()}>
            <span>Account</span>
          </Link>

          {/* ----- Dark Mode Toggle ----- */}
          <div className='left' onClick={toggleTheme} role='button' tabIndex={0} onKeyDown={handleDivKeyDown}>
            <span className='user-menu__link text-shadow'>Dark Mode</span>
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
