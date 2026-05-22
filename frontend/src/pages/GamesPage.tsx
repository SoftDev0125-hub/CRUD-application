import { useMemo, useState } from 'react'
import { useMockApi } from '../api/client'
import { collectTags } from '../utils/filterGames'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { FilterBar } from '../components/FilterBar'
import { GameForm } from '../components/GameForm'
import { GameTable } from '../components/GameTable'
import { Layout } from '../components/Layout'
import { SortControls } from '../components/SortControls'
import { StatusPills } from '../components/StatusPills'
import { useGames } from '../hooks/useGames'

export function GamesPage() {
  const {
    games,
    loading,
    error,
    controls,
    appliedControls,
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
  } = useGames()

  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteTitle, setDeleteTitle] = useState('')

  const tagOptions = useMemo(() => collectTags(games), [games])

  const avgRating = useMemo(() => {
    if (games.length === 0) return null
    const sum = games.reduce((acc, g) => acc + g.rating, 0)
    return (sum / games.length).toFixed(1)
  }, [games])

  const requestDelete = (id: number) => {
    const game = games.find((g) => g.id === id)
    setDeleteId(id)
    setDeleteTitle(game?.title ?? 'this game')
  }

  const confirmDelete = async () => {
    if (deleteId === null) return
    await deleteGame(deleteId)
    setDeleteId(null)
    setDeleteTitle('')
  }

  return (
    <Layout>
      {useMockApi && (
        <div className="alert alert-info" role="status">
          <span className="alert-icon" aria-hidden>
            ℹ
          </span>
          <span>
            Demo mode — using in-memory data until the Laravel API is connected.
          </span>
        </div>
      )}

      {error && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon" aria-hidden>
            !
          </span>
          <span>{error}</span>
        </div>
      )}

      <section className="page-toolbar">
        <div className="toolbar-start">
          <button type="button" className="btn btn-primary btn-lg" onClick={openCreate}>
            <span className="btn-icon" aria-hidden>
              +
            </span>
            Add game
          </button>
          <StatusPills controls={appliedControls} count={games.length} />
        </div>
        {avgRating && (
          <div className="stat-chip" title="Average rating of visible games">
            <span className="stat-label">Avg rating</span>
            <span className="stat-value">{avgRating}</span>
          </div>
        )}
      </section>

      <section className="controls-section" aria-label="Search and sort controls">
        <FilterBar
          controls={controls}
          onChange={updateControl}
          onApply={applyFilters}
          onReset={resetControls}
          tagOptions={tagOptions}
        />
        <SortControls
          controls={controls}
          onChange={updateControl}
          onApply={applyFilters}
        />
      </section>

      <section className="card list-card" aria-label="Game collection">
        <div className="card-header list-header">
          <div className="card-title-group">
            <span className="card-icon" aria-hidden>
              ▦
            </span>
            <div>
              <h2>Collection</h2>
              <p className="card-desc">
                {loading
                  ? 'Loading…'
                  : `${games.length} game${games.length === 1 ? '' : 's'} on your shelf`}
              </p>
            </div>
          </div>
        </div>
        <GameTable
          games={games}
          loading={loading}
          onEdit={openEdit}
          onDelete={requestDelete}
        />
      </section>

      {view !== 'list' && (
        <GameForm
          mode={view}
          initial={selectedGame}
          onSubmit={saveGame}
          onCancel={closeForm}
        />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Remove from shelf?"
        message={`Delete "${deleteTitle}"? This cannot be undone.`}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setDeleteId(null)}
      />
    </Layout>
  )
}
