import { useToggle } from "hooks"
import { User } from "types"
import { useUserStore } from "stores"
import { classSet } from "utils"

import { AvatarMenu } from "./components"
import "./avatar.scss"

// Renders user image avatar
// levelShowing: Indicates whether the user's level should be displayed
// menu: Indicates whether the avatar has an onClick menu
// small, medium, large: Indicates the avatar's size
const Avatar = ({
    menu = false as boolean,
    small = false as boolean,
    medium = false as boolean,
    large = false as boolean,
}) => {
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
        "secondary-border",
        small ? "small" : "",
        medium ? "medium" : "",
        large ? "large" : ""
    )

    const imageClasses = classSet("fill", menu ? "pointer" : "")

    return (
        <div className={avatarClasses}>
            <img className={imageClasses} src={image} alt='user image' onClick={() => handleClick()} />
            {menu && <AvatarMenu isOpen={isOpen} toggleIsOpen={toggleIsOpen} />}
        </div>
    )
}

export default Avatar
