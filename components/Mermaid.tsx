'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

let mermaidInitialized = false

interface MermaidProps {
  code: string
}

export default function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
      })
      mermaidInitialized = true
    }

    const container = containerRef.current
    if (!container) {
      return
    }

    const renderId = `mermaid-${Math.random().toString(36).slice(2)}`

    mermaid
      .render(renderId, code)
      .then(({ svg }) => {
        if (container) {
          container.innerHTML = svg
        }
      })
      .catch(() => {
        if (container) {
          container.textContent = code
        }
      })
  }, [code])

  return <div ref={containerRef} className="mermaid-diagram" />
}