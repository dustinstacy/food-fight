import { customFetch } from 'utils'

import { VerifySignatureParams, VerifySignatureResponse } from '../types'
/**
 * POST /api/auth/challenge
 * Calls the backend to get a SIWE challenge message for a given address.
 *
 * @param address - The user's wallet address.
 * @param chainId - The chain ID for the wallet address.
 * @returns A promise that resolves with the message string to be signed.
 */
export const getChallenge = async (address: string, chainId: number): Promise<string> => {
  console.log(`Requesting challenge for address ${address} on chain ${chainId}`)
  const result = await customFetch<{ message: string }>('/api/auth/challenge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, chainId }),
  })
  if (typeof result?.message !== 'string') {
    throw new Error('Invalid challenge response format from server')
  }
  return result.message
}

/**
 * POST /api/auth/verify
 * Calls the backend to verify a SIWE signature and obtain an auth token.
 *
 * @param params - Object containing the original message, signature, and address.
 * @returns A promise that resolves with an object containing the accessToken.
 */
export const verifySignature = async (
  params: VerifySignatureParams
): Promise<VerifySignatureResponse> => {
  console.log('Verifying signature for address:', params.address)
  const result = await customFetch<VerifySignatureResponse>('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!result?.accessToken) {
    throw new Error('Verification failed or accessToken not returned')
  }
  return result
}
