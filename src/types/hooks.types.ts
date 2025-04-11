/**
 * Defines a type for a toggle state, typically used in useToggle hook.
 */
export type ToggleState = [boolean, () => void, (state: boolean) => void]

/**
 * @interface HandleToggle Defines props for controlling a boolean toggle state.
 * Typically passed to components that need to manage visibility (e.g., menus, modals)
 * @property {boolean} isOpen - The current state of the toggle (true for open/visible, false for closed/hidden).
 * @property {() => void} [toggleIsOpen] - Optional function to toggle the state between true and false.
 * @property {(value: boolean) => void} [setIsOpen] - Optional function to directly set the toggle state to a specific value.
 * @param value - The boolean value to set the toggle state to.
 */
export interface HandleToggle {
  isOpen: boolean
  toggleIsOpen?: () => void
  setIsOpen?: (value: boolean) => void
}
