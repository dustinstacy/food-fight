/** Parameters for the `auth/verify` API endpoint. */
export interface VerifySignatureParams {
  /** The message that was signed by the user.*/
  message: string

  /** The user's signature, typically generated using a wallet provider. */
  signature: string

  /** The user's wallet address, usually in checksum format. */
  address: string
}

/**
 * Response from the `auth/verify` API endpoint.
 */
export interface VerifySignatureResponse {
  /** The JSON Web Token (JWT) for authenticating the user. */
  accessToken: string
  /** Flag indicating if the user was created during the verification flow */
  isNewUser: boolean
}
