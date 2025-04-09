import { Avatar } from "components"
import { useToggle } from "hooks"
import { useUserStore } from "stores"

import { UserMenu } from "./subcomponents"
import "./userSection.scss"

// This component acts as the parent component for all User-related navigation bar components
const UserSection = () => {
    const user = useUserStore((state) => state.user)

    const [isOpen, toggleIsOpen] = useToggle(false)

    const handleClick = () => {
        toggleIsOpen()
    }

    return (
        <div className='user-section right'>
            <hr />
            <div className='user-section__name center-column'>
                <p>{user?.username}</p>
            </div>
            <Avatar size='small' onClick={handleClick} />
            {isOpen && <UserMenu isOpen toggleIsOpen={toggleIsOpen} />}
        </div>
    )
}
export default UserSection
