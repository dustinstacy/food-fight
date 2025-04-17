import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Theme, ThemeActions, ThemeState } from 'types'

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

type ThemeStore = ThemeState & ThemeActions

/**
 * Zustand store hook for managing the application's visual theme ('light'/'dark').
 *
 * @remarks
 * This store handles the current theme state.
 * It provides actions to:
 * - Set the theme explicitly (`setTheme`).
 * - Toggle the theme between 'light' and 'dark' (`toggleTheme`).
 * It also persists the theme state in localStorage using Zustand's `persist` middleware.
 */
export const useThemeStore = create<ThemeStore>()(
  // Use persist middleware for localStorage persistence
  persist(
    (set, get) => ({
      // Initial state
      theme: getSystemPreference(),

      // Actions
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
