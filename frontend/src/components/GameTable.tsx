import type { BoardGame } from '../types/game'

interface GameTableProps {
  games: BoardGame[]
  loading: boolean
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

function RatingBadge({ rating }: { rating: number }) {
  const tier =
    rating >= 8 ? 'high' : rating >= 7 ? 'mid' : 'low'
  return (
    <span className={`rating-badge rating-${tier}`} title={`Rating ${rating}`}>
      {rating.toFixed(1)}
    </span>
  )
}

function TableSkeleton() {
  return (
    <div className="table-skeleton" aria-busy="true" aria-label="Loading games">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-row" />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden>
        📋
      </div>
      <h3>No games to show</h3>
      <p>Adjust your filters or add the first title to your shelf.</p>
    </div>
  )
}

export function GameTable({ games, loading, onEdit, onDelete }: GameTableProps) {
  if (loading) return <TableSkeleton />
  if (games.length === 0) return <EmptyState />

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Game</th>
            <th scope="col">Designer</th>
            <th scope="col">Publisher</th>
            <th scope="col">Year</th>
            <th scope="col">Players</th>
            <th scope="col">Time</th>
            <th scope="col">Rating</th>
            <th scope="col">Tags</th>
            <th scope="col" className="col-actions">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td data-label="Game">
                <div className="cell-primary">
                  <span className="game-title">{game.title}</span>
                </div>
              </td>
              <td data-label="Designer">{game.designer}</td>
              <td data-label="Publisher" className="cell-muted">
                {game.publisher}
              </td>
              <td data-label="Year">{game.year_published}</td>
              <td data-label="Players">
                <span className="cell-meta">
                  {game.min_players}–{game.max_players}
                </span>
              </td>
              <td data-label="Time">
                <span className="cell-meta">{game.play_time_minutes} min</span>
              </td>
              <td data-label="Rating">
                <RatingBadge rating={game.rating} />
              </td>
              <td data-label="Tags">
                <ul className="tag-list">
                  {game.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </td>
              <td className="col-actions" data-label="Actions">
                <div className="row-actions">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => onEdit(game.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger-ghost btn-sm"
                    onClick={() => onDelete(game.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
