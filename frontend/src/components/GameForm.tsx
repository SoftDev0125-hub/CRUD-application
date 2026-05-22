import { useEffect, useState, type FormEvent } from 'react'
import type { BoardGame, GameInput } from '../types/game'
import { EnrichmentPanel } from './EnrichmentPanel'

interface GameFormProps {
  mode: 'create' | 'edit'
  initial?: BoardGame | null
  onSubmit: (input: GameInput, id?: number) => Promise<void>
  onCancel: () => void
}

const emptyInput: GameInput = {
  title: '',
  designer: '',
  publisher: '',
  year_published: new Date().getFullYear(),
  min_players: 2,
  max_players: 4,
  play_time_minutes: 60,
  rating: 7,
  tags: [],
}

export function GameForm({ mode, initial, onSubmit, onCancel }: GameFormProps) {
  const [form, setForm] = useState<GameInput>(emptyInput)
  const [tagsText, setTagsText] = useState('')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        designer: initial.designer,
        publisher: initial.publisher,
        year_published: initial.year_published,
        min_players: initial.min_players,
        max_players: initial.max_players,
        play_time_minutes: initial.play_time_minutes,
        rating: initial.rating,
        tags: initial.tags,
      })
      setTagsText(initial.tags.join(', '))
    } else {
      setForm(emptyInput)
      setTagsText('')
    }
  }, [initial])

  const update = <K extends keyof GameInput>(key: K, value: GameInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setFormError(null)

    const tags = tagsText
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)

    if (form.min_players > form.max_players) {
      setFormError('Min players cannot exceed max players.')
      setSaving(false)
      return
    }

    try {
      await onSubmit({ ...form, tags }, initial?.id)
    } catch {
      setFormError('Could not save. Check the API is running.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="modal form-modal"
        role="dialog"
        aria-labelledby="form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-layout">
          <form className="game-form" onSubmit={handleSubmit}>
            <header className="form-header">
              <h2 id="form-title">
                {mode === 'create' ? 'Add to shelf' : 'Edit game'}
              </h2>
              <button
                type="button"
                className="btn btn-icon btn-secondary"
                onClick={onCancel}
                aria-label="Close"
              >
                ✕
              </button>
            </header>

            <div className="form-grid">
              <label className="field field-span-2">
                <span className="field-label">Title *</span>
                <input
                  className="input"
                  required
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                />
              </label>
              <label className="field">
                <span className="field-label">Designer *</span>
                <input
                  className="input"
                  required
                  value={form.designer}
                  onChange={(e) => update('designer', e.target.value)}
                />
              </label>
              <label className="field">
                <span className="field-label">Publisher *</span>
                <input
                  className="input"
                  required
                  value={form.publisher}
                  onChange={(e) => update('publisher', e.target.value)}
                />
              </label>
              <label className="field">
                <span className="field-label">Year</span>
                <input
                  className="input"
                  type="number"
                  min={1900}
                  max={2100}
                  value={form.year_published}
                  onChange={(e) =>
                    update('year_published', Number(e.target.value))
                  }
                />
              </label>
              <label className="field">
                <span className="field-label">Rating (1–10)</span>
                <input
                  className="input"
                  type="number"
                  min={1}
                  max={10}
                  step={0.1}
                  value={form.rating}
                  onChange={(e) => update('rating', Number(e.target.value))}
                />
              </label>
              <label className="field">
                <span className="field-label">Min players</span>
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={form.min_players}
                  onChange={(e) =>
                    update('min_players', Number(e.target.value))
                  }
                />
              </label>
              <label className="field">
                <span className="field-label">Max players</span>
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={form.max_players}
                  onChange={(e) =>
                    update('max_players', Number(e.target.value))
                  }
                />
              </label>
              <label className="field">
                <span className="field-label">Play time (minutes)</span>
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={form.play_time_minutes}
                  onChange={(e) =>
                    update('play_time_minutes', Number(e.target.value))
                  }
                />
              </label>
              <label className="field field-span-2">
                <span className="field-label">Tags (comma-separated)</span>
                <input
                  className="input"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="euro, cooperative, deck-building"
                />
              </label>
            </div>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <div className="btn-group form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Saving…' : mode === 'create' ? 'Create game' : 'Save changes'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>

          {mode === 'edit' && initial && (
            <EnrichmentPanel gameId={initial.id} gameTitle={initial.title} />
          )}
        </div>
      </div>
    </div>
  )
}
