'use client'

import { useEffect } from 'react'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  contentClassName?: string
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  children,
  contentClassName,
}: MobileNavDrawerProps) {
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-0 z-[60] overflow-y-auto overscroll-contain overflow-x-hidden ${
          contentClassName
            ? contentClassName
            : 'bg-neutral-950 text-white dark:bg-[var(--background)] dark:text-[var(--foreground)]'
        }`}
      >
        <div className="min-h-full px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
