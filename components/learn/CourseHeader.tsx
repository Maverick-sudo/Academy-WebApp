interface CourseHeaderProps {
  title: string
  description: string
  duration?: string
  difficulty?: string
  chapterCount?: number
}

export default function CourseHeader({
  title,
  description,
  duration,
  difficulty,
  chapterCount,
}: CourseHeaderProps) {
  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-gradient-to-br from-white via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/40 p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
        {difficulty && (
          <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {difficulty}
          </span>
        )}
      </div>
      <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
        {chapterCount !== undefined && <span>{chapterCount} chapters</span>}
        <span>{duration || 'Self-paced'}</span>
      </div>
    </div>
  )
}
