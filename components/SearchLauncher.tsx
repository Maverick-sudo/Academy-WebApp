'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Search = dynamic(() => import('./Search'), {
  ssr: false,
  loading: () => (
    <button
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-md"
      aria-label="Loading search"
      disabled
    >
      <span>Search</span>
    </button>
  ),
})

export default function SearchLauncher() {
  const [loadSearch, setLoadSearch] = useState(false)
  const [openOnLoad, setOpenOnLoad] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setLoadSearch(true)
        setOpenOnLoad(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (openOnLoad) {
      const id = window.setTimeout(() => setOpenOnLoad(false), 0)
      return () => window.clearTimeout(id)
    }
  }, [openOnLoad])

  if (!loadSearch) {
    return (
      <button
        onClick={() => {
          setLoadSearch(true)
          setOpenOnLoad(true)
        }}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-md hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded">
          ⌘K
        </kbd>
      </button>
    )
  }

  return <Search initialOpen={openOnLoad} enableShortcut={false} />
}
