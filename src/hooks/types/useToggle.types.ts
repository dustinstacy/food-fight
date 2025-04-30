////////////////////////////////////////////////
/// useToggle Types                          ///
////////////////////////////////////////////////

import { Dispatch, SetStateAction } from 'react'

/**
 * Defines a type for a toggle state tuple, returned by the useToggle hook.
 * Represents [currentState, toggleFunction, setStateFunction].
 */
export type UseToggleReturn = [boolean, () => void, Dispatch<SetStateAction<boolean>>]

/**
 * Defines props for controlling a boolean toggle state.
 */
export interface UseToggleProps {
  /** The current state of the toggle. */
  toggleState: boolean

  /** Optional function to toggle the state between true and false. */
  toggle?: () => void

  /**
   * Optional function to directly set the toggle state to a specific value.
   * @param value - The specific boolean value to set the state to.
   */
  setToggleState?: (value: boolean) => void
}
