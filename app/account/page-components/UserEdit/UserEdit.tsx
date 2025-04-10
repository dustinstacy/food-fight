"use client"

import React, { Dispatch, SetStateAction, useState, MouseEvent, ChangeEvent } from "react"
import { IoMdCloseCircle } from "react-icons/io"
import { updateUser } from "api"
import { Avatar, Button, TextInput } from "components"
import { useWallet } from "providers"
import { useUserStore } from "stores"
import "./userEdit.scss"

////////////////////////////////////////////////
/// Types                                    ///
////////////////////////////////////////////////

interface UserEditProps {
    // Callback to set the editing state in the parent component. (Required)
    setIsEditing: Dispatch<SetStateAction<boolean>>
}

interface UserEditErrors {
    // Error messages for the image and username fields.
    image: string
    username: string
}

////////////////////////////////////////////////
/// Component                                ///
////////////////////////////////////////////////

/**
 * @component
 * Renders a form/modal allowing the user to edit their profile image URL and username.
 * Handles input changes, submits updates via an API call, displays errors, and manages loading states.
 *
 * @notice Requires `useWallet` for wallet connection and `useUserStore` for user data.
 *
 * @remarks
 * - The component manages its own loading state and error messages for each input field.
 *
 * @param {UserEditProps} props - Props for the UserEdit component.
 * @param {Dispatch<SetStateAction<boolean>>} props.setIsEditing - Function to signal closing the edit view. (Required)
 *
 * @see {@link TextInput} - Component for user input fields.
 * @see {@link Button} - Component for action buttons.
 * @see {@link Avatar} - Component for displaying user profile images.
 * @see {@link useWallet} - Hook/Context providing wallet connection and account information.
 * @see {@link useUserStore} - Hook/Context for managing user state.
 * @see {@link updateUser} - API function for updating user information.
 */
const UserEdit = ({ setIsEditing }: UserEditProps) => {
    ////////////////////////////////////////////////
    /// Hooks                                    ///
    ////////////////////////////////////////////////

    const { accounts } = useWallet()
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)

    ////////////////////////////////////////////////
    /// State                                    ///
    ////////////////////////////////////////////////

    const [newUserImage, setNewUserImage] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<UserEditErrors>({ image: "", username: "" })

    ////////////////////////////////////////////////
    /// Handlers                                 ///
    ////////////////////////////////////////////////

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // Clear error only for the specific field being changed
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))

        // Update the corresponding state based on input name
        if (name === "image") {
            setNewUserImage(value)
        } else if (name === "username") {
            setNewUsername(value)
        }
    }

    const handleSubmit = async (
        e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
        field: "image" | "username"
    ) => {
        e.preventDefault()

        if (loading) return

        // Check if the wallet is connected and user data is available
        if (!accounts || accounts.length === 0 || !user) {
            console.error("Cannot update: Wallet not connected or user data missing.")
            setErrors((prev) => ({ ...prev, [field]: "Cannot update profile right now." }))
            return
        }

        const valueToSubmit = field === "image" ? newUserImage : newUsername

        // Validate input before submitting
        if (!valueToSubmit || valueToSubmit.trim().length === 0) {
            setErrors((prev) => ({ ...prev, [field]: "Input cannot be empty." }))
            return
        }

        // Clear any previous error message for the field being submitted
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }))
        setLoading(true)

        try {
            await updateUser(field, valueToSubmit.trim(), accounts[0])
            setUser({ ...user, [field]: valueToSubmit.trim() })

            // Clear the corresponding input field state after successful update
            if (field === "image") setNewUserImage("")
            if (field === "username") setNewUsername("")
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "An unexpected error occurred."
            setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }))
        } finally {
            setLoading(false)
        }
    }

    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    return (
        <div>
            <div className='primary-gradient'>
                {/* --- Close Button --- */}
                <button
                    type='button'
                    className='edit'
                    onClick={() => setIsEditing(false)}
                    aria-label='Close edit profile'
                    disabled={loading}
                >
                    <IoMdCloseCircle />
                </button>

                <div className='wrapper center-column'>
                    {/* --- Image Section --- */}
                    <div className='section center-column'>
                        <Avatar size='medium' />
                        <div className='edit-input center'>
                            <TextInput
                                label='Image URL'
                                name='image'
                                value={newUserImage}
                                onChange={handleInputChange}
                                loading={loading}
                                error={errors.image}
                                autoComplete='off'
                            />
                            <Button
                                label='Update Image'
                                htmlButtonType='button'
                                onClick={(e) => handleSubmit(e, "image")}
                                disabled={!newUserImage.trim() || loading}
                            />
                        </div>
                    </div>

                    {/* --- Username Section --- */}
                    <div className='section center-column'>
                        <span>
                            Username:
                            <p>{user?.username ?? "..."}</p>
                        </span>
                        <div className='edit-input center'>
                            <TextInput
                                label='New Username'
                                name='username'
                                value={newUsername}
                                onChange={handleInputChange}
                                loading={loading}
                                error={errors.username}
                                autoComplete='off'
                            />
                            <Button
                                label='Update Username'
                                htmlButtonType='button'
                                onClick={(e) => handleSubmit(e, "username")}
                                disabled={!newUsername.trim() || loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserEdit.displayName = "UserEdit"
export default UserEdit
