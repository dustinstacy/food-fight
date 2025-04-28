import { Modal } from '@mui/material'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import { Button, TextInput } from 'components'
import { useUpdateUser } from 'features/user/hooks'
import { UsernamePromptModalProps } from 'features/user/types'
import { formatAddress } from 'utils/formatAddress'

import './usernamePromptModal.scss'

/**
 * Renders a modal prompting the user to set a username.
 *
 * @remarks
 * This component is responsible for:
 * - Allowing the user to input a username.
 * - Validating the username input.
 * - Handling form submission.
 * - Displaying loading states and error messages.
 *
 * @param props - Props for the UsernamePromptModal component.
 * @param props.isOpen - Indicates whether the modal is open or closed.
 * @param props.onClose - Callback function when the modal is closed.
 * @param props.defaultUsername - The default username to display in the input field.
 * @param props.currentAddress - The current address of the user.
 */
const UsernamePromptModal = ({ isOpen, onClose, defaultUsername, currentAddress }: UsernamePromptModalProps) => {
  const [username, setUsername] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    mutate: updateUser,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateUser()

  // Set the default username when the modal opens and reset the error message
  useEffect(() => {
    if (isOpen) {
      setUsername(defaultUsername || formatAddress(currentAddress))
      setErrorMessage(null)
    }
  }, [isOpen, defaultUsername, currentAddress])

  // Close the modal when the update is successful
  useEffect(() => {
    if (isUpdateSuccess) {
      onClose()
    }
  }, [isUpdateSuccess, onClose])

  // Handle error messages based on the update status
  useEffect(() => {
    if (isUpdateError && updateError) {
      setErrorMessage(updateError.message || 'Failed to update username.')
    } else {
      setErrorMessage(null)
    }
  }, [isUpdateError, updateError])

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    if (errorMessage) {
      setErrorMessage(null)
    }
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const trimmedUsername = username.trim()
      if (!trimmedUsername) {
        setErrorMessage('Username cannot be empty.')
        return
      }
      if (trimmedUsername.length < 3) {
        setErrorMessage('Username must be at least 3 characters long.')
        return
      }

      setErrorMessage(null)
      console.log(`Attempting to update username to: ${trimmedUsername}`)
      updateUser({ property: 'username', value: trimmedUsername })
    },
    [username, updateUser]
  )

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='username-prompt-title'
      aria-describedby='username-prompt-description'
      className='modal'
    >
      <div className='modal__content background'>
        <h2 id='username-prompt-title' className='modal__header lilita-one'>
          Choose Your Username
        </h2>

        <form onSubmit={handleSubmit}>
          <TextInput
            label='Username'
            name='username'
            value={username}
            onChange={handleUsernameChange}
            error={errorMessage || undefined}
            loading={isUpdating}
            autoComplete='username'
          />

          <div className='modal__form-actions'>
            <Button
              label={isUpdating ? 'Saving...' : 'Save'}
              htmlButtonType='submit'
              disabled={isUpdating || !username.trim()}
              className='modal__button'
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default UsernamePromptModal
