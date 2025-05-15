import { ReactNode } from 'react'

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
/// Global Notification Types                     ///
/////////////////////////////////////////////////////

/**
 * Defines the props accepted by the GlobalNotification component.
 */
export interface GlobalNotificationProps {
  /** The ARIA label for the modal, used for accessibility. */
  ariaLabel: string

  /** The ARIA description for the modal, used for accessibility. */
  ariaDescription: string
}

/**
 * Defines the state and actions for managing global notifications.
 */
export interface NotificationState {
  /** Indicates whether the modal is currently open. */
  isOpen: boolean

  /** The content to be displayed inside the modal. */
  content: ReactNode | null

  /** The props for the modal, including ARIA labels and descriptions. */
  modalProps: GlobalNotificationProps

  /** Callback function to open the modal with specific content and props. */
  openModal: (content: ReactNode, props?: GlobalNotificationProps) => void

  /** Callback function to update the content of the currently open modal. */
  updateContent: (newContent: ReactNode) => void

  /** Callback function to close the modal. */
  closeModal: () => void
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
