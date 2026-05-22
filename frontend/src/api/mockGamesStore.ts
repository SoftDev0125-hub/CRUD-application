import type {
  BoardGame,
  GameEnrichment,
  GameInput,
  GameListParams,
  PaginatedGames,
} from '../types/game'
import { filterGames } from '../utils/filterGames'
import { sortGames } from '../utils/sortGames'

const seed: BoardGame[] = [
  {
    id: 1,
    title: 'Brass: Birmingham',
    designer: 'Martin Wallace',
    publisher: 'Roxley',
    year_published: 2018,
    min_players: 2,
    max_players: 4,
    play_time_minutes: 120,
    rating: 8.6,
    tags: ['economic', 'heavy'],
  },
  {
    id: 2,
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
    id: 3,
    title: 'Cascadia',
    designer: 'Randy Flynn',
    publisher: 'Flatout Games',
    year_published: 2021,
    min_players: 1,
    max_players: 4,
    play_time_minutes: 45,
    rating: 7.9,
    tags: ['family', 'tile-placement'],
  },
  {
    id: 4,
    title: 'Dune: Imperium',
    designer: 'Paul Dennen',
    publisher: 'Dire Wolf',
    year_published: 2020,
    min_players: 1,
    max_players: 4,
    play_time_minutes: 90,
    rating: 8.2,
    tags: ['deck-building', 'worker-placement'],
  },
  {
    id: 5,
    title: 'Everdell',
    designer: 'James A. Wilson',
    publisher: 'Starling Games',
    year_published: 2018,
    min_players: 1,
    max_players: 4,
    play_time_minutes: 80,
    rating: 8.0,
    tags: ['worker-placement', 'family'],
  },
  {
    id: 6,
    title: 'Spirit Island',
    designer: 'R. D. Kelly',
    publisher: 'Greater Than Games',
    year_published: 2017,
    min_players: 1,
    max_players: 4,
    play_time_minutes: 120,
    rating: 8.4,
    tags: ['cooperative', 'heavy'],
  },
  {
    id: 7,
    title: 'Wingspan',
    designer: 'Elizabeth Hargrave',
    publisher: 'Stonemaier Games',
    year_published: 2019,
    min_players: 1,
    max_players: 5,
    play_time_minutes: 70,
    rating: 8.1,
    tags: ['engine-building', 'family'],
  },
  {
    id: 8,
    title: 'Azul',
    designer: 'Michael Kiesling',
    publisher: 'Plan B Games',
    year_published: 2017,
    min_players: 2,
    max_players: 4,
    play_time_minutes: 45,
    rating: 7.8,
    tags: ['abstract', 'family'],
  },
]

let games = [...seed]
let nextId = games.length + 1

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockGamesApi = {
  async list(params: GameListParams = {}): Promise<PaginatedGames> {
    await delay()
    let result = [...games]

    if (params.search || params.tag) {
      result = filterGames(result, params.search ?? '', params.tag ?? '')
    }

    const sortFields = params.sort?.length
      ? params.sort
      : (['designer', 'title'] as const)
    result = sortGames(result, [...sortFields], params.direction ?? 'asc')

    return {
      data: result,
      meta: { total: result.length, filtered_by: 'server' },
    }
  },

  async get(id: number): Promise<BoardGame> {
    await delay()
    const game = games.find((g) => g.id === id)
    if (!game) throw new Error('Game not found')
    return game
  },

  async create(input: GameInput): Promise<BoardGame> {
    await delay()
    const game: BoardGame = { ...input, id: nextId++ }
    games = [game, ...games]
    return game
  },

  async update(id: number, input: GameInput): Promise<BoardGame> {
    await delay()
    const index = games.findIndex((g) => g.id === id)
    if (index === -1) throw new Error('Game not found')
    const updated = { ...input, id }
    games = [...games.slice(0, index), updated, ...games.slice(index + 1)]
    return updated
  },

  async remove(id: number): Promise<void> {
    await delay()
    games = games.filter((g) => g.id !== id)
  },

  async enrichment(id: number): Promise<GameEnrichment> {
    await delay(200)
    const game = games.find((g) => g.id === id)
    if (!game) throw new Error('Game not found')

    return {
      title: game.title,
      summary: `${game.title} is a ${game.tags[0] ?? 'tabletop'} game designed by ${game.designer}, published by ${game.publisher} (${game.year_published}). Mock enrichment — Wikipedia integration will load from the Laravel API.`,
      wikipedia_url: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(game.title)}`,
      thumbnail_url: null,
    }
  },
}
