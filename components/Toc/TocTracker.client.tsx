'use client'

import { useEffect, useState } from 'react'

interface TocTrackerProps {
  headings: Array<{ id: string; text: string; level: number }>
  onActiveChange?: (id: string) => void
}

export default function TocTracker({ headings, onActiveChange }: TocTrackerProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    let observer: IntersectionObserver | null = null
    let cancelled = false

    const setupObserver = () => {
      if (cancelled) return

      // Query DOM for rendered headings
      const headingElements = headings
        .map(h => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null)

      if (headingElements.length === 0) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id
              setActiveId(id)
              onActiveChange?.(id)
            }
          })
        },
        { rootMargin: '-100px 0px -66%' }
      )

      headingElements.forEach((el) => observer?.observe(el))
    }

    const idleApi = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }

    const idleId = idleApi.requestIdleCallback
      ? idleApi.requestIdleCallback(setupObserver)
      : window.setTimeout(setupObserver, 0)

    return () => {
      cancelled = true
      if (observer) observer.disconnect()
      if (idleApi.cancelIdleCallback) {
        idleApi.cancelIdleCallback(idleId as number)
      } else {
        window.clearTimeout(idleId as number)
      }
    }
  }, [headings, onActiveChange])

  return null // This is a logic-only component
}
