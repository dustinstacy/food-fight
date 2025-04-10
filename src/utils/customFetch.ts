/**
 * Custom fetch wrapper to handle common fetch logic.
 * @template T - The expected type of the successful JSON response. Defaults to `unknown`.
 * @param {string} url - The URL endpoint to fetch data from.
 * @param {RequestInit} [options={}] - Fetch options
 * @returns {Promise<T>} A promise that resolves with the fetched data
 * @throws {Error} Throws an error if the fetch fails or the response is not ok.
 */
const customFetch = async <T = unknown>(url: string, options: RequestInit = {}): Promise<T> => {
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

export default customFetch
