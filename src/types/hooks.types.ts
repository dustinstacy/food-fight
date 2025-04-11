import { Dispatch, SetStateAction } from 'react'

/**
 * Defines a type for a toggle state tuple, returned by the useToggle hook.
 * Represents [currentState, toggleFunction, setStateFunction].
 */
export type UseToggleReturn = [boolean, () => void, Dispatch<SetStateAction<boolean>>]

/**
 * Describes props for controlling a boolean toggle state, often used for visibility
 * management of UI elements like menus or modals.
 */
export interface UseToggleProps {
  /** The current state of the toggle (true = open/visible, false = closed/hidden). */
  isOpen: boolean

  /**
   * Optional function to directly set the toggle state to a specific value.
   * @param value - The specific boolean value to set the state to.
   */
  setIsOpen?: (value: boolean) => void

  /** Optional function to toggle the state between true and false. */
  toggleIsOpen?: () => void
}
