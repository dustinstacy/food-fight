import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Theme, ThemeState } from 'types'

/**
 * Determines the preferred theme based on system settings (prefers-color-scheme).
 * Checks client-side media query.
 * @returns The preferred theme ('light' or 'dark'), defaulting to 'light'.
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
 * @param theme - The theme to apply.
 */
const applyThemeClass = (theme: Theme) => {
  if (typeof window !== 'undefined' && theme) {
    const root = document.documentElement
    root.classList.remove('light-theme', 'dark-theme')
    root.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme')
  }
}

/**
 * Zustand store hook for managing the application's visual theme ('light'/'dark').
 *
 * @remarks
 * This store handles the current theme state, provides actions (`setTheme`, `toggleTheme`)
 * to modify it, and uses the `persist` middleware to save the preference to
 * localStorage (under the 'theme-storage' key).
 *
 * The initial state defaults to the user's system preference (`prefers-color-scheme`)
 * if no valid preference is found in localStorage during hydration.
 *
 * @example
 * const theme = useThemeStore((state) => state.theme);
 * const toggleTheme = useThemeStore((state) => state.toggleTheme);
 * // OR: const { theme, toggleTheme } = useThemeStore();
 *
 * return <button onClick={toggleTheme}>Current: {theme}</button>;
 *
 * @returns The Zustand store instance conforming to the {@link ThemeState} interface.
 */
export const useThemeStore = create<ThemeState>()(
  // Use persist middleware for localStorage persistence
  persist(
    (set, get) => ({
      // Set initial state based on system preference
      // persist middleware will override this with the value from localStorage if it exists on hydration
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
      // Only persist the 'theme' property, excluding actions from storage
      partialize: (state) => ({ theme: state.theme }),
      // Function called after state is rehydrated from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeClass(state.theme)
        }
      },
    }
  )
)

// Apply the theme class immediately when the store module loads on the client
// This helps prevent a potential theme flicker
if (typeof window !== 'undefined') {
  applyThemeClass(useThemeStore.getState().theme)
}

export default useThemeStore
