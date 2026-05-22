import { ApiError } from '../api/client'

/** User-safe messages — never expose raw server bodies (data leak / XSS risk). */
export function toUserMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 422) {
      return 'Some fields are invalid. Please check the form and try again.'
    }
    if (error.status === 429) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    if (error.status === 413 || error.status === 415) {
      return 'The request could not be processed. Please try again.'
    }
    if (error.status >= 500) {
      return 'The server encountered an error. Please try again later.'
    }
    if (error.status === 404) {
      return 'That item was not found.'
    }
    return 'Something went wrong. Please try again.'
  }

  if (error instanceof Error && error.message) {
    return 'Unable to reach the server. Check that the API is running.'
  }

  return 'An unexpected error occurred.'
}
