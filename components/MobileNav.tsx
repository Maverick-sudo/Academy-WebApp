"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SidebarItem } from '@/lib/sidebar'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import Spinner from './Spinner'

interface ExpandedState {
  [id: string]: boolean
}

interface MobileNavProps {
  open: boolean
  onClose: () => void
  data: SidebarItem[]
}

export default function MobileNav({ open, onClose, data }: MobileNavProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const FOCUSABLE_SELECTORS = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const container = navRef.current
        if (!container) return
        const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1)
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    // Save previous focus and move focus into the nav
    previousFocusRef.current = document.activeElement as HTMLElement | null
    // Delay focusing the first element to allow the menu to become visible
    const focusTimer = window.setTimeout(() => {
      const container = navRef.current
      if (!container) return
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1)
      if (focusable.length) {
        focusable[0].focus()
      } else {
        // fallback: focus the container so keyboard users are inside the trap
        container.focus()
      }
    }, 0)

    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  // Restore focus when menu closes
  useEffect(() => {
    if (open) return
    const prev = previousFocusRef.current
    if (prev && typeof prev.focus === 'function') prev.focus()
    previousFocusRef.current = null
  }, [open])

  const toggleSection = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const renderItems = (items: SidebarItem[], depth = 0) => (
    <div className={depth === 0 ? '' : 'pl-4 mt-1 space-y-1'}>
      {items.map(item => {
        const hasChildren = Boolean(item.items && item.items.length > 0)
        const isExpanded = Boolean(expanded[item.id])

        if (hasChildren) {
          return (
            <div key={item.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleSection(item.id)}
                className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-[var(--sidebar-accent)] text-sm font-medium"
              >
                <span>{item.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`${isExpanded ? 'block' : 'hidden'} mt-1`}>
                {item.items && renderItems(item.items, depth + 1)}
              </div>
            </div>
          )
        }

        if (item.href) {
          const isNavigating = navigatingTo === item.href
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={async (e) => {
                e.preventDefault()
                if (!item.href) return

                console.log('[MobileNav] Navigating to:', item.href)
                setNavigatingTo(item.href)

                try {
                  console.log('[MobileNav] Calling router.push...')
                  await router.push(item.href)
                  console.log('[MobileNav] Navigation successful')
                } catch (error) {
                  console.error('[MobileNav] Navigation error:', error)
                  toast.error('Navigation failed. Please try again.')
                } finally {
                  console.log('[MobileNav] Cleaning up and closing menu')
                  setNavigatingTo(null)
                  onClose()
                }
              }}
              className={`flex items-center px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-[var(--sidebar-accent)] text-sm ${isNavigating ? 'pointer-events-none opacity-50' : ''}`}
            >
              {item.label}
              {isNavigating && (
                <span className="ml-2"><Spinner size="sm" /></span>
              )}
            </a>
          )
        }

        return (
          <div key={item.id} className="px-2 py-1 text-sm text-slate-500">
            {item.label}
          </div>
        )
      })}
    </div>
  )

  // Rendered inline above the main content; hidden at xl
  return (
    <div
      ref={navRef}
      tabIndex={-1}
      className={`w-full bg-[var(--background)] border-b border-[var(--border)] xl:hidden ${open ? 'block' : 'hidden'}`}
      role="navigation"
      aria-label="Mobile documentation navigation"
    >
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="space-y-2">
          {data.map(section => {
            const isOpen = Boolean(expanded[section.id])
            return (
              <div key={section.id} className="bg-transparent">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`menu-${section.id}`}
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]"
                >
                  <span className="font-semibold text-left">{section.label}</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div id={`menu-${section.id}`} className={`${isOpen ? 'block' : 'hidden'} mt-2 pl-2`}>
                  {section.items && renderItems(section.items)}
                </div>
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
