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

    // Normalize incoming code to avoid common parser pitfalls (HTML <br/>, CRLF, box-drawing chars)
    const normalize = (input: string) => {
      return input
        .replace(/<br\s*\/?>/gi, '\\n')
        .replace(/\r\n/g, '\n')
        .replace(/\u2500+/g, '---')
        .trim()
    }

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
        const normalized = normalize(code)

        // Try a parse check first to provide a cleaner error message when possible
        try {
          // mermaid.parse throws on invalid diagrams in many versions
          // @ts-ignore - some mermaid builds expose `parse`
          if (typeof mermaid.parse === 'function') mermaid.parse(normalized)
        } catch (parseErr: any) {
          throw new Error(parseErr?.message || 'Mermaid parse failed')
        }

        return mermaid.render(renderId, normalized)
      })
      .then((result) => {
        if (!mounted || !container || !result) return
        // result may be a string or an object with `svg`
        if (typeof result === 'string') {
          container.innerHTML = result
        } else if (result && typeof result === 'object') {
          container.innerHTML = (result as any).svg || String(result)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        if (!mounted) return
        console.error('Mermaid render error:', err)
        setError(err?.message || String(err) || 'Failed to render diagram')
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
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 animate-pulse rounded h-32" />
      )}
      <div ref={containerRef} className="mermaid-diagram" />
    </div>
  )
}