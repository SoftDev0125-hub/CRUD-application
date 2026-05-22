import type { BoardGame, SortDirection, SortField } from '../types/game'
import { compareStrings } from './compareStrings'

function sortValue(game: BoardGame, field: SortField): string | number {
  switch (field) {
    case 'year_published':
    case 'rating':
    case 'play_time_minutes':
      return game[field]
    default:
      return game[field].trim().toLowerCase()
  }
}

/**
 * Nested sort: primary field first, then secondary as tiebreaker
 * (same idea as first-name then last-name ordering).
 */
export function sortGames(
  games: BoardGame[],
  fields: SortField[],
  direction: SortDirection = 'asc',
): BoardGame[] {
  const multiplier = direction === 'asc' ? 1 : -1

  return [...games].sort((a, b) => {
    for (const field of fields) {
      const left = sortValue(a, field)
      const right = sortValue(b, field)

      let comparison = 0
      if (typeof left === 'number' && typeof right === 'number') {
        comparison = left - right
      } else {
        comparison = compareStrings(String(left), String(right))
      }

      if (comparison !== 0) {
        return comparison * multiplier
      }
    }
    return a.id - b.id
  })
}
