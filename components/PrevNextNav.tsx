import Link from 'next/link'
import { formatDisplayTitle } from '@/lib/title'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PrevNextNavProps {
  prev: { slug: string[]; title: string } | null
  next: { slug: string[]; title: string } | null
}

export default function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/docs/${prev.slug.join('/')}`}
            prefetch={true}
            className="group relative p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-3">
              <div className="mt-1 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                  Previous
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-snug">
                  {formatDisplayTitle(prev.title)}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {next && (
          <Link
            href={`/docs/${next.slug.join('/')}`}
            prefetch={true}
            className="group relative p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden md:text-right"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-3 md:flex-row-reverse">
              <div className="mt-1 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                  Next
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-snug">
                  {formatDisplayTitle(next.title)}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
