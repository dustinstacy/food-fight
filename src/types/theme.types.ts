/**
 * Defines the available themes for the application.
 */
export type Theme = 'light' | 'dark'

/**
 * @interface ThemeState Defines the structure of the theme state.
 * @property {Theme} theme - The current theme, either 'light' or 'dark'.
 * @property {(theme: Theme) => void} setTheme - Function to set the theme.
 * @param theme - The theme to set.
 * @property {() => void} toggleTheme - Function to toggle between light and dark themes.
 */
export interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}
