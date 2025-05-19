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

/////////////////////////////////////////////////////////
/// User Store Types                                 ///
/////////////////////////////////////////////////////////

/**
 * Defines the available themes for the application.
 */
export type Theme = 'light' | 'dark'

/**
 * Defines the structure of the theme state.
 */
export interface ThemeState {
  /** The current active theme. */
  theme: Theme
}

/**
 * Defines the actions available for managing the theme state.
 */
export interface ThemeActions {
  /**
   * Action to explicitly set the application theme.
   * @param newTheme - The theme to activate ('light' or 'dark').
   */
  setTheme: (theme: Theme) => void

  /** Action to toggle the application theme between 'light' and 'dark'. */
  toggleTheme: () => void
}

/**
 * Defines the complete structure of the theme store, combining state and actions.
 */
export type ThemeStore = ThemeState & ThemeActions
