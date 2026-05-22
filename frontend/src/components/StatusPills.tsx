import type { ListControls } from '../hooks/useGames'

interface StatusPillsProps {
  controls: ListControls
  count: number
}

export function StatusPills({ controls, count }: StatusPillsProps) {
  return (
    <div className="status-pills" aria-label="Active view settings">
      <span className="pill">
        <strong>{count}</strong> games
      </span>
      <span className="pill">
        Filter <em>{controls.filterMode}</em>
      </span>
      <span className="pill">
        Sort <em>{controls.sortMode}</em>
      </span>
      <span className="pill pill-muted">
        {controls.primarySort} → {controls.secondarySort} ({controls.direction})
      </span>
    </div>
  )
}
