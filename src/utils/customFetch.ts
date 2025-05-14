/**
 * Custom fetch wrapper handling common logic for API requests.
 *
 * @remarks
 * This function provides a standardized way to interact with the backend API. Key behaviors include:
 * - Prepends the base URL.
 * - Retrieves the access token from `localStorage` for authentication.
 * - Automatically sets 'Content-Type' to 'application/json'.
 * - Adds an 'Authorization: Bearer' token header.
 * - Accepts a `RequestInit` object for additional options.
 * - Throws an error with the status code and response body if the response is not ok.
 * - Handles successful empty responses.
 *
 * @template T - The expected type of the successful JSON response body. Defaults to `unknown`.
 * @param url - The API endpoint path (e.g., '/api/users').
 * @param options - Standard `fetch` options object. Defaults to an empty object.
 * @returns A promise that resolves with the parsed JSON response body as type `T`,
 * or `undefined` if the response has no content.
 */
export const customFetch = async <T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }

  const res = await fetch(`${baseUrl}${url}`, requestOptions)

  if (!res.ok) {
    let errorData: Record<string, unknown> | { status: number; statusText: string; body: string }
    try {
      errorData = await res.json()
    } catch (_jsonError) {
      errorData = {
        status: res.status,
        statusText: res.statusText,
        body: await res.text().catch(() => ''),
      }
    }
    throw new Error(`API Error ${res.status}: ${JSON.stringify(errorData)}`)
  }

  // Handle empty responses
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T
  }

  return res.json() as Promise<T>
}
