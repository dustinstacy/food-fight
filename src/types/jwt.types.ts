////////////////////////////////////////////////
/// JWT                                      ///
////////////////////////////////////////////////

/**
 * Defines the structure of the JWT payload.
 */
export interface JwtPayload {
  /** The unique identifier for the user. */
  userId: string

  /** The user's wallet address. */
  address: string

  /** The expiration time. */
  exp?: number

  /** The issued at time. */
  iat?: number

  /** The chain ID */
  chainId?: number
}
