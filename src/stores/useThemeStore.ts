import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Theme, ThemeState } from 'types'

/**
 * Determines the preferred theme based on system settings (prefers-color-scheme).
 * @returns {'light' | 'dark'} The preferred theme.
 */
const getSystemPreference = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

/**
 * Applies the correct theme class ('light-theme' or 'dark-theme') to the
 * root <html> element and removes the other.
 * @param {'light' | 'dark'} theme - The theme to apply.
 */
const applyThemeClass = (theme: Theme) => {
  if (typeof window !== 'undefined' && theme) {
    const root = document.documentElement
    root.classList.remove('light-theme', 'dark-theme')
    root.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme')
  }
}

/**
 * Zustand store hook for managing the application's visual theme.
 *
 * This store manages the current theme state ('light' or 'dark'), provides actions
 * (`setTheme`, `toggleTheme`) to modify it, and utilizes middleware (`persist`)
 * to save the user's preference to localStorage under the key 'theme-storage'.
 *
 * On initial load, it attempts to hydrate from localStorage, falling back to the user's
 * system preference (`prefers-color-scheme`) if no preference is stored.
 *
 * @returns {ThemeState} The theme store object containing state and actions.
 * @property {Theme} theme - The current active theme ('light' | 'dark').
 * @property {(newTheme: Theme) => void} setTheme - Action to explicitly set the theme.
 * @property {() => void} toggleTheme - Action to toggle the theme between 'light' and 'dark'.
 *
 * @example // Basic usage in a component
 * const { theme, toggleTheme } = useThemeStore();
 * const isDarkMode = theme === 'dark';
 * ... use isDarkMode and/or toggleTheme in JSX ...
 */
export const useThemeStore = create<ThemeState>()(
  // Use persist middleware for localStorage persistence
  persist(
    (set, get) => ({
      // Set initial state based on system preference.
      // persist middleware will override this with the value from localStorage if it exists on hydration.
      theme: getSystemPreference(),

      // Action to explicitly set the theme
      setTheme: (newTheme) => {
        applyThemeClass(newTheme)
        set({ theme: newTheme })
      },

      // Action to toggle between light/dark theme
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        applyThemeClass(newTheme)
        set({ theme: newTheme })
      },
    }),
    {
      // Configuration for the persist middleware
      name: 'theme-storage', // Key used in localStorage
      storage: createJSONStorage(() => localStorage),
      // Only persist the 'theme' property, excluding actions from storage.
      partialize: (state) => ({ theme: state.theme }),
      // Function called after state is rehydrated from storage.
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeClass(state.theme)
        }
      },
    }
  )
)

// Apply the theme class immediately when the store module loads on the client.
// This helps prevent a potential theme flicker.
if (typeof window !== 'undefined') {
  applyThemeClass(useThemeStore.getState().theme)
}

export default useThemeStore
