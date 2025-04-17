import { Dispatch, SetStateAction } from 'react'

/** Defines the props for the UserEdit component.*/
export interface UserEditProps {
  /** Function to set the editing state. */
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

/** Defines the structure of the error messages for the UserEdit component. */
export interface UserEditErrors {
  /** Error message for the image input. */
  image: string
  /** Error message for the username input. */
  username: string
}
