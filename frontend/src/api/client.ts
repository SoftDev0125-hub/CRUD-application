const baseUrl = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  status: number
  body?: unknown

  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`

  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    let body: unknown
    try {
      body = await response.json()
    } catch {
      body = await response.text()
    }
    throw new ApiError(
      `Request failed (${response.status})`,
      response.status,
      body,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const useMockApi = import.meta.env.VITE_USE_MOCK === 'true'
