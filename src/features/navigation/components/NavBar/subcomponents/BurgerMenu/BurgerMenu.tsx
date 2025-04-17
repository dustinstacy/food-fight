'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { MdOutlineClose, MdMenu } from 'react-icons/md'

import { useToggle } from 'hooks'

import { Links } from '..'
import './burgerMenu.scss'

/**
 * Renders a burger icon menu.
 *
 * @remarks
 * - This component is responsible for:
 * - Displaying a burger icon when the menu is closed.
 * - Displaying a close icon when the menu is open.
 * - Animating the menu panel to slide down when opened and slide up when closed.
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
