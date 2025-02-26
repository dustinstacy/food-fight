import { useWallet } from "providers/WalletProvider"

import "./userSection.scss"

// This component acts as the parent component for all User-related navigation bar components
const UserSection = () => {
    const { accounts } = useWallet()

    return (
        <div className='user-section end'>
            <p>
                Connected Account:{" "}
                {accounts.map((account) => `${account.slice(0, 7)}...${account.slice(-4)}`).join(", ")}
            </p>
        </div>
    )
}
export default UserSection
