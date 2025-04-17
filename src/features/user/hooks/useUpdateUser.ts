import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { updateUser } from 'api'
import { User, UpdateUserVariables } from 'features/user/types'

// Reuse or define the query key factory consistent with useCurrentUser
const userKeys = {
  currentUser: (address: string | undefined) => ['currentUser', address] as const,
}

/**
 * Custom hook to update the current authenticated user's profile data.
 *
 * @remarks
 * This hook is responsible for:
 * - Updating the current user's profile data on the server.
 * - Handling the success and error states.
 * - Invalidating the user query to refetch the updated data.
 *
 * @returns A mutation object containing:
 * - `mutate`: A function to trigger the mutation.
 * - `isLoading`: A boolean indicating if the mutation is currently in progress.
 * - `isError`: A boolean indicating if there was an error during the mutation.
 * - `error`: The error object if there was an error during the mutation.
 * - `isSuccess`: A boolean indicating if the mutation was successful.
 * - `reset`: A function to reset the mutation state.
 * - `status`: The status of the mutation (loading, error, success).
 * - `data`: The updated user data (User | null) or undefined while loading/error.
 * - ... and more.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { address } = useAccount()

  return useMutation<User | null, Error, UpdateUserVariables>({
    mutationFn: ({ property, value }: UpdateUserVariables) => {
      if (!address) {
        return Promise.reject(new Error('User address not available for update.'))
      }
      // Call API function which updates one property at a time
      return updateUser(property, value)
    },
    onSuccess: (updatedUserData, variables) => {
      console.log(`User update successful for property "${variables.property}":`, updatedUserData)
      // Invalidate the currentUser query to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.currentUser(address) })
    },
    onError: (error, variables) => {
      console.error(`User update failed for property "${variables.property}":`, error.message)
    },
  })
}
