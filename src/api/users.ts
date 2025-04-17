import { User } from 'types'
import { customFetch } from 'utils'

/** @see {@link User} - The type definition for the user object. */

/**
 * Fetches the authenticated user's data.
 *
 * @remarks
 * - Calls the backend route `GET /api/users/`.
 *
 * @returns A promise resolving with the User object for the authenticated user.
 */
export const fetchUserFromAccount = async (): Promise<User> => {
  console.log('Fetching user...')
  const user = await customFetch<User>(`/api/users/current`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!user) throw new Error('API returned unexpected empty response for fetchUserFromAccount')
  return user
}

/**
 * Updates a specific property of the *authenticated* user.
 *
 * @remarks
 * - Calls the backend route `PUT /api/users/:property`.
 *
 * @template T - The key of the User property to update.
 * @param property - The name of the user property to update (e.g., 'username', 'image'). This determines the API endpoint path segment.
 * @param value - The new value for the specified property.
 * @returns A promise resolving with the updated User object returned by the API.
 */
export const updateUser = async <T extends keyof User>(property: T, value: User[T]): Promise<User> => {
  console.log(`Updating user ${property}...`)
  const updatedUser = await customFetch<User>(`/api/users/${property}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [property]: value }), // Send dynamic property in body
  })

  if (!updatedUser) throw new Error('API returned unexpected empty response for updateUser')
  return updatedUser
}
