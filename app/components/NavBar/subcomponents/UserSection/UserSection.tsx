import { Avatar } from "components"
import { useUserStore } from "stores"

import "./userSection.scss"

// This component acts as the parent component for all User-related navigation bar components
const UserSection = () => {
    const user = useUserStore((state) => state.user)

    return (
        <div className='user-section end'>
            <hr />
            <div className='user-info center-column'>{user?.username}</div>
            <Avatar menu small />
        </div>
    )
}
export default UserSection
