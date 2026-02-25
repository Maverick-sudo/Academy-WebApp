import Link from 'next/link'
import { BookOpen } from 'lucide-react'

interface CourseCardProps {
  slug: string
  title: string
  description: string
  chapterCount: number
  duration?: string
  difficulty?: string
}

export default function CourseCard({
  slug,
  title,
  description,
  chapterCount,
  duration,
  difficulty,
}: CourseCardProps) {
  return (
    <Link
      href={`/learn/${slug}`}
      className="group rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{chapterCount} chapters</p>
          </div>
        </div>
        {difficulty && (
          <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
            {difficulty}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>{duration || 'Self-paced'}</span>
        <span className="font-medium text-blue-600 dark:text-blue-400">View course →</span>
      </div>
    </Link>
  )
}
