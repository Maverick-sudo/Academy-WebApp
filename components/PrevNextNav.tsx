'use client'

import Link from 'next/link'

interface PrevNextNavProps {
  prev: { slug: string[]; title: string } | null
  next: { slug: string[]; title: string } | null
}

export default function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/docs/${prev.slug.join('/')}`}
            className="group p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              ← Previous
            </div>
            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {next && (
          <Link
            href={`/docs/${next.slug.join('/')}`}
            className="group p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors md:text-right"
          >
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Next →
            </div>
            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {next.title}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
