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

/////////////////////////////////////////////////////////
/// User Hooks Types                                  ///
/////////////////////////////////////////////////////////

/**
 * Defines a user profile within the application.
 * */
export interface User {
  /** The user's unique wallet address.  */
  address: string

  /** The user's chosen display name. */
  username: string

  /** The date string representing when the user account was first created in the system. */
  createdAt: string

  /** URL pointing to the user's avatar/profile image. */
  image: string
}

/**
 * Defines the structure for variables passed to the useUpdateUser mutation.
 * Based on the `updateUser` API function.
 */
export type UpdateUserVariables<T extends keyof User = keyof User> = {
  /** The property of the User object to be updated. */
  property: T

  /** The new value for the specified property. */
  value: User[T]
}
