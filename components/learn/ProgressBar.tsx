interface ProgressBarProps {
  value: number
  max?: number
  label?: string
}

export default function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className="space-y-2">
      {label && <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</div>}
      <progress
        className="progress-bar"
        value={percentage}
        max={100}
        aria-label={label ?? 'Progress'}
      />
    </div>
  )
}
