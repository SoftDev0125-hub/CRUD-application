import { useEffect, useState } from 'react'
import { gamesApi } from '../api/games'
import type { GameEnrichment } from '../types/game'

interface EnrichmentPanelProps {
  gameId: number
  gameTitle: string
}

export function EnrichmentPanel({ gameId, gameTitle }: EnrichmentPanelProps) {
  const [data, setData] = useState<GameEnrichment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)

    gamesApi
      .enrichment(gameId)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [gameId])

  return (
    <aside className="enrichment-panel" aria-label="Wikipedia enrichment">
      <div className="enrichment-header">
        <span className="enrichment-badge">Wikipedia</span>
        <h3>Extra context</h3>
      </div>
      <p className="enrichment-subtitle">About {gameTitle}</p>

      {loading && <p className="enrichment-loading">Loading…</p>}
      {error && <p className="form-error">{error}</p>}

      {data && (
        <>
          {data.thumbnail_url && (
            <img
              src={data.thumbnail_url}
              alt=""
              className="enrichment-thumb"
            />
          )}
          <p className="enrichment-summary">{data.summary}</p>
          <a
            href={data.wikipedia_url}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Read on Wikipedia →
          </a>
        </>
      )}
    </aside>
  )
}
