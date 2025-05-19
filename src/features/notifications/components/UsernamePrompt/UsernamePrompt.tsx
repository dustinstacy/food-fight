import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import { Button, TextInput } from 'components'
import { UsernamePromptProps } from 'features/notifications'
import { useUpdateUser } from 'features/user/hooks'
import { formatAddress } from 'utils/formatAddress'

import './usernamePrompt.scss'

/**
 * Renders a modal prompting the user to set a username.
 *
 * @remarks
 * This component is responsible for:
 * - Allowing the user to input a username.
 * - Validating the username input.
 * - Handling form submission.
 * - Handling success and error states.
 *
 * @param props - Props for the UsernamePromptModal component.
 * @param props.currentAddress - The current address of the user.
 * @param props.onSuccess - Callback function to be called when the username is successfully updated.
 */
const UsernamePrompt = ({ currentAddress, onSuccess }: UsernamePromptProps) => {
  const [username, setUsername] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    mutate: updateUser,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateUser()

  // Effect 1. Set the initial username based on the current address
  useEffect(() => {
    setUsername(formatAddress(currentAddress))
    setErrorMessage(null)
  }, [currentAddress])

  // Effect 2. Call onSuccess callback when the update is successful
  useEffect(() => {
    if (isUpdateSuccess) {
      onSuccess()
    }
  }, [isUpdateSuccess, onSuccess])

  // Effect 3. Handle error messages based on the update status
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
    <div className='username-prompt'>
      <h2 className='username-prompt__title lilita-one'>Choose Your Username</h2>

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
  )
}

export default UsernamePrompt
