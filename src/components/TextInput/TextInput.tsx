'use client'

import React, { forwardRef, useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

import type { TextInputProps } from 'types'
import { classSet } from 'utils'
import './textInput.scss'

const DEFAULT_TYPE = 'text'
const DEFAULT_LOADING = false

/**
 * Renders a controlled text input component with a floating label effect.
 *
 * @remarks
 * - Includes an optional visibility toggle icon button when `type` is "password".
 * - Handles `loading` state by disabling the input and toggle button.
 * - Displays error styling and an optional message based on the `error` prop.
 * - Uses the `classSet` utility to conditionally apply CSS classes based on props.
 *
 * @param props - Props conforming to the {@link TextInputProps} interface.
 * @param ref - Forwarded ref applied to the underlying HTML `<input>` element.
 * @returns The TextInput component JSX, wrapped in a `div`.
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, value, onChange, type = DEFAULT_TYPE, loading = DEFAULT_LOADING, error, autoComplete }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const isPasswordInput = type === 'password'
    const actualInputType = isPasswordInput ? (isPasswordVisible ? 'text' : 'password') : type

    const togglePasswordVisibility = () => {
      if (loading) return
      setIsPasswordVisible((prevState) => !prevState)
    }

    const rootClasses = classSet('text-input', error ? 'has-error' : '', isPasswordInput ? 'has-password-toggle' : '')
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
