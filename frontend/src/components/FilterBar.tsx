import type { ListControls } from '../hooks/useGames'
import { INPUT_LIMITS } from '../utils/inputLimits'
import { ModeToggle } from './ModeToggle'

interface FilterBarProps {
  controls: ListControls
  onChange: <K extends keyof ListControls>(
    key: K,
    value: ListControls[K],
  ) => void
  onApply: () => void
  onReset: () => void
  tagOptions: string[]
}

export function FilterBar({
  controls,
  onChange,
  onApply,
  onReset,
  tagOptions,
}: FilterBarProps) {
  return (
    <section className="card control-card" aria-label="Filters">
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-icon" aria-hidden>
            ⌕
          </span>
          <div>
            <h2>Find games</h2>
            <p className="card-desc">Search by name or narrow by tag</p>
          </div>
        </div>
        <ModeToggle
          label="Filter runs on"
          value={controls.filterMode}
          onChange={(mode) => onChange('filterMode', mode)}
        />
      </div>

      <div className="control-fields">
        <label className="field field-grow">
          <span className="field-label">Search</span>
          <input
            type="search"
            className="input input-search"
            placeholder="Title, designer, publisher…"
            maxLength={INPUT_LIMITS.search}
            value={controls.search}
            onChange={(e) => onChange('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onApply()}
          />
        </label>

        <label className="field">
          <span className="field-label">Tag</span>
          <select
            className="input"
            value={controls.tag}
            onChange={(e) => onChange('tag', e.target.value)}
          >
            <option value="">All tags</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card-footer">
        <p className="field-hint">
          {controls.filterMode === 'server'
            ? 'Queries are sent to the API when you apply.'
            : 'Filtering happens in the browser on loaded results.'}
        </p>
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={onApply}>
            Apply
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            Reset all
          </button>
        </div>
      </div>
    </section>
  )
}
