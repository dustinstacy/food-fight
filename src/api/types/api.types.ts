//////////////////////////////////////////////////////
/// Users API Types                                 ///
//////////////////////////////////////////////////////

/**
 * Defines parameters for the `auth/verify` API endpoint.
 */
export interface VerifySignatureParams {
  /** The message that was signed by the user.*/
  message: string

  /** The user's signature. */
  signature: string

  /** The user's wallet address. */
  address: string
}

/**
 * Defines the response from the `auth/verify` API endpoint.
 */
export interface VerifySignatureResponse {
  /** The JSON Web Token (JWT) for authenticating the user. */
  accessToken: string
  /** Flag indicating if the user was created during the verification flow */
  isNewUser: boolean
}
