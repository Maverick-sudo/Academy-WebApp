"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SidebarItem } from '@/lib/sidebar'
import { useState, useEffect, useRef } from 'react'

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
                    aria-hidden
                  >
                    <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div id={`menu-${section.id}`} className={`${isOpen ? 'block' : 'hidden'} mt-2 pl-2`}>
                  {section.items && section.items.map(item => (
                    <div key={item.id} className="mb-1">
                      {item.href ? (
                        <a
                          href={item.href}
                          onClick={async (e) => {
                            e.preventDefault()
                            try {
                              await router.push(item.href)
                            } finally {
                              onClose()
                            }
                          }}
                          className="block px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-[var(--sidebar-accent)]"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <div className="px-2 py-1 text-sm">{item.label}</div>
                      )}

                      {item.items && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.items.map(child => (
                            child.href ? (
                              <a
                                key={child.id}
                                href={child.href}
                                onClick={async (e) => {
                                  e.preventDefault()
                                  try {
                                    await router.push(child.href)
                                  } finally {
                                    onClose()
                                  }
                                }}
                                className="block px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-[var(--sidebar-accent)] text-sm"
                              >
                                {child.label}
                              </a>
                            ) : (
                              <div key={child.id} className="px-2 py-1 text-sm">{child.label}</div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
