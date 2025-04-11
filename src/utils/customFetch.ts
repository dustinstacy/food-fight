/**
 * Custom fetch wrapper handling common logic for API requests.
 *
 * @remarks
 * This function provides a standardized way to interact with the backend API. Key behaviors include:
 * - Prepends the base URL (from `NEXT_PUBLIC_API_BASE_URL` env var or fallback 'http://localhost:5000').
 * - Automatically sets 'Content-Type' to 'application/json'.
 * - Adds an 'Authorization: Bearer' token header, reading the token from `sessionStorage` (client-side only).
 * - Checks the response status and throws an `Error` for non-OK responses , attempting to include status and body details in the error message.
 * - Correctly handles successful empty responses by resolving the promise with `undefined`.
 *
 * @template T - The expected type of the successful JSON response body. Defaults to `unknown`.
 * @param url - The API endpoint path (e.g., '/api/users') to be appended to the base URL.
 * @param options - Standard `fetch` options object (method, body, additional headers, etc.).
 * @defaultValue `{}` (empty object) for the `options` parameter.
 * @returns A promise that resolves with the parsed JSON response body as type `T`,
 * or `undefined` if the response has no content.
 * @throws Throws an `Error` if the `fetch` call itself fails network-wise or if the API
 * response status code indicates failure.
 */
export const customFetch = async <T = unknown>(url: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
  // Ensure the window object is defined before accessing sessionStorage
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null

  const config: RequestInit = {
    ...options,
    headers: {
      // Default headers
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }

  const res = await fetch(`${baseUrl}${url}`, config)

  if (!res.ok) {
    let errorData: Record<string, unknown> | { status: number; statusText: string; body: string }
    try {
      errorData = await res.json()
    } catch (_jsonError) {
      // If response is not JSON, use text and status
      errorData = { status: res.status, statusText: res.statusText, body: await res.text().catch(() => '') }
    }
    // Throw a custom error with status and message
    throw new Error(`API Error ${res.status}: ${JSON.stringify(errorData)}`)
  }

  // Handle empty responses
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T
  }

  return res.json() as Promise<T>
}
