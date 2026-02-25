interface CalloutProps {
  title?: string
  tone?: 'info' | 'success' | 'warning'
  children: React.ReactNode
}

const toneStyles: Record<NonNullable<CalloutProps['tone']>, string> = {
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-950/30 dark:text-blue-100',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-100',
  warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-100',
}

export default function Callout({ title, tone = 'info', children }: CalloutProps) {
  return (
    <div className={`rounded-2xl border px-5 py-4 ${toneStyles[tone]}`}>
      {title && <div className="text-sm font-semibold uppercase tracking-wide mb-2">{title}</div>}
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  )
}
