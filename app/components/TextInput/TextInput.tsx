import { classSet } from "utils"

import "./textInput.scss"

interface TextInputProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    loading: boolean
    autoFocus?: boolean
    autoComplete?: string
}

// A reusable component that represents a text input field with optional password visibility toggle.
// label: The label text for the input field.
// name: The name attribute for the input field.
// value: The current value of the input field.
// onChange: The event handler function for the onChange event.
// loading: Indicates whether the input field is in a loading state.
// autofocus: Indicates whether the input field should be autofocused.
const TextInput = ({ label, name, value, onChange, loading, autoFocus, autoComplete }: TextInputProps) => {
    const inputClasses = classSet("input", value && "has-content")

    return (
        <div className='text-input'>
            <input
                id={name}
                className={inputClasses}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                disabled={loading}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
            />
            <label htmlFor={name}>{label}</label>
            <span className='focus-border'>
                <i />
            </span>
        </div>
    )
}

export default TextInput
