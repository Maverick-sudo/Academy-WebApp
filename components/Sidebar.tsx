'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SidebarItem } from '@/lib/sidebar'

const Tooltip = dynamic(() => import('@/components/ui/Tooltip'), { ssr: false })

interface SidebarProps {
  data: SidebarItem[]
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export default function Sidebar({ 
  data, 
  isOpen, 
  onClose, 
  isCollapsed = false,
  onToggleCollapse 
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [isDesktop, setIsDesktop] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Treat widths >= 1280px as desktop; tablets (<1280px) will behave like mobile.
    const mediaQuery = window.matchMedia('(min-width: 1280px)')
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches)
    updateIsDesktop()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateIsDesktop)
      return () => mediaQuery.removeEventListener('change', updateIsDesktop)
    }

    mediaQuery.addListener(updateIsDesktop)
    return () => mediaQuery.removeListener(updateIsDesktop)
  }, [])

  const isCollapsedDesktop = isCollapsed && isDesktop

  // Sidebar padding: match content rhythm when expanded, but use smaller
  // horizontal padding when collapsed (desktop only).
  const asidePadding = isCollapsedDesktop ? 'px-1 xl:px-1' : 'px-4 xl:px-6'

  const toggleSection = useCallback((sectionId: string) => {
    // Don't allow expanding sections when collapsed
    if (isCollapsedDesktop) return

    setExpandedSections(prev => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId)
      } else {
        newExpanded.add(sectionId)
      }
      return newExpanded
    })
  }, [isCollapsedDesktop])

  const activeSectionId = useMemo(() => {
    if (!pathname.startsWith('/docs/')) return 'home'
    const repoSlug = pathname.split('/')[2]
    return repoSlug ? repoSlug.toLowerCase() : 'home'
  }, [pathname])

  const getIsExpanded = useCallback((id: string) => expandedSections.has(id), [expandedSections])

  useEffect(() => {
    // Auto-expand sections containing active page (only when not collapsed)
    if (!isCollapsedDesktop && activeSectionId) {
      setExpandedSections(new Set([activeSectionId]))
    }
  }, [activeSectionId, isCollapsedDesktop])

  return (
    <>
      {/* Desktop Sidebar - Only visible at xl breakpoint (>=1280px) */}
      <aside
        className={`
          hidden xl:block
          xl:sticky top-16 left-0 h-[calc(100vh-4rem)]
          bg-white dark:bg-[var(--sidebar)] border-r border-slate-200 dark:border-[var(--sidebar-border)]
          overflow-y-auto z-70 relative shadow-xl
          transition-[width] duration-150 ease-in-out
          ${isCollapsedDesktop ? 'xl:w-16' : 'xl:w-72'}
          ${asidePadding}
        `}
      >
        <nav className="py-4 space-y-1 pb-16">
          {data.map((section) => (
            <SidebarSection 
              key={section.id} 
              section={section} 
              pathname={pathname}
              isExpanded={getIsExpanded(section.id)}
              getIsExpanded={getIsExpanded}
              toggleSection={toggleSection}
              depth={0}
              isCollapsed={isCollapsedDesktop}
              onClose={onClose}
              isDesktop={isDesktop}
            />
          ))}
        </nav>

        {/* Collapse toggle button (desktop only) */}
        <div className="hidden xl:flex items-center justify-between px-2 py-2 border-t border-slate-200 dark:border-[var(--sidebar-border)] absolute bottom-0 left-0 right-0 bg-white dark:bg-[var(--sidebar)]">
          <button
            onClick={onToggleCollapse}
            className={cn(
              "flex items-center gap-2 rounded-md transition-colors",
              "hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]",
              "text-slate-600 dark:text-[var(--sidebar-foreground)]",
              isCollapsedDesktop ? "w-full justify-center p-1.5" : "w-full px-3 py-2"
            )}
            aria-label={isCollapsedDesktop ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsedDesktop ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

interface SidebarSectionProps {
  section: SidebarItem
  pathname: string
  isExpanded: boolean
  getIsExpanded: (id: string) => boolean
  toggleSection: (id: string) => void
  depth: number
  isCollapsed: boolean
  onClose?: () => void
  isDesktop?: boolean
}

function SidebarSection({ 
  section, 
  pathname, 
  isExpanded,
  getIsExpanded,
  toggleSection, 
  depth,
  isCollapsed,
  onClose,
  isDesktop
}: SidebarSectionProps) {
  const isActive = pathname === section.href
  const hasChildren = section.items && section.items.length > 0

  const depthPadding = (level: number) => {
    const map: Record<number, string> = {
      0: 'pl-3',
      1: 'pl-6',
      2: 'pl-9',
      3: 'pl-12',
      4: 'pl-14',
      5: 'pl-16',
    }
    return map[level] ?? 'pl-16'
  }

  // For leaf items (no children)
  if (!hasChildren && section.href) {
    const handleClick = () => {
      // Close the sidebar on mobile when a link is clicked
      if (!isDesktop && onClose) onClose()
    }

    const linkContent = (
      <div
        className={`group flex items-center gap-2 ${isCollapsed ? 'px-1 py-2' : `px-3 py-2 ${depthPadding(depth)}`} text-sm rounded-md transition-colors ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
            : 'text-slate-700 dark:text-[var(--sidebar-foreground)] hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]'
        } ${isCollapsed ? 'justify-center' : ''}`}
      >
        {section.icon && <span className="flex-shrink-0">{section.icon}</span>}
        {!isCollapsed && <span className="flex-1 truncate">{section.label}</span>}
        <Link
          href={section.href}
          onClick={handleClick}
          prefetch={depth > 0 ? false : undefined}
          aria-label={`Open ${section.label}`}
          className={`inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:border-blue-500 dark:text-slate-400 dark:hover:text-blue-400 ${isCollapsed ? '' : 'ml-auto'}`}
        >
          <Link2 className="h-3.5 w-3.5" />
        </Link>
      </div>
    )

    // Wrap in tooltip when collapsed
    if (isCollapsed && depth === 0) {
      return (
        <Tooltip content={section.label} position="right">
          {linkContent}
        </Tooltip>
      )
    }

    return linkContent
  }

  // For parent items (with children)
  const buttonContent = (
    <button
      onClick={() => toggleSection(section.id)}
      className={`flex items-center justify-between w-full ${isCollapsed ? 'px-1 py-2' : `px-3 py-2 ${depthPadding(depth)}`} text-sm font-semibold rounded-md hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)] ${
        isCollapsed ? 'justify-center' : ''
      }`}
    >
      <span className={`flex items-center gap-2 ${isCollapsed ? 'w-auto' : 'flex-1'}`}>
        {section.icon && <span className="flex-shrink-0">{section.icon}</span>}
        {!isCollapsed && <span className="truncate">{section.label}</span>}
      </span>
      {!isCollapsed && (
        <svg
          className={`w-4 h-4 transition-transform flex-shrink-0 ${
            isExpanded ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )

  return (
    <div>
      {isCollapsed && depth === 0 ? (
        <Tooltip content={section.label} position="right">
          {buttonContent}
        </Tooltip>
      ) : (
        buttonContent
      )}
      {!isCollapsed && isExpanded && hasChildren && section.items && (
        <div className="mt-1 space-y-1">
          {section.items.map((item) => (
            <SidebarSection
              key={item.id}
              section={item}
              pathname={pathname}
              isExpanded={getIsExpanded(item.id)}
              getIsExpanded={getIsExpanded}
              toggleSection={toggleSection}
              depth={depth + 1}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  )
}

