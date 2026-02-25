import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ChapterLink {
  slug: string
  title: string
}

interface PrevNextNavProps {
  courseSlug: string
  previous?: ChapterLink | null
  next?: ChapterLink | null
}

export default function PrevNextNav({ courseSlug, previous, next }: PrevNextNavProps) {
  return (
    <div className="sticky bottom-0 z-10 mt-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur px-4 py-4 rounded-b-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previous ? (
          <Link
            href={`/learn/${courseSlug}/${previous.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {previous.title}
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-400 dark:text-slate-600">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </span>
        )}

        {next ? (
          <Link
            href={`/learn/${courseSlug}/${next.slug}`}
            className="inline-flex items-center justify-end gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {next.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center justify-end gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-400 dark:text-slate-600">
            Next
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  )
}
