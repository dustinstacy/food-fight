"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io"

import { updateUser } from "api"
import { Avatar, Button, TextInput } from "components"
import { useUserStore } from "stores"

import "./editUser.scss"

interface EditUserProps {
    setIsEditing: Dispatch<SetStateAction<boolean>>
}

const EditUser = ({ setIsEditing }: EditUserProps) => {
    const user = useUserStore((state) => state.user)

    const [newUserImage, setNewUserImage] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setError("") // Clear any previous errors
        if (name === "image") {
            setNewUserImage(value)
        }
        if (name === "username") {
            setNewUsername(value)
        }
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        setLoading(true)
        const { name } = e.target as HTMLButtonElement

        try {
            if (name === "username") await updateUser("username", newUsername)
            if (name === "image") await updateUser("image", newUserImage)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
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
                            {error && <p className='error'>{error}</p>}
                            <Button
                                label='Update Image'
                                type='submit'
                                onClick={handleSubmit}
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
                            {error && <p className='error'>{error}</p>}
                            <Button
                                label='Update Username'
                                type='submit'
                                onClick={handleSubmit}
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
