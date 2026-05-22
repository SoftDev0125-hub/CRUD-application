import { describe, expect, it } from 'vitest'
import { ApiError } from '../api/client'
import { toUserMessage } from './apiErrors'

describe('toUserMessage', () => {
  it('returns safe message for rate limiting', () => {
    expect(toUserMessage(new ApiError('x', 429))).toBe(
      'Too many requests. Please wait a moment and try again.',
    )
  })

  it('does not include raw API body in output', () => {
    const msg = toUserMessage(
      new ApiError('fail', 500, { secret: 'internal-token', stack: 'trace' }),
    )
    expect(msg).not.toContain('internal-token')
    expect(msg).not.toContain('trace')
  })
})
