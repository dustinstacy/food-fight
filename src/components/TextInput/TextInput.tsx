'use client'

import React, { forwardRef, useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

import { classSet } from 'utils'

import type { TextInputProps } from '../types'
import './textInput.scss'

const DEFAULT_TYPE = 'text'
const DEFAULT_LOADING = false

/**
 * Renders a controlled text input component with a floating label effect.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying a text input field with a label that floats when the input is focused or has content.
 * - Optionally displaying a password visibility toggle button for password inputs.
 * - Handling loading state to disable user interaction.
 * - Displaying error messages when validation fails.
 *
 * @param props - Props conforming to the {@link TextInputProps} interface.
 * @param props.label - The label for the input field.
 * @param props.name - The name attribute for the input field.
 * @param props.value - The current value of the input field.
 * @param props.onChange - Callback function to handle input value changes.
 * @param props.type - The type of the input field (e.g., 'text', 'password'). Defaults to 'text'.
 * @param props.loading - Boolean indicating whether the input is in a loading state. Defaults to false.
 * @param props.error - Error message to display when validation fails.
 * @param props.autoComplete - The autoComplete attribute for the input field.
 * @param ref - Forwarded ref applied to the underlying HTML `<input>` element.
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      name,
      value,
      onChange,
      type = DEFAULT_TYPE,
      loading = DEFAULT_LOADING,
      error,
      autoComplete,
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const isPasswordInput = type === 'password'
    const actualInputType = isPasswordInput ? (isPasswordVisible ? 'text' : 'password') : type

    const togglePasswordVisibility = () => {
      if (loading) return
      setIsPasswordVisible((prevState) => !prevState)
    }

    const rootClasses = classSet(
      'text-input',
      error ? 'has-error' : '',
      isPasswordInput ? 'has-password-toggle' : ''
    )
    const inputClasses = classSet('input', value && 'has-content')

    const inputId = name // Use name as ID for label association
    const errorId = error && typeof error === 'string' ? `${inputId}-error` : undefined

    return (
      <div className={rootClasses}>
        <input
          id={inputId}
          className={inputClasses}
          name={name}
          value={value}
          onChange={onChange}
          disabled={loading}
          type={actualInputType}
          ref={ref}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
        <label htmlFor={inputId}>{label}</label>
        <span className='focus-border'>
          <i />
        </span>

        {/* Password Visibility Toggle Button */}
        {isPasswordInput && (
          <button
            type='button'
            className='password-toggle-btn'
            onClick={togglePasswordVisibility}
            disabled={loading}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
          </button>
        )}

        {/* Error Message Display */}
        {errorId && (
          <span id={errorId} className='error-message'>
            {error}
          </span>
        )}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
export default TextInput
