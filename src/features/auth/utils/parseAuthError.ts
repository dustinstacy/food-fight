import { ParseAuthErrorResult } from '../types'

/**
 * Parses various error types from the authentication flow.
 *
 * @remarks
 * This function is responsible for:
 * - Identifying if the error is a user rejection (e.g., cancellation).
 * - Extracting a user-friendly error message.
 * - Handling structured error objects and plain strings.
 *
 * @param error - The error to parse, which can be of any type.
 *
 * @returns An object containing:
 * - `displayMessage`: A user-friendly error message.
 * - `isUserRejection`: A boolean indicating if the error was due to user rejection.
 */
export const parseAuthError = (error: unknown): ParseAuthErrorResult => {
  let displayMessage = 'An unexpected error occurred during authentication.'
  let isUserRejection = false

  if (error && typeof error === 'object') {
    // Check for standard EIP-1193 user rejection code
    if ('code' in error && typeof error.code === 'number' && error.code === 4001) {
      isUserRejection = true
      console.log('parseAuthError: Detected user rejection (EIP-1193 code 4001)')
    }

    // Check for common rejection messages in error.message
    else if (!isUserRejection && 'message' in error && typeof error.message === 'string') {
      // Use Regex to check for common rejection messages
      if (/User rejected|rejected request|cancelled|denied/i.test(error.message)) {
        isUserRejection = true
        console.log('parseAuthError: Detected user rejection (message content)')
      }
    }

    // Prioritize shortMessage if available and it wasn't a user rejection
    if (!isUserRejection && 'shortMessage' in error && typeof error.shortMessage === 'string') {
      displayMessage = error.shortMessage
    } else if (!isUserRejection && error instanceof Error) {
      displayMessage = error.message || displayMessage
    }
  } else if (typeof error === 'string') {
    displayMessage = error
  }

  if (isUserRejection) {
    displayMessage = 'Signature request cancelled.'
  }

  return {
    displayMessage: isUserRejection ? displayMessage : `Authentication failed: ${displayMessage}`,
    isUserRejection,
  }
}
