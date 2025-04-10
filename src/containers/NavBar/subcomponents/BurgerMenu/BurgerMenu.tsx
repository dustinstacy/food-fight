"use client"

import { useEffect } from "react"
import { MdOutlineClose, MdMenu } from "react-icons/md"
import useMediaQuery from "@mui/material/useMediaQuery"
import { motion } from "framer-motion"
import { useToggle } from "hooks"
import { Links } from ".."
import "./burgerMenu.scss"

/////////////////////////////////////////////
/// Component                             ///
/////////////////////////////////////////////

/**
 * @component
 * Renders a burger icon button that toggles an animated slide-down navigation menu,
 * primarily intended for smaller screen sizes. Uses framer-motion for animations.
 *
 * @notice Requires `react-icons` for icons, `@mui/material`  for media queries, `framer-motion` for animation,
 * and a custom `useToggle` hook for state management.
 *
 * @remarks
 * - Automatically closes the menu via `useEffect` if the screen resizes to 768px or wider (`useMediaQuery`) or on component unmount.
 * - Passes an `onClick` handler down to `Links` intended to close the menu when a navigation item is clicked.
 * - Rendering logic:
 *   - If `isOpen` is false, show the burger icon (`MdMenu`).
 *   - If `isOpen` is true, show the close icon (`MdOutlineClose`).
 *   - The menu panel animates its height and padding based on the `isOpen` state.
 *   - Renders the `Links` component inside the animated panel.
 *   - The menu will not be displayed on screens >= 768px.
 *
 * @see {@link useToggle} - Custom hook for managing toggle state.
 * @see {@link Links} - Component rendering navigation links.
 */
const BurgerMenu = () => {
    /////////////////////////////////////////////////////
    /// Hooks                                         ///
    /////////////////////////////////////////////////////

    const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false)
    const isLargeScreen = useMediaQuery("(min-width: 768px)")

    /////////////////////////////////////////////////////
    /// Effects                                       ///
    /////////////////////////////////////////////////////

    useEffect(() => {
        return () => {
            setIsOpen(false)
        }
    }, [setIsOpen, isLargeScreen])

    /////////////////////////////////////////////////////
    /// Render                                        ///
    /////////////////////////////////////////////////////

    return (
        <div className='burger-menu'>
            {!isOpen ? (
                <MdMenu className='burger-menu__icon' onClick={toggleIsOpen} />
            ) : (
                <MdOutlineClose className='burger-menu__icon' onClick={toggleIsOpen} />
            )}

            {/* --- Animated Menu Panel --- */}
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
                {/* --- Navigation Links inside the menu --- */}
                <Links menu='burger-menu' onClick={() => setIsOpen(false)} />
            </motion.div>
        </div>
    )
}

BurgerMenu.displayName = "BurgerMenu"
export default BurgerMenu
