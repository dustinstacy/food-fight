import { create } from 'zustand'

import { fetchUserFromAccount, createNewUser } from 'api'
import { UserState } from 'types'

/**
 * Zustand store hook for managing the application's current user data and session status.
 *
 * This store holds the authenticated user's profile information (`User` object) or null
 * if no user is logged in or found. It provides actions to check for a user on the
 * backend based on their wallet address (`checkForUser`), attempting to fetch existing
 * data or create a new user record via the API. It also includes a loading state
 * (`checkingForUser`) and an action to manually set the user (`setUser`).
 *
 * @returns {UserState} The user store object containing state and actions.
 * @property {User | null} user - The current user object, or null if none is loaded/found.
 * @property {boolean} checkingForUser - Indicates if an asynchronous check (fetch/create) is in progress.
 * @property {(user: User | null) => void} setUser - Manually sets the user state.
 * @property {(address: string) => Promise<void>} checkForUser - Initiates the process to fetch or create a user based on the provided wallet address, updating state accordingly. Handles errors internally.
 *
 * @example // Triggering check after wallet connection
 * const { user, checkingForUser } = useUserStore();
 * const { address } = useWallet(); // Assuming a wallet hook
 * const checkUser = useUserStore((state) => state.checkForUser);
 *
 * useEffect(() => {
 * if (address) {
 *    checkUser(address);
 *    }
 * }, [address, checkUser]);
 */
const useUserStore = create<UserState>((set) => ({
  user: null,
  checkingForUser: false,
  setUser: (user) => set({ user: user }),
  checkForUser: async (address: string) => {
    // Indicate loading and reset user state
    set({ checkingForUser: true, user: null })

    if (!address) {
      set({ user: null, checkingForUser: false })
      return
    }

    try {
      // Attempt to fetch user from the backend using the provided address
      const user = await fetchUserFromAccount(address)
      if (user) {
        set({ user, checkingForUser: false })
      } else {
        // If no user is found, attempt to create a new user
        const newUser = await createNewUser(address)
        set({ user: newUser, checkingForUser: false })
      }
    } catch (error) {
      console.error('Error checking for user:', error)
      set({ user: null, checkingForUser: false })
    }
  },
}))

export default useUserStore
