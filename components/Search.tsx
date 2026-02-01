'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDisplayTitle } from '@/lib/title'

interface SearchResult {
  title: string
  description: string | undefined
  slug: string
  excerpt: string
  score: number
}

interface SearchProps {
  initialOpen?: boolean
  enableShortcut?: boolean
}

export default function Search({ initialOpen = false, enableShortcut = true }: SearchProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const backgroundTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const router = useRouter()

  // Initialize Web Worker
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Worker) {
      workerRef.current = new Worker('/search.worker.js')
      
      workerRef.current.onmessage = (event) => {
        const { type, results: workerResults } = event.data
        if (type === 'RESULTS') {
          setResults(workerResults.slice(0, 10))
          setSelectedIndex(0)
          setIsLoading(false)
        }
      }

      workerRef.current.onerror = (error) => {
        console.error('Search worker error:', error)
        setIsLoading(false)
      }

      return () => {
        workerRef.current?.terminate()
      }
    }
  }, [])

  useEffect(() => {
    if (initialOpen) {
      setIsOpen(true)
    }
  }, [initialOpen])

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    if (!enableShortcut) return

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
  }, [enableShortcut])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle search with smart chunked loading
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }
    if (backgroundTimerRef.current) {
      clearTimeout(backgroundTimerRef.current)
      backgroundTimerRef.current = null
    }

    if (query.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const queryLower = query.toLowerCase()
    setIsLoading(true)
    let isActive = true
    
    // Debounced search - client-side using chunked JSON indices
    debounceTimerRef.current = setTimeout(async () => {
      try {
        // Detect current repo from URL path
        const pathname = window.location.pathname
        const pathMatch = pathname.match(/\/docs\/([^\/]+)/)
        const currentRepo = pathMatch ? pathMatch[1] : null
        
        // Fetch manifest to get latest versions
        const manifestResponse = await fetch('/search-index-manifest.json')
        const manifest = await manifestResponse.json()
        const fullFiles = manifest?.files ?? {}
        const fastFiles = manifest?.fastFiles ?? {}

        const repoKey = currentRepo
          ? Object.keys(fullFiles).find(key => key.toLowerCase() === currentRepo.toLowerCase())
          : null
        
        // Load current repo fast chunk first for initial results
        let fastDocs: any[] = []

        if (repoKey) {
          const fastPath = fastFiles[repoKey] ?? fullFiles[repoKey]
          if (fastPath) {
            try {
              const currentRepoResponse = await fetch(`/${fastPath}`)
              const currentRepoDocs = await currentRepoResponse.json()
              fastDocs = Array.isArray(currentRepoDocs) ? currentRepoDocs : []
            } catch (error) {
              console.warn(`Failed to load current repo chunk: ${repoKey}`, error)
            }
          }
        }

        // Lazy-load full repo chunks in background after 2 seconds
        backgroundTimerRef.current = setTimeout(async () => {
          try {
            const repoKeys = Object.keys(fullFiles)
            const otherDocsPromises = repoKeys.map(async (repo) => {
              try {
                const response = await fetch(`/${fullFiles[repo]}`)
                const docs = await response.json()
                return Array.isArray(docs) ? docs : []
              } catch (error) {
                console.warn(`Failed to load repo chunk: ${repo}`, error)
                return []
              }
            })
            
            const otherDocsArrays = await Promise.allSettled(otherDocsPromises)
            const otherDocs = otherDocsArrays
              .filter((result): result is PromiseFulfilledResult<any[]> => result.status === 'fulfilled')
              .flatMap(result => result.value)
            
            // Merge and re-search with all docs (using Web Worker)
            const mergedDocs = mergeDocs(fastDocs, otherDocs)
            if (workerRef.current) {
              workerRef.current.postMessage({ type: 'SEARCH', docs: mergedDocs, query: queryLower })
            } else {
              // Fallback to main thread
              const updatedResults = performSearch(mergedDocs, queryLower).filter(r => r !== null) as SearchResult[]
              if (isActive) {
                setResults(updatedResults)
                setSelectedIndex(0)
              }
            }
          } catch (error) {
            console.warn('Failed to load full search index:', error)
          }
        }, 2000)

        // Show initial results from current repo (using Web Worker)
        if (workerRef.current && fastDocs.length > 0) {
          workerRef.current.postMessage({ type: 'SEARCH', docs: fastDocs, query: queryLower })
        } else {
          // Fallback to main thread if worker not available
          const searchResults = performSearch(fastDocs, queryLower).filter(r => r !== null) as SearchResult[]
          if (isActive) {
            setResults(searchResults)
            setSelectedIndex(0)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error('Search failed:', error)
        if (isActive) {
          setResults([])
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }, 300)

    return () => {
      isActive = false
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
      if (backgroundTimerRef.current) {
        clearTimeout(backgroundTimerRef.current)
        backgroundTimerRef.current = null
      }
    }
  }, [query])
  
  // Extract search logic into reusable function
  const performSearch = (docs: any[], queryLower: string) => {
    return docs
      .map((doc: any) => {
        const title = typeof doc?.title === 'string' ? doc.title : ''
        const description = typeof doc?.description === 'string' ? doc.description : ''
        const content = typeof doc?.content === 'string' ? doc.content : ''
        const slug = typeof doc?.slug === 'string' ? doc.slug : ''

        if (!slug) return null

        const titleMatch = title.toLowerCase().includes(queryLower)
        const descriptionMatch = description.toLowerCase().includes(queryLower)
        const contentMatch = content.toLowerCase().includes(queryLower)
        
        if (!titleMatch && !descriptionMatch && !contentMatch) {
          return null
        }

        // Calculate relevance score
        let score = 0
        if (titleMatch) score += 10
        if (descriptionMatch) score += 5
        if (contentMatch) score += 1

        // Extract excerpt
        const contentLower = content.toLowerCase()
        const queryIndex = contentLower.indexOf(queryLower)
        let excerpt = ''
        
        if (queryIndex !== -1 && content.length > 0) {
          const start = Math.max(0, queryIndex - 50)
          const end = Math.min(content.length, queryIndex + 100)
          excerpt = (start > 0 ? '...' : '') + 
                   content.slice(start, end).trim() + 
                   (end < content.length ? '...' : '')
        } else if (content.length > 0) {
          excerpt = content.slice(0, 150).trim() + '...'
        } else if (description) {
          excerpt = description
        }

        return {
          title,
          description: description || undefined,
          slug,
          excerpt,
          score,
        }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 10)
  }

  const mergeDocs = (baseDocs: any[], extraDocs: any[]) => {
    const bySlug = new Map<string, any>()
    for (const doc of baseDocs) {
      if (doc?.slug) {
        bySlug.set(String(doc.slug), doc)
      }
    }
    for (const doc of extraDocs) {
      if (doc?.slug) {
        bySlug.set(String(doc.slug), doc)
      }
    }
    return Array.from(bySlug.values())
  }

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
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 px-4 py-4 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            {isLoading && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-300 border-t-blue-600" />
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
                  className={`block px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                    index === selectedIndex
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {formatDisplayTitle(result.title)}
                  </div>
                  {result.description && (
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {result.description}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    {result.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {query.length >= 2 && !isLoading && results.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {/* Help text */}
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">Enter</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">Esc</kbd>
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
