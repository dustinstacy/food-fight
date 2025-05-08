import { JwtPayload } from 'types'

///////////////////////////////////////////////////
/// ParseAuthError Types                        ///
///////////////////////////////////////////////////

/**
 * Defines the result of the parseAuthError function.
 */
export type ParseAuthErrorResult = {
  /** The user-friendly error message to display. */
  displayMessage: string

  /** Indicates if the error was due to user rejection. */
  isUserRejection: boolean
}

///////////////////////////////////////////////////
/// ValidateToken Types                         ///
///////////////////////////////////////////////////

/**
 * Define parameters for the validateToken function
 */
export type ValidateTokenParams = {
  /** The JWT token to validate */
  token: string | null

  /** The address of the user */
  address: string | null | undefined

  /** The chain ID of the user's wallet */
  chainId: number | undefined
}

/**
 * Define the result of the validateToken function
 */
export type ValidateTokenResult = {
  /** Indicates if the token is valid */
  isValid: boolean

  /** The decoded JWT payload */
  decoded: JwtPayload | null
}
