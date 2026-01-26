'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult {
  title: string
  description?: string
  slug: string
  excerpt: string
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setResults([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Debounced search
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
        setSelectedIndex(0)
      } catch (error) {
        console.error('Search failed:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      router.push(`/docs/${results[selectedIndex].slug}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-md hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-800 rounded">
          ⌘K
        </kbd>
      </button>
    )
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => {
          setIsOpen(false)
          setQuery('')
        }}
      />

      {/* Search modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            {isLoading && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600" />
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <Link
                  key={result.slug}
                  href={`/docs/${result.slug}`}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className={`block px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 ${
                    index === selectedIndex
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {result.title}
                  </div>
                  {result.description && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {result.description}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {result.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {query.length >= 2 && !isLoading && results.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              No results found for "{query}"
            </div>
          )}

          {/* Help text */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">Enter</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">Esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
