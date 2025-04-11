'use client'

import { useState } from 'react'

import { ToggleState } from 'types'

/**
 * Custom Hook: useToggle
 * A reusable hook that manages a boolean toggle state.
 *
 * @param {boolean} initialState - The initial state of the toggle (default: false).
 * @returns {ToggleState} An (tuple) array containing the toggle state, toggle function, and a manual toggle state setter.
 *
 * @example // Basic usage
 *    const [isOpen, toggleIsOpen, setToggleIsOpen] = useToggle();
 *    - isToggled: The current state of the toggle (true/false).
 *    - toggle: A function to toggle the state between true and false.
 *    - setToggleIsOpen: Set state of isOpen to desired value
 */

const useToggle = (initialState: boolean = false): ToggleState => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = () => {
    setToggleState((prevState) => !prevState)
  }

  return [toggleState, toggle, setToggleState]
}

export default useToggle
