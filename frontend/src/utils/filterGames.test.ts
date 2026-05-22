import { describe, expect, it } from 'vitest'
import type { BoardGame } from '../types/game'
import { filterGames } from './filterGames'

const games: BoardGame[] = [
  {
    id: 1,
    title: 'Catan',
    designer: 'Klaus Teuber',
    publisher: 'Catan Studio',
    year_published: 1995,
    min_players: 3,
    max_players: 4,
    play_time_minutes: 90,
    rating: 7.1,
    tags: ['family', 'trading'],
  },
  {
    id: 2,
    title: 'Wingspan',
    designer: 'Elizabeth Hargrave',
    publisher: 'Stonemaier',
    year_published: 2019,
    min_players: 1,
    max_players: 5,
    play_time_minutes: 70,
    rating: 8.1,
    tags: ['engine-building', 'family'],
  },
]

describe('filterGames', () => {
  it('filters by tag attribute', () => {
    const result = filterGames(games, '', 'family')
    expect(result).toHaveLength(2)
    expect(result.every((g) => g.tags.includes('family'))).toBe(true)
  })

  it('filters by search across title and designer', () => {
    const result = filterGames(games, 'hargrave', '')
    expect(result).toHaveLength(1)
    expect(result[0]?.title).toBe('Wingspan')
  })

  it('combines search and tag', () => {
    const result = filterGames(games, 'catan', 'trading')
    expect(result).toHaveLength(1)
    expect(result[0]?.title).toBe('Catan')
  })
})
