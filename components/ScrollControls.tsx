'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface ScrollControlsProps {
  threshold?: number
}

export default function ScrollControls({ threshold = 200 }: ScrollControlsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  if (!isVisible) return null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    const doc = document.documentElement
    window.scrollTo({ top: doc.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-2 xl:hidden">
      <button
        type="button"
        onClick={scrollToTop}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--sidebar)] shadow-md hover:bg-[var(--sidebar-accent)]"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={scrollToBottom}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--sidebar)] shadow-md hover:bg-[var(--sidebar-accent)]"
        aria-label="Scroll to bottom"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
    </div>
  )
}
