/////////////////////////////////////////////////////
/// Custom Modal Types                            ///
/////////////////////////////////////////////////////

/**
 * Defines the props accepted by the CustomModal component.
 */
export interface CustomModalProps {
  /** Indicates whether the modal is currently open. */
  isOpen: boolean

  /** Callback function executed when the modal is closed. */
  onClose: () => void

  /** The ARIA label for the modal, used for accessibility. */
  ariaLabel: string

  /** The ARIA description for the modal, used for accessibility. */
  ariaDescription: string

  /** The content to be displayed inside the modal. */
  children: React.ReactNode
}

/////////////////////////////////////////////////////
/// Username Prompt Types                         ///
/////////////////////////////////////////////////////

/**
 * Defines props accepted by the UsernamePrompt
 */
export interface UsernamePromptProps {
  /** The user's current wallet address */
  currentAddress: string

  /** Callback function on successful update */
  onSuccess: () => void
}
