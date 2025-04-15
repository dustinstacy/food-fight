import { create } from 'zustand'

import { fetchUserFromAccount, createNewUser } from 'api'
import { UserState } from 'types'

/**
 * Zustand store hook for managing the application's current user data and session status.
 *
 * @remarks
 * This store holds the authenticated user's profile information.
 * It provides actions to:
 * - Automatically check for/fetch/create a user based on a wallet address (`checkForUser`)
 * - Manually set the user state (`setUser`), primarily used for logout or direct updates.
 * It also manages a loading flag (`checkingForUser`) during the asynchronous `checkForUser` operation.
 *
 * @see {@link fetchUserFromAccount} - API function used to get existing users.
 * @see {@link createNewUser} - API function used to create new users.
 *
 * @example // Triggering check after wallet connection
 * const { user, checkingForUser } = useUserStore();
 * const { address } = useAccount(); // Wagmi hook
 * const checkUser = useUserStore((state) => state.checkForUser);
 *
 * useEffect(() => {
 * if (address) {
 * checkUser(address);
 * }
 * }, [address, checkUser]);
 *
 * @returns The Zustand store instance conforming to the {@link UserState} interface.
 * (Use selectors or destructuring to access state/actions).
 */
const useUserStore = create<UserState>((set) => ({
  user: null,
  checkingForUser: false,
  setUser: (user) => set({ user: user }),
  checkForUser: async (address: string) => {
    // Indicate loading and reset user state
    set({ checkingForUser: true, user: null })

    // Handle case where no address is provided (e.g., wallet disconnected)
    if (!address) {
      set({ user: null, checkingForUser: false })
      return
    }

    try {
      // Attempt to fetch user from the backend using the provided address
      const user = await fetchUserFromAccount(address)
      if (user) {
        // User found, update state
        set({ user, checkingForUser: false })
      } else {
        // If no user is found, attempt to create a new user
        const newUser = await createNewUser(address)
        // Update state with new user, or null if creation also failed
        set({ user: newUser, checkingForUser: false })
      }
    } catch (error) {
      console.error('Error checking for user:', error) // Log the error for debugging
      set({ user: null, checkingForUser: false }) // Reset user state on error
    }
  },
}))

export default useUserStore
