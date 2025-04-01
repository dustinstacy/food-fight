import { useEffect } from "react"
import { MdOutlineClose, MdMenu } from "react-icons/md"
import useMediaQuery from "@mui/material/useMediaQuery"
import { motion } from "framer-motion"

import { useToggle } from "hooks"

import { Links } from ".."
import "./burgerMenu.scss"

// Renders burger icon menu for navigation bar
const BurgerMenu = () => {
    const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false)
    const isSmallScreen = useMediaQuery("(min-width:600px)")

    // Reset the menu state when unmounting or when the screen size changes
    useEffect(() => {
        return () => {
            setIsOpen(false)
        }
    }, [setIsOpen, isSmallScreen])

    return (
        <div className='burger-menu'>
            {!isOpen ? (
                <MdMenu onClick={() => toggleIsOpen()} />
            ) : (
                <MdOutlineClose onClick={() => toggleIsOpen()} />
            )}
            <motion.div
                className='menu background-gradient'
                initial={{ height: 0 }}
                animate={{
                    height: isOpen ? "100vh" : 0,
                    paddingTop: isOpen ? "24px" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                <Links menu='burger-menu' onClick={() => setIsOpen(false)} />
            </motion.div>
        </div>
    )
}

export default BurgerMenu
