import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Theme, ThemeStore } from '../types'

/**
 * Determines the preferred theme based on system settings (prefers-color-scheme).
 *
 * @returns The preferred theme ('light' or 'dark'), defaulting to 'light'.
 */
const getSystemPreference = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

/**
 * Applies the correct theme class to the root <html> element and removes the other.
 *
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
 * Zustand store hook for managing the application's visual theme.
 *
 * @remarks
 * This store is responsible for:
 * - Storing the current theme in localStorage.
 * - Providing actions to set and toggle the theme.
 * - Applying the theme class to the <html> element.
 * - Automatically determining the system's preferred theme on initial load.
 */
export const useThemeStore = create<ThemeStore>()(
  // Use persist middleware for localStorage persistence
  persist(
    (set, get) => ({
      theme: getSystemPreference(),

      setTheme: (newTheme) => {
        applyThemeClass(newTheme)
        set({ theme: newTheme })
      },

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        applyThemeClass(newTheme)
        set({ theme: newTheme })
      },
    }),
    {
      // Configuration for the persist middleware
      name: 'theme-storage',
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
if (typeof window !== 'undefined') {
  applyThemeClass(useThemeStore.getState().theme)
}

export default useThemeStore
