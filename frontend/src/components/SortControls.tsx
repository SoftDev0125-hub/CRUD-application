import type { ListControls } from '../hooks/useGames'
import type { SortDirection, SortField } from '../types/game'
import { ModeToggle } from './ModeToggle'

interface SortControlsProps {
  controls: ListControls
  onChange: <K extends keyof ListControls>(
    key: K,
    value: ListControls[K],
  ) => void
  onApply: () => void
}

const sortFields: { value: SortField; label: string }[] = [
  { value: 'designer', label: 'Designer' },
  { value: 'title', label: 'Title' },
  { value: 'publisher', label: 'Publisher' },
  { value: 'year_published', label: 'Year' },
  { value: 'rating', label: 'Rating' },
  { value: 'play_time_minutes', label: 'Play time' },
]

export function SortControls({ controls, onChange, onApply }: SortControlsProps) {
  return (
    <section className="card control-card" aria-label="Sorting">
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-icon" aria-hidden>
            ↕
          </span>
          <div>
            <h2>Order list</h2>
            <p className="card-desc">Primary field, then tiebreaker</p>
          </div>
        </div>
        <ModeToggle
          label="Sort runs on"
          value={controls.sortMode}
          onChange={(mode) => onChange('sortMode', mode)}
        />
      </div>

      <div className="control-fields control-fields-3">
        <label className="field">
          <span className="field-label">Primary</span>
          <select
            className="input"
            value={controls.primarySort}
            onChange={(e) =>
              onChange('primarySort', e.target.value as SortField)
            }
          >
            {sortFields.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Then by</span>
          <select
            className="input"
            value={controls.secondarySort}
            onChange={(e) =>
              onChange('secondarySort', e.target.value as SortField)
            }
          >
            {sortFields.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Direction</span>
          <select
            className="input"
            value={controls.direction}
            onChange={(e) =>
              onChange('direction', e.target.value as SortDirection)
            }
          >
            <option value="asc">A → Z / Low → High</option>
            <option value="desc">Z → A / High → Low</option>
          </select>
        </label>
      </div>

      <div className="card-footer">
        <p className="field-hint">
          When two rows share the same primary value, the secondary field
          decides order (e.g. designer, then title).
        </p>
        <button type="button" className="btn btn-primary" onClick={onApply}>
          Apply
        </button>
      </div>
    </section>
  )
}
