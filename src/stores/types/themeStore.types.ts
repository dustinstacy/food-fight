/////////////////////////////////////////////////////////
/// Theme Store Types                                 ///
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
