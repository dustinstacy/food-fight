"use client"

import React, { forwardRef, useState } from "react"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"
import { classSet } from "utils"
import "./textInput.scss"

/////////////////////////////////////////////
/// Types                                 ///
/////////////////////////////////////////////

/**
 * @interface
 * Defines the props for the TextInput component.
 *
 * @property {string} label - The label text displayed for the input field (used for floating label). (Required)
 * @property {string} name - The unique name attribute for the input field, also used for id and label htmlFor. (Required)
 * @property {string} value - The current value of the input field (controlled component). (Required)
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Callback function executed when the input value changes. (Required)
 * @property {string} [type='text'] - Specifies the HTML input type (e.g., "text", "password", "email"). Defaults to "text". Enables password toggle if "password".
 * @property {boolean} [loading=false] - If true, disables the input field and any interactive elements like the password toggle.
 * @property {string | boolean} [error] - If true applies error styling. If a string, also displays the string as an error message below the input.
 * @property {boolean} [autoFocus=false] - If true, the input field will automatically receive focus on mount.
 * @property {string} [autoComplete] - Sets the autoComplete attribute for the input field, controlling browser autofill behavior.
 */
interface TextInputProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    loading?: boolean
    error?: string | boolean
    autoFocus?: boolean
    autoComplete?: string
}

/////////////////////////////////////////////
/// Constants                             ///
/////////////////////////////////////////////

const DEFAULT_TYPE = "text"
const DEFAULT_LOADING = false

/////////////////////////////////////////////
/// Component                             ///
/////////////////////////////////////////////

/**
 * @component
 * Renders a reusable text input field with a floating label effect.
 * Includes optional error display and an icon button to toggle password visibility.
 *
 * @notice Requires `react-icons` for the password visibility toggle icons.
 *
 * @remarks
 * - The component is designed to be a controlled input, meaning the value is managed externally via the `value` and `onChange` props.
 * - The `error` prop can be a boolean or a string. If a string, it will be displayed as an error message below the input.
 * - Rendering logic:
 *   - If `type` is "password", a toggle button is displayed to show/hide the password.
 *   - If 'type' is "text", the input behaves as a standard text input.
 *   - If an error is provided, the error message is displayed below the input.
 *
 * @param {TextInputProps} props - The props for the TextInput component.
 * @param {string} props.label - (Required) The label text.
 * @param {string} props.name - (Required) The name/ID for the input and label association.
 * @param {string} props.value - (Required) The controlled input value.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - (Required) Input change handler.
 * @param {string} [props.type='text'] - Input type. If "password", enables visibility toggle.
 * @param {boolean} props.loading - Disables the input and toggle if true.
 * @param {string | boolean} [props.error] - Applies error styles and optionally displays an error message.
 * @param {boolean} [props.autoFocus] - If true, focuses the input on mount.
 * @param {string} [props.autoComplete] - Sets the input's autoComplete attribute.
 * @param {React.ForwardedRef<HTMLInputElement>} ref - Forwarded ref to the underlying HTMLInputElement.
 *
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
            autoFocus,
            autoComplete,
        },
        ref
    ) => {
        ////////////////////////////////////////////
        /// State                                ///
        ////////////////////////////////////////////

        const [isPasswordVisible, setIsPasswordVisible] = useState(false)

        ////////////////////////////////////////////
        /// Variables                            ///
        ////////////////////////////////////////////

        const isPasswordInput = type === "password"
        const actualInputType = isPasswordInput
            ? isPasswordVisible
                ? "text" // Show password
                : "password" // Hide password
            : type // Use original type if not password

        ////////////////////////////////////////////
        /// Functions                            ///
        ////////////////////////////////////////////

        const togglePasswordVisibility = () => {
            if (loading) return
            setIsPasswordVisible((prevState) => !prevState)
        }

        ////////////////////////////////////////////
        /// Render                               ///
        ////////////////////////////////////////////

        const rootClasses = classSet(
            "text-input",
            error ? "has-error" : "",
            isPasswordInput ? "has-password-toggle" : ""
        )
        const inputClasses = classSet("input", value && "has-content")

        const inputId = name // Use name as ID for label association
        const errorId = error && typeof error === "string" ? `${inputId}-error` : undefined

        return (
            <div className={rootClasses}>
                <input
                    id={inputId}
                    className={inputClasses}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={loading}
                    type={actualInputType} // Use state-derived type for password toggle
                    ref={ref}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    aria-invalid={!!error} // Indicate invalid state to screen readers
                    aria-describedby={errorId} // Link to error message if present
                />
                <label htmlFor={inputId}>{label}</label>
                <span className='focus-border'>
                    <i />
                </span>

                {/* --- Password Visibility Toggle Button --- */}
                {isPasswordInput && (
                    <button
                        type='button'
                        className='password-toggle-btn'
                        onClick={togglePasswordVisibility}
                        disabled={loading}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                        {isPasswordVisible ? (
                            <MdOutlineVisibilityOff /> // Icon for "Hide Password" action
                        ) : (
                            <MdOutlineVisibility /> // Icon for "Show Password" action
                        )}
                    </button>
                )}

                {/* --- Error Message Display --- */}
                {errorId && (
                    <span id={errorId} className='error-message'>
                        {error}
                    </span>
                )}
            </div>
        )
    }
)

TextInput.displayName = "TextInput"
export default TextInput
