'use client'

import Switch from '@mui/material/Switch'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useDisconnect } from 'wagmi'

import { useThemeStore } from 'features/user/stores'
import { UseToggleProps } from 'hooks/types'
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

  const menuRef = useRef<HTMLDivElement>(null)
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
      const role = event.currentTarget.getAttribute('data-role') // Add data-role attribute below
      if (role === 'logout') {
        handleLogout()
      } else if (role === 'theme-toggle') {
        toggleTheme()
      }
    }

    if (event.key === 'Escape') {
      toggleIsOpen?.()
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleIsOpen?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggleIsOpen])

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className='user-menu left-column black-border primary-gradient tilt-warp'
          role='menu'
        >
          {/* ----- Account Link ----- */}
          <Link
            className='user-menu__link text-shadow'
            href='/account'
            onClick={() => toggleIsOpen?.()}
            role='menuitem'
          >
            <span>Account</span>
          </Link>

          {/* ----- Dark Mode Toggle ----- */}
          <div
            className='user-menu__toggle left'
            onClick={toggleTheme}
            role='menuitem'
            data-role='theme-toggle'
            tabIndex={0}
            onKeyDown={handleDivKeyDown}
          >
            <span className='user-menu__link text-shadow'>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
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
            data-role='logout'
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
