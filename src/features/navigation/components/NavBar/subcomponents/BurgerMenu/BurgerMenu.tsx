'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { MdOutlineClose, MdMenu } from 'react-icons/md'

import { useToggle } from 'hooks'

import { Links } from '..'
import './burgerMenu.scss'

/**
 * Renders a burger icon button that toggles an animated slide-down navigation menu.
 *
 * @remarks
 * - Uses the {@link useToggle} hook to manage the menu's open/closed state.
 * - Uses MUI's {@link useMediaQuery} hook to detect screen size.
 * - The animated panel contains the {@link Links} component.
 *
 * @returns The BurgerMenu component JSX (`div`).
 */
const BurgerMenu = () => {
  const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false)
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [setIsOpen, isLargeScreen])

  return (
    <div className='burger-menu'>
      {!isOpen ? (
        <MdMenu className='burger-menu__icon' onClick={toggleIsOpen} />
      ) : (
        <MdOutlineClose className='burger-menu__icon' onClick={toggleIsOpen} />
      )}

      {/* ----- Animated Menu Panel ----- */}
      <motion.div
        className='menu primary-gradient'
        initial={{ height: 0, paddingTop: 0, overflow: 'hidden' }}
        animate={{
          height: isOpen ? '100vh' : 0,
          paddingTop: isOpen ? '24px' : 0,
          transitionEnd: {
            overflow: isOpen ? 'auto' : 'hidden',
          },
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* ----- Navigation Links ----- */}
        <Links menu='burger-menu' onClick={() => setIsOpen(false)} />
      </motion.div>
    </div>
  )
}

BurgerMenu.displayName = 'BurgerMenu'
export default BurgerMenu
