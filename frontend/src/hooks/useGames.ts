import { useCallback, useEffect, useMemo, useState } from 'react'
import { gamesApi } from '../api/games'
import { toUserMessage } from '../utils/apiErrors'
import type {
  BoardGame,
  GameInput,
  GameListParams,
  SortDirection,
  SortField,
} from '../types/game'
import { filterGames } from '../utils/filterGames'
import { sortGames } from '../utils/sortGames'

export type ProcessingMode = 'server' | 'client'

export interface ListControls {
  search: string
  tag: string
  primarySort: SortField
  secondarySort: SortField
  direction: SortDirection
  filterMode: ProcessingMode
  sortMode: ProcessingMode
}

const defaultControls: ListControls = {
  search: '',
  tag: '',
  primarySort: 'designer',
  secondarySort: 'title',
  direction: 'asc',
  filterMode: 'server',
  sortMode: 'client',
}

export function useGames() {
  const [controls, setControls] = useState<ListControls>(defaultControls)
  const [appliedControls, setAppliedControls] = useState<ListControls>(defaultControls)
  const [games, setGames] = useState<BoardGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const fetchGames = useCallback(async (active: ListControls) => {
    setLoading(true)
    setError(null)

    try {
      const params: GameListParams = {}

      if (active.filterMode === 'server') {
        if (active.search) params.search = active.search
        if (active.tag) params.tag = active.tag
      }

      if (active.sortMode === 'server') {
        params.sort = [active.primarySort, active.secondarySort]
        params.direction = active.direction
      }

      const response = await gamesApi.list(params)
      let rows = response.data

      if (active.filterMode === 'client') {
        rows = filterGames(rows, active.search, active.tag)
      }

      if (active.sortMode === 'client') {
        rows = sortGames(
          rows,
          [active.primarySort, active.secondarySort],
          active.direction,
        )
      }

      setGames(rows)
    } catch (err) {
      setError(toUserMessage(err))
      setGames([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchGames(appliedControls)
  }, [appliedControls, fetchGames])

  const applyFilters = useCallback(() => {
    setAppliedControls({ ...controls })
  }, [controls])

  const updateControl = useCallback(
    <K extends keyof ListControls>(key: K, value: ListControls[K]) => {
      setControls((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const resetControls = useCallback(() => {
    setControls(defaultControls)
    setAppliedControls(defaultControls)
  }, [])

  const openCreate = useCallback(() => {
    setSelectedId(null)
    setView('create')
  }, [])

  const openEdit = useCallback((id: number) => {
    setSelectedId(id)
    setView('edit')
  }, [])

  const closeForm = useCallback(() => {
    setView('list')
    setSelectedId(null)
  }, [])

  const saveGame = useCallback(
    async (input: GameInput, id?: number) => {
      setError(null)
      try {
        if (id) {
          await gamesApi.update(id, input)
        } else {
          await gamesApi.create(input)
        }
        closeForm()
        await fetchGames(appliedControls)
      } catch (err) {
        setError(toUserMessage(err))
        throw err
      }
    },
    [appliedControls, closeForm, fetchGames],
  )

  const deleteGame = useCallback(
    async (id: number) => {
      setError(null)
      try {
        await gamesApi.remove(id)
        await fetchGames(appliedControls)
      } catch (err) {
        setError(toUserMessage(err))
        throw err
      }
    },
    [appliedControls, fetchGames],
  )

  const selectedGame = useMemo(
    () => games.find((g) => g.id === selectedId) ?? null,
    [games, selectedId],
  )

  const activeSummary = useMemo(() => {
    const parts = [
      `Filter: ${appliedControls.filterMode}`,
      `Sort: ${appliedControls.sortMode}`,
      `${appliedControls.primarySort} → ${appliedControls.secondarySort} (${appliedControls.direction})`,
    ]
    return parts.join(' · ')
  }, [appliedControls])

  return {
    games,
    loading,
    error,
    controls,
    appliedControls,
    activeSummary,
    view,
    selectedGame,
    updateControl,
    applyFilters,
    resetControls,
    openCreate,
    openEdit,
    closeForm,
    saveGame,
    deleteGame,
    refresh: () => fetchGames(appliedControls),
  }
}
