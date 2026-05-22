export interface BoardGame {
  id: number
  title: string
  designer: string
  publisher: string
  year_published: number
  min_players: number
  max_players: number
  play_time_minutes: number
  rating: number
  tags: string[]
  created_at?: string
  updated_at?: string
}

export type GameInput = Omit<BoardGame, 'id' | 'created_at' | 'updated_at'>

export type SortField =
  | 'title'
  | 'designer'
  | 'publisher'
  | 'year_published'
  | 'rating'
  | 'play_time_minutes'

export type SortDirection = 'asc' | 'desc'

export interface GameListParams {
  search?: string
  tag?: string
  sort?: SortField[]
  direction?: SortDirection
}

export interface GameEnrichment {
  title: string
  summary: string
  wikipedia_url: string
  thumbnail_url: string | null
}

export interface PaginatedGames {
  data: BoardGame[]
  meta: {
    total: number
    filtered_by: 'server' | 'client'
  }
}
