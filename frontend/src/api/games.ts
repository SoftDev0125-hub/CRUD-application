import type {
  BoardGame,
  GameEnrichment,
  GameInput,
  GameListParams,
  PaginatedGames,
} from '../types/game'
import { apiRequest, useMockApi } from './client'
import { mockGamesApi } from './mockGamesStore'

function buildQuery(params: GameListParams): string {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.tag) query.set('tag', params.tag)
  if (params.sort?.length) query.set('sort', params.sort.join(','))
  if (params.direction) query.set('direction', params.direction)
  const serialized = query.toString()
  return serialized ? `?${serialized}` : ''
}

const liveApi = {
  list: (params: GameListParams) =>
    apiRequest<PaginatedGames>(`/games${buildQuery(params)}`),
  get: (id: number) => apiRequest<BoardGame>(`/games/${id}`),
  create: (input: GameInput) =>
    apiRequest<BoardGame>('/games', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  update: (id: number, input: GameInput) =>
    apiRequest<BoardGame>(`/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }),
  remove: (id: number) =>
    apiRequest<void>(`/games/${id}`, { method: 'DELETE' }),
  enrichment: (id: number) =>
    apiRequest<GameEnrichment>(`/games/${id}/enrichment`),
}

export const gamesApi = useMockApi ? mockGamesApi : liveApi
