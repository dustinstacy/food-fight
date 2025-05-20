import type React from 'react'

import { User } from 'features/user/types'

/////////////////////////////////////////////////////
/// Avatar Types                                  ///
/////////////////////////////////////////////////////

/**
 * Defines the size variants for the Avatar component.
 */
export type AvatarSize = 'small' | 'medium' | 'large'

/**
 * Defines props accepted by the Avatar component.
 */
export interface AvatarProps {
  /** The user object containing the avatar image URL. */
  user: User | null | undefined

  /** Specifies the visual size variant ('small', 'medium', 'large'). */
  size?: AvatarSize

  /** Optional CSS class name(s) to apply to the wrapper `div` element. */
  className?: string

  /**
   * Optional callback function executed when the avatar is clicked or activated
   * via keyboard (Enter/Space).
   */
  onClick?: () => void

  /**
   * Indicates if the avatar is in a loading state.
   */
  isLoading?: boolean
}

//////////////////////////////////////////////////////
/// Button Types                                   ///
//////////////////////////////////////////////////////

/**
 * Defines props accepted by the Button component.
 */
export interface ButtonProps {
  /** The text content displayed within the button. */
  label: string

  /** Optional CSS class name(s) to apply to the root element for custom styling. */
  className?: string

  /** If provided, the component renders as a Next.js `<Link>` targeting this URL path. */
  path?: string

  /**
   * Callback function executed on click events.
   * @param event - The React mouse event.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void

  /**
   * If true, disables interaction, applies disabled styles,
   * and sets appropriate ARIA/HTML attributes.
   */
  disabled?: boolean

  /**
   * Specifies the underlying HTML button's `type` attribute.
   * Only applicable when the component renders as a `<button>` (i.e., no `path` provided).
   */
  htmlButtonType?: 'button' | 'submit' | 'reset'
}

//////////////////////////////////////////////////////
/// LoadingText Types                              ///
//////////////////////////////////////////////////////

/**
 * Defines the size variants for the LoadingText component.
 */
export type LoadingTextSize = 'small' | 'medium' | 'large'

/**
 * Defines props accepted by the LoadingText component.
 */
export interface LoadingTextProps {
  /** The base text content to display before the animated dots. */
  text: string

  /** Specifies the size variant which affects the font size via CSS class (`loading-text-${size}`). */
  size?: LoadingTextSize

  /** Optional CSS class name(s) to apply to the root paragraph element. */
  className?: string
}

////////////////////////////////////////////////////////
/// MessageBox Types                                 ///
////////////////////////////////////////////////////////

/**
 * Defines props accepted by the MessageBox component.
 */
export interface MessageBoxProps {
  /** The children elements to be rendered inside the message box. */
  children: React.ReactNode
}

////////////////////////////////////////////////////////
/// TextInput Types                                  ///
////////////////////////////////////////////////////////

/**
 * Defines props accepted by the TextInput component.
 */
export interface TextInputProps {
  /** The text for the floating label associated with the input. */
  label: string

  /** The `name` attribute for the input field. Also used for `id` and label `htmlFor`. */
  name: string

  /** The current value of the input. */
  value: string

  /**
   * Callback function executed when the input value changes.
   * @param event - The React change event from the input element.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void

  /** The HTML `type` attribute for the input field (e.g., "text", "password", "email"). */
  type?: string

  /** If true, visually disables the input field and prevents user interaction. */
  loading?: boolean

  /** Indicates an error state. */
  error?: string | boolean

  /** Sets the `autoComplete` attribute for the input field, influencing browser autofill behavior. */
  autoComplete?: string
}
