"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io"

import { updateUser } from "api"
import { Avatar, Button, TextInput } from "components"
import { useWallet } from "providers"
import { useUserStore } from "stores"

import "./editUser.scss"
import { User } from "types"

interface EditUserProps {
    setIsEditing: Dispatch<SetStateAction<boolean>>
}

interface updateErrors {
    image: string
    username: string
}

const EditUser = ({ setIsEditing }: EditUserProps) => {
    const { accounts } = useWallet()
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)

    const [newUserImage, setNewUserImage] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<updateErrors>({ image: "", username: "" })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setErrors({ image: "", username: "" }) // Clear any previous errors
        if (name === "image") {
            setNewUserImage(value)
        }
        if (name === "username") {
            setNewUsername(value)
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
        setLoading(true)

        try {
            if (name === "username") {
                await updateUser("username", newUsername, accounts[0])
                setNewUsername("") // Clear the input field
                setUser({ ...user!, username: newUsername })
            }

            if (name === "image") {
                await updateUser("image", newUserImage, accounts[0])
                setNewUserImage("") // Clear the input field
                // Directly set the updated user object
                setUser({ ...user!, image: newUserImage })
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrors({ ...errors, [name]: error.message })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Edit Account</h1>
            <div className='box background-gradient'>
                <div className='edit' onClick={() => setIsEditing(false)}>
                    <IoMdCloseCircle />
                </div>
                <div className='wrapper center-column'>
                    <div className='section center-column'>
                        <Avatar medium />
                        <div className='edit-input center'>
                            <TextInput
                                label='paste new image url here'
                                name='image'
                                value={newUserImage}
                                onChange={handleInputChange}
                                loading={loading}
                            />
                            {errors && <p className='error'>{errors.image}</p>}
                            <Button
                                label='Update Image'
                                type='submit'
                                onClick={(e) => handleSubmit(e, "image")}
                                disabled={newUserImage.length === 0}
                            />
                        </div>
                    </div>
                    <div className='section center-column'>
                        <span>
                            Username:
                            <p>{user?.username}</p>
                        </span>
                        <div className='edit-input center'>
                            <TextInput
                                label='enter new username here'
                                name='username'
                                value={newUsername}
                                onChange={handleInputChange}
                                loading={loading}
                            />
                            {errors && <p className='error'>{errors.username}</p>}
                            <Button
                                label='Update Username'
                                type='submit'
                                onClick={(e) => handleSubmit(e, "username")}
                                disabled={newUsername.length === 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser
