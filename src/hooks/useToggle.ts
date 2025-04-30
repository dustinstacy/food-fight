'use client'

import { useState } from 'react'

import { UseToggleReturn } from 'hooks/types'

/**
 * Custom hook to manage a boolean toggle state.
 *
 * @param initialState - The initial boolean state of the toggle. Defaults to `false`.
 * @returns A state tuple conforming to {@link UseToggleReturn}:
 * - `[0]` (boolean): The current state (`true` or `false`).
 * - `[1]` (function): A function to toggle the state (`() => void`).
 * - `[2]` (function): The raw state setter from `useState` (`Dispatch<SetStateAction<boolean>>`).
 *
 * @example
 * const [isActive, toggleIsActive, setIsActive] = useToggle(true);
 *
 * return (
 * <>
 * <p>Active: {String(isActive)}</p>
 * <button onClick={toggleIsActive}>Toggle</button>
 * <button onClick={() => setIsActive(false)}>Deactivate</button>
 * </>
 * );
 */
const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = () => {
    setToggleState((prevState) => !prevState)
  }

  return [toggleState, toggle, setToggleState]
}

export default useToggle
