import { jwtDecode } from 'jwt-decode'

import { ValidateTokenParams, ValidateTokenResult } from 'features/auth'
import { JwtPayload } from 'types'

/**
 * Validates a JWT token.
 *
 * @remarks
 * This function is responsible for:
 * - Checking if the token is present.
 * - Decoding the token and checking its expiration time.
 * - Validating the address and chainId against the decoded token.
 *
 * @param params - The parameters for validation.
 * @param params.token - The JWT token to validate.
 * @param params.address - The address of the user.
 * @param params.chainId - The chain ID of the user's wallet.
 *
 * @returns An object containing:
 * - `isValid`: A boolean indicating if the token is valid.
 * - `decoded`: The decoded JWT payload if valid, otherwise null.
 */
export const validateToken = ({ token, address, chainId }: ValidateTokenParams): ValidateTokenResult => {
  if (!token || !address || chainId === undefined) {
    return { isValid: false, decoded: null }
  }
  try {
    const decodedToken = jwtDecode<JwtPayload>(token)
    const currentTime = Math.floor(Date.now() / 1000)

    const isValid =
      !!decodedToken.exp &&
      decodedToken.exp > currentTime &&
      !!decodedToken.address &&
      decodedToken.address.toLowerCase() === address.toLowerCase() &&
      !!decodedToken.chainId &&
      decodedToken.chainId === chainId

    return { isValid, decoded: isValid ? decodedToken : null }
  } catch (error) {
    console.error('useAuthStore: Error decoding token during validation:', error)
    return { isValid: false, decoded: null }
  }
}
