import { create } from 'zustand'

import { fetchUserFromAccount } from 'api'
import { UserActions, UserState } from 'types'

type UserStore = UserState & UserActions

/**
 * Zustand store hook for managing the application's current user data and session status.
 *
 * @remarks
 * This store holds the authenticated user's profile information.
 * It provides actions to:
 * - Manually set the user state (`setUser`), primarily used for logout or direct updates.
 * - Check for an existing user (`checkForUser`), which attempts to fetch the user from the API.
 * It also manages a loading flag (`checkingForUser`) during the asynchronous `checkForUser` operation.
 */
const useUserStore = create<UserStore>((set) => ({
  // Initial state
  user: null,
  checkingForUser: false,

  // Actions
  setUser: (user) => set({ user: user }),
  checkForUser: async () => {
    set({ checkingForUser: true, user: null })
    try {
      const user = await fetchUserFromAccount()
      console.log('checkForUser: User fetched successfully', user)
      set({ user, checkingForUser: false })
    } catch (error) {
      console.error('Error fetching user data:', error)
      set({ user: null, checkingForUser: false })
    }
  },
}))

export default useUserStore
