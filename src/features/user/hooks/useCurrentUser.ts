import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { fetchUserFromAccount } from 'api'
import { User } from 'features/user/types'
import { userKeys } from 'features/user/utils'
import { useAuthStore } from 'stores'

/**
 * Custom hook to fetch the current authenticated user's profile data.
 *
 * @remarks
 *  This hook is resposible for:
 * - Fetching the current user's profile data from the server.
 * - Handling the loading and error states.
 * - Returning the user data or null if not authenticated.
 *
 * @returns A query object containing the user data, loading state, and error state.
 */
export function useCurrentUser() {
  const { address } = useAccount()
  const { isAuthenticated } = useAuthStore()

  const query = useQuery<User | null, Error>({
    queryKey: userKeys.currentUser(address),
    queryFn: () => fetchUserFromAccount(),
    enabled: isAuthenticated && !!address,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  })

  return query
}
