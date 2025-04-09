"use client"

import { useEffect } from "react"
import { MdOutlineClose, MdMenu } from "react-icons/md"
import useMediaQuery from "@mui/material/useMediaQuery"
import { motion } from "framer-motion"
import { useToggle } from "hooks"
import { Links } from ".."
import "./burgerMenu.scss"

/**
 * Renders a burger icon button that toggles an animated slide-down navigation menu,
 * primarily intended for smaller screen sizes. Uses framer-motion for animations.
 *
 * @notice Requires `react-icons`, `@mui/material`, `framer-motion` and a custom `useToggle` hook.
 *
 * @remarks
 * - Manages open/closed state using the `useToggle` custom hook.
 * - Conditionally renders `MdMenu` (open) or `MdOutlineClose` (close) icons, which act as the toggle trigger.
 * - Uses `framer-motion` (`motion.div`) to animate the menu panel's `height` and `paddingTop`.
 * - Automatically closes the menu via `useEffect` if the screen resizes to 992px or wider (`useMediaQuery`) or on component unmount.
 * - Renders the `Links` component inside the animated panel.
 * - Passes an `onClick` handler down to `Links` intended to close the menu when a navigation item is clicked.
 *
 * @see {@link useToggle} - Custom hook for managing toggle state.
 * @see {@link Links} - Component rendering navigation links.
 */
const BurgerMenu = () => {
    const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false)
    const isLargeScreen = useMediaQuery("(min-width: 992px)")

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

            {/* Animated Menu Panel */}
            <motion.div
                className='menu primary-gradient'
                initial={{ height: 0, paddingTop: 0, overflow: "hidden" }}
                animate={{
                    height: isOpen ? "100vh" : 0,
                    paddingTop: isOpen ? "24px" : 0,
                    transitionEnd: {
                        overflow: isOpen ? "auto" : "hidden",
                    },
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                {/* Navigation Links inside the menu */}
                <Links menu='burger-menu' onClick={() => setIsOpen(false)} />
            </motion.div>
        </div>
    )
}

BurgerMenu.displayName = "BurgerMenu"
export default BurgerMenu
