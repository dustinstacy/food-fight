import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { updateUser } from 'api'
import { User, UpdateUserVariables } from 'features/user/types'
import { userKeys } from 'features/user/utils'

/**
 * Custom hook to update the current authenticated user's profile data.
 *
 * @remarks
 * This hook is responsible for:
 * - Updating the current user's profile data on the server.
 * - Handling the success and error states.
 * - Invalidating the user query to refetch the updated data.
 *
 * @returns A mutation object containing the mutation function and handlers.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { address } = useAccount()

  return useMutation<User | null, Error, UpdateUserVariables>({
    // Mutation function to update user properties
    mutationFn: ({ property, value }: UpdateUserVariables) => {
      if (!address) {
        return Promise.reject(new Error('User address not available for update.'))
      }
      return updateUser(property, value)
    },

    // Success handler
    onSuccess: (updatedUserData, variables) => {
      console.log(`User update successful for property "${variables.property}":`, updatedUserData)
      // Invalidate the currentUser query to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.currentUser(address) })
    },

    // Error handler
    onError: (error, variables) => {
      console.error(`User update failed for property "${variables.property}":`, error.message)
    },
  })
}
