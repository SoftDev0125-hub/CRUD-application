import type { ProcessingMode } from '../hooks/useGames'

interface ModeToggleProps {
  label: string
  value: ProcessingMode
  onChange: (mode: ProcessingMode) => void
}

const options: { value: ProcessingMode; label: string; hint: string }[] = [
  { value: 'server', label: 'Server', hint: 'API handles this' },
  { value: 'client', label: 'Client', hint: 'Browser handles this' },
]

export function ModeToggle({ label, value, onChange }: ModeToggleProps) {
  return (
    <div className="mode-toggle-wrap">
      <span className="mode-toggle-label">{label}</span>
      <div
        className="segmented"
        role="group"
        aria-label={label}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={value === opt.value ? 'segment active' : 'segment'}
            onClick={() => onChange(opt.value)}
            title={opt.hint}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
