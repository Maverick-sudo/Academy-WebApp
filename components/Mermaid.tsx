'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidProps {
  code: string
}

export default function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const container = containerRef.current
    if (!container) return

    // Dynamic import - only load mermaid when component is used
    import('mermaid')
      .then((mermaidModule) => {
        if (!mounted || !container) return

        const mermaid = mermaidModule.default
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
        })

        const renderId = `mermaid-${Math.random().toString(36).slice(2)}`

        return mermaid.render(renderId, code)
      })
      .then((result) => {
        if (!mounted || !container || !result) return
        container.innerHTML = result.svg
        setIsLoading(false)
      })
      .catch((err) => {
        if (!mounted) return
        console.error('Mermaid render error:', err)
        setError(err.message || 'Failed to render diagram')
        setIsLoading(false)
        if (container) {
          container.textContent = code
        }
      })

    return () => {
      mounted = false
    }
  }, [code])

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4 my-4">
        <p className="text-red-800 dark:text-red-200 text-sm">Failed to render diagram: {error}</p>
        <pre className="text-xs mt-2 overflow-auto text-red-600 dark:text-red-300">{code}</pre>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded h-32" />
      )}
      <div ref={containerRef} className="mermaid-diagram" />
    </div>
  )
}