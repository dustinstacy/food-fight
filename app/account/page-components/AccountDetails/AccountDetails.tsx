"use client"

import React, { useState } from "react"
import { GoPencil } from "react-icons/go"

import { Avatar } from "components"
import { useUserStore } from "stores"

import { EditUser } from "./subcomponents"

import "./accountDetails.scss"

// A component that displays the account details of the current user.
const AccountDetails = () => {
    const user = useUserStore((state) => state.user)

    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='account-details'>
            {isEditing ? (
                <EditUser setIsEditing={setIsEditing} />
            ) : (
                <>
                    <h1>Account</h1>
                    <div className='box background-gradient-reverse'>
                        {user && (
                            <div className='edit' onClick={() => setIsEditing(true)}>
                                <GoPencil />
                            </div>
                        )}
                        <div className='wrapper center-column'>
                            <Avatar medium />
                            <div className='section center-column'>
                                <span>
                                    Username:
                                    {user && <p>{user?.username}</p>}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AccountDetails
