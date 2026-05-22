import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="currentColor" />
              <circle cx="14" cy="14" r="3" fill="var(--surface)" />
              <circle cx="26" cy="14" r="3" fill="var(--surface)" />
              <circle cx="20" cy="26" r="3" fill="var(--surface)" />
              <circle cx="14" cy="20" r="2" fill="var(--surface)" opacity="0.7" />
              <circle cx="26" cy="20" r="2" fill="var(--surface)" opacity="0.7" />
            </svg>
          </div>
          <div className="brand-copy">
            <h1>Tabletop Shelf</h1>
            <p className="subtitle">
              Curate, search, and organize your board game collection in one place.
            </p>
          </div>
        </div>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <span>Board game collection manager</span>
        <span className="footer-dot" aria-hidden>
          ·
        </span>
        <span>React + TypeScript</span>
      </footer>
    </div>
  )
}
