import { describe, expect, it } from 'vitest'
import type { BoardGame } from '../types/game'
import { sortGames } from './sortGames'

const sample: BoardGame[] = [
  {
    id: 1,
    title: 'Azul',
    designer: 'Michael Kiesling',
    publisher: 'Plan B',
    year_published: 2017,
    min_players: 2,
    max_players: 4,
    play_time_minutes: 45,
    rating: 7.8,
    tags: ['abstract'],
  },
  {
    id: 2,
    title: 'Brass: Birmingham',
    designer: 'Martin Wallace',
    publisher: 'Roxley',
    year_published: 2018,
    min_players: 2,
    max_players: 4,
    play_time_minutes: 120,
    rating: 8.6,
    tags: ['economic'],
  },
  {
    id: 3,
    title: 'Brass: Lancashire',
    designer: 'Martin Wallace',
    publisher: 'Roxley',
    year_published: 2007,
    min_players: 2,
    max_players: 4,
    play_time_minutes: 120,
    rating: 8.2,
    tags: ['economic'],
  },
]

describe('sortGames nested ordering', () => {
  it('sorts by designer then title when primary values tie', () => {
    const sorted = sortGames(sample, ['designer', 'title'], 'asc')
    const wallaceTitles = sorted
      .filter((g) => g.designer === 'Martin Wallace')
      .map((g) => g.title)

    expect(wallaceTitles).toEqual(['Brass: Birmingham', 'Brass: Lancashire'])
  })

  it('reverses nested order when direction is desc', () => {
    const sorted = sortGames(sample, ['designer', 'title'], 'desc')
    const wallaceTitles = sorted
      .filter((g) => g.designer === 'Martin Wallace')
      .map((g) => g.title)

    expect(wallaceTitles).toEqual(['Brass: Lancashire', 'Brass: Birmingham'])
  })
})
