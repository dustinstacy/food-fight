import { useToggle } from "hooks"
import { User } from "types"
import { useUserStore } from "stores"
import { classSet } from "utils"

import { AvatarMenu } from "./subcomponents"
import "./avatar.scss"
import Image from "next/image"

// Renders user image avatar
// menu: Indicates whether the avatar has an onClick menu
// small, medium, large: Indicates the avatar's size
const Avatar = ({ menu = false, small = false, medium = false, large = false }) => {
    const user = useUserStore((state) => state.user)
    const { image } = (user as User) ?? {}

    const [isOpen, toggleIsOpen] = useToggle(false)

    const handleClick = () => {
        if (menu) {
            toggleIsOpen()
        }
    }

    // Dynamically set CSS classes based on props
    const avatarClasses = classSet(
        "avatar",
        "black-border",
        small ? "small" : "",
        medium ? "medium" : "",
        large ? "large" : ""
    )

    // Dynamically set <Image> element width and height based on size props
    let imgWidth = 100
    let imgHeight = 100

    if (small) {
        imgWidth = 64
        imgHeight = 64
    } else if (medium) {
        imgWidth = 128
        imgHeight = 128
    } else if (large) {
        imgWidth = 192
        imgHeight = 192
    }

    const imageClasses = classSet("fill", menu ? "pointer" : "")

    // Fallback loading box styles (using a div as placeholder)
    const loadingBoxStyles = {
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
        backgroundColor: "#f0f0f0", // Light gray background color
        borderRadius: "4px", // Circular shape for the avatar
        animation: "loading-placeholder 1.5s infinite linear", // Optional animation
    }

    return (
        <div className={avatarClasses}>
            {!image ? (
                <div style={loadingBoxStyles}></div> // Loading box placeholder
            ) : (
                <Image
                    className={imageClasses}
                    src={image}
                    alt='user image'
                    height={imgHeight}
                    width={imgWidth}
                    onClick={handleClick}
                    priority
                />
            )}
            {menu && <AvatarMenu isOpen={isOpen} toggleIsOpen={toggleIsOpen} />}
        </div>
    )
}

export default Avatar
