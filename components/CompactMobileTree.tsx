'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { SidebarItem } from '@/lib/sidebar'

interface CompactMobileTreeProps {
  open: boolean
  onClose: () => void
  data: SidebarItem[]
}

export default function CompactMobileTree({ open, onClose, data }: CompactMobileTreeProps) {
  const [openByParent, setOpenByParent] = useState<Record<string, string | null>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      setOpenByParent({})
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const container = containerRef.current
    if (!container) return
    container.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [open])

  const toggleNode = (parentId: string, id: string) => {
    setOpenByParent(prev => ({
      ...prev,
      [parentId]: prev[parentId] === id ? null : id,
    }))
  }

  const renderItems = (items: SidebarItem[], parentId: string, depth = 0) => (
    <ul className={`space-y-1${depth > 0 ? ' pl-3' : ''}`}>
      {items.map(item => {
        const hasChildren = Boolean(item.items && item.items.length > 0)
        const isOpen = openByParent[parentId] === item.id

        if (hasChildren) {
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggleNode(parentId, item.id)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]"
              >
                <span>{item.label}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={`${isOpen ? 'block' : 'hidden'} mt-1`}>
                {renderItems(item.items || [], item.id, depth + 1)}
              </div>
            </li>
          )
        }

        if (item.href) {
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block rounded-md px-2 py-1 text-sm hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]"
              >
                {item.label}
              </Link>
            </li>
          )
        }

        return (
          <li key={item.id}>
            <span className="block px-2 py-1 text-sm text-slate-500">
              {item.label}
            </span>
          </li>
        )
      })}
    </ul>
  )

  if (!open) return null

  return (
    <div
      ref={containerRef}
      className="w-full border-b border-[var(--border)] bg-[var(--background)] xl:hidden"
      role="navigation"
      aria-label="Mobile documentation navigation"
    >
      <nav className="max-w-7xl px-4 py-2">
        {renderItems(data, 'root', 0)}
      </nav>
    </div>
  )
}
