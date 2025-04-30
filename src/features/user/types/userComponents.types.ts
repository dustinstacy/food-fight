/////////////////////////////////////////////////
/// User Component Types                      ///
/////////////////////////////////////////////////

/**
 * Defines props accepted by the UsernamePromptModal
 */
export interface UsernamePromptModalProps {
  /** Indicates whether the modal is open or closed */
  isOpen: boolean

  /** Callback function when the modal is closed */
  onClose: () => void

  /** Callback function to handle the submission of the username */
  defaultUsername: string

  /** The current address of the user */
  currentAddress: string
}
