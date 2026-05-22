import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { BoardGame } from '../types/game'
import { GameTable } from './GameTable'

const game: BoardGame = {
  id: 42,
  title: 'Test Game',
  designer: 'Jane Doe',
  publisher: 'Test Pub',
  year_published: 2024,
  min_players: 2,
  max_players: 4,
  play_time_minutes: 60,
  rating: 8,
  tags: ['family'],
}

describe('GameTable', () => {
  it('calls edit and delete handlers from row actions', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(
      <GameTable
        games={[game]}
        loading={false}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onEdit).toHaveBeenCalledWith(42)
    expect(onDelete).toHaveBeenCalledWith(42)
  })
})
