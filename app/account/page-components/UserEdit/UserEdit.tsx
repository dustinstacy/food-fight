'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

import { UserEditErrors, UserEditProps } from '@account/types'
import { Avatar, Button, TextInput } from 'components'
import { useCurrentUser, useUpdateUser } from 'features/user/hooks'

/**
 * Renders the user edit profile component.
 *
 * @remarks
 * This component is responsible for:
 * - Allowing the user to edit their profile image and username.
 * - Handling input changes and form submission.
 * - Displaying loading states and error messages.
 *
 * @param props - Props for the UserEdit component.
 * @param props.setIsEditing - Function to signal closing the edit view. (Required)
 */
const UserEdit = ({ setIsEditing }: UserEditProps) => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const {
    mutate: updateUserMutate,
    isPending: isUpdatePending,
    error: updateError,
    reset: resetMutation,
  } = useUpdateUser()

  const [newUserImage, setNewUserImage] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [validationErrors, setValidationErrors] = useState<UserEditErrors>({
    image: '',
    username: '',
  })

  useEffect(() => {
    if (user) {
      setNewUsername(user.username || '')
    }
  }, [user])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Clear error only for the specific field being changed
    setValidationErrors((prev) => ({ ...prev, [name]: '' }))

    // Update the corresponding state based on input name
    if (name === 'image') {
      setNewUserImage(value)
    } else if (name === 'username') {
      setNewUsername(value)
    }

    // Reset mutation state if the input is changed
    resetMutation()
  }

  const handleSubmit = (field: 'image' | 'username') => {
    if (isUpdatePending) return
    if (!user) {
      console.error('Cannot update: User data not loaded.')
      return
    }

    const valueToSubmit = field === 'image' ? newUserImage : newUsername
    const currentValue = field === 'image' ? user.image : user.username

    // Validate the input
    if (!valueToSubmit || valueToSubmit.trim().length === 0) {
      setValidationErrors((prev) => ({ ...prev, [field]: 'Input cannot be empty.' }))
      return
    }
    if (valueToSubmit.trim() === currentValue) {
      setValidationErrors((prev) => ({ ...prev, [field]: 'No changes detected.' }))
      return
    }

    setValidationErrors({ image: '', username: '' })
    resetMutation()

    console.log(`Submitting update for ${field}:`, valueToSubmit.trim())

    // Call the mutation function with the field and value
    updateUserMutate(
      { property: field, value: valueToSubmit.trim() },
      {
        // Optional: onSuccess/onError callbacks specific to this mutation call
        onSuccess: (updatedData) => {
          console.log(`${field} updated via mutation hook!`)
          setIsEditing(false)
          if (field === 'image') setNewUserImage(updatedData?.image || '')
          if (field === 'username') setNewUsername(updatedData?.username || '')
        },
        onError: (error) => {
          setValidationErrors((prev) => ({ ...prev, [field]: error.message || 'Update failed' }))
        },
      }
    )
  }

  if (isUserLoading) {
    return <div>Loading user data...</div>
  }

  return (
    <div>
      {/* --- Close Button --- */}
      <button
        type='button'
        className='edit'
        onClick={() => setIsEditing(false)}
        aria-label='Close edit profile'
        disabled={isUpdatePending}
      >
        <IoMdCloseCircle />
      </button>
      <div className='wrapper center-column'>
        {/* --- Image Section --- */}
        <div className='section center-column'>
          <Avatar size='medium' />
          <div className='edit-input center-column'>
            <TextInput
              label='Image URL'
              name='image'
              value={newUserImage}
              onChange={handleInputChange}
              loading={isUpdatePending}
              error={validationErrors.image}
              autoComplete='off'
            />
            <Button
              label='Update Image'
              htmlButtonType='button'
              onClick={() => handleSubmit('image')}
              disabled={
                !newUserImage?.trim() || isUpdatePending || newUserImage.trim() === user?.image
              }
            />
          </div>
        </div>

        {/* --- Username Section --- */}
        <div className='section center-column'>
          <span>
            Username:
            <p>{user?.username ?? '...'}</p>
          </span>
          <div className='edit-input center-column'>
            <TextInput
              label='New Username'
              name='username'
              value={newUsername}
              onChange={handleInputChange}
              loading={isUpdatePending}
              error={validationErrors.username}
              autoComplete='off'
            />
            <Button
              label='Update Username'
              htmlButtonType='button'
              onClick={() => handleSubmit('username')}
              disabled={
                !newUsername?.trim() || isUpdatePending || newUsername.trim() === user?.username
              }
            />
          </div>
        </div>

        {/*!! Error Message? */}
        {updateError && !validationErrors.image && !validationErrors.username && (
          <p style={{ color: 'red', marginTop: '10px' }}>{updateError.message}</p>
        )}
      </div>
    </div>
  )
}

UserEdit.displayName = 'UserEdit'
export default UserEdit
