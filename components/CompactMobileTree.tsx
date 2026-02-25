'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link2 } from 'lucide-react'
import type { SidebarItem } from '@/lib/sidebar'

interface CompactMobileTreeProps {
  open: boolean
  onClose: () => void
  data: SidebarItem[]
}

export default function CompactMobileTree({ open, onClose, data }: CompactMobileTreeProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  const expandableIds = useMemo(() => {
    const ids: string[] = []
    const walk = (items: SidebarItem[]) => {
      items.forEach(item => {
        if (item.items && item.items.length > 0) {
          ids.push(item.id)
          walk(item.items)
        }
      })
    }
    walk(data)
    return ids
  }, [data])

  useEffect(() => {
    if (!open) {
      setExpandedSections(new Set())
      return
    }

    setExpandedSections(new Set(expandableIds))
  }, [open, expandableIds])

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const renderItems = (items: SidebarItem[], depth = 0) => (
    <ul className={`space-y-1${depth > 0 ? ' pl-3' : ''}`}>
      {items.map(item => {
        const hasChildren = Boolean(item.items && item.items.length > 0)
        const isOpen = expandedSections.has(item.id)
        const isActive = Boolean(item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`)))

        if (hasChildren) {
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggleSection(item.id)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]"
                aria-controls={`mobile-section-${item.id}`}
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
              <div id={`mobile-section-${item.id}`} className={`${isOpen ? 'block' : 'hidden'} mt-1`}>
                {renderItems(item.items || [], depth + 1)}
              </div>
            </li>
          )
        }

        if (item.href) {
          return (
            <li key={item.id}>
              <div
                className={`flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)] text-slate-700 dark:text-[var(--sidebar-foreground)]'
                }`}
              >
                <span>{item.label}</span>
                <Link
                  href={item.href}
                  onClick={onClose}
                  prefetch={depth > 0 ? false : undefined}
                  aria-label={`Open ${item.label}`}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:border-blue-500 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  <Link2 className="h-3.5 w-3.5" />
                </Link>
              </div>
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

  return (
    <nav
      role="navigation"
      aria-label="Mobile documentation navigation"
      className="space-y-2"
    >
      {renderItems(data, 0)}
    </nav>
  )
}
