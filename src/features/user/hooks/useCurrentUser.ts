import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { fetchUserFromAccount } from 'api'
import { User } from 'features/user/types'
import { useAuthStore } from 'stores'

/** Factory function to create unique query keys for user data */
const userKeys = {
  currentUser: (address: string | undefined) => ['currentUser', address] as const,
}

/**
 * Custom hook to fetch the current authenticated user's profile data.
 *
 * @remarks
 *  This hook is resposible for:
 * - Fetching the current user's profile data from the server.
 * - Handling the loading and error states.
 * - Returning the user data or null if not authenticated.
 *
 * @returns An object containing:
 * - `data`: The fetched user data (User | null) or undefined while loading/error.
 * - `isLoading`: A boolean indicating if the data is currently being loaded.
 * - `isFetching`: A boolean indicating if the data is currently being fetched.
 * - `isError`: A boolean indicating if there was an error fetching the data.
 * - `error`: The error object if there was an error fetching the data.
 * - `status`: The status of the query (loading, error, success).
 * - `refetch`: A function to manually refetch the data.
 * - `remove`: A function to remove the query from the cache.
 * - ... and more.
 */
export function useCurrentUser() {
  const { address } = useAccount()
  const { isAuthenticated } = useAuthStore()

  return useQuery<User | null, Error>({
    // Unique query key based on the current user's address
    queryKey: userKeys.currentUser(address),

    // Function to fetch user data
    queryFn: () => {
      // Safeguard: Although the 'enabled' flag should prevent this,
      if (!address) {
        return Promise.resolve(null)
      }
      return fetchUserFromAccount()
    },

    // Only enable (run) this query if the user is authenticated AND has an address
    enabled: isAuthenticated && !!address,

    // Cache and garbage collection settings
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  })
}
