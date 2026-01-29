'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DocError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Doc rendering error:', error)
  }, [error])

  return (
    <div className="w-full max-w-4xl py-8 lg:py-12">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
          Failed to load document
        </h2>
        <p className="text-red-700 dark:text-red-300 mb-4">
          {error.message || 'The document could not be rendered'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
          <Link
            href="/docs/study-notes"
            className="px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            Back to docs
          </Link>
        </div>
      </div>
    </div>
  )
}
