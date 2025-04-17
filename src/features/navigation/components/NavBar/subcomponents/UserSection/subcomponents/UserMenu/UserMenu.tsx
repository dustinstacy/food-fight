'use client'

import Switch from '@mui/material/Switch'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useAccount, useDisconnect } from 'wagmi'

import { UseToggleProps } from 'hooks/types'
import { useAuthStore, useThemeStore } from 'stores'
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
 * @param props.isOpen - Boolean indicating whether the menu is open or closed.
 * @param props.toggleIsOpen - Function to toggle the menu open/closed state.
 */
const UserMenu = ({ isOpen, toggleIsOpen }: UseToggleProps) => {
  const { logout: logoutFromAuthStore } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const queryClient = useQueryClient()

  const isDarkMode = theme === 'dark'

  const handleThemeChange = () => {
    toggleTheme()
  }

  const handleLogout = () => {
    console.log('UserMenu: Logging out...')
    logoutFromAuthStore()
    queryClient.removeQueries({ queryKey: ['currentUser', address] })
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
