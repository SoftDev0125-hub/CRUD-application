import type { BoardGame } from '../types/game'

/** Client-side filter: search across text fields and optional tag. */
export function filterGames(
  games: BoardGame[],
  search: string,
  tag: string,
): BoardGame[] {
  const query = search.trim().toLowerCase()
  const normalizedTag = tag.trim().toLowerCase()

  return games.filter((game) => {
    if (normalizedTag && !game.tags.some((t) => t.toLowerCase() === normalizedTag)) {
      return false
    }

    if (!query) {
      return true
    }

    const haystack = [
      game.title,
      game.designer,
      game.publisher,
      game.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(query)
  })
}

export function collectTags(games: BoardGame[]): string[] {
  const tags = new Set<string>()
  for (const game of games) {
    for (const tag of game.tags) {
      tags.add(tag)
    }
  }
  return [...tags].sort((a, b) => a.localeCompare(b))
}
