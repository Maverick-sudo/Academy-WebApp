'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Tooltip from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'
import type { SidebarItem } from '@/lib/sidebar'

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
  const pathname = usePathname()

  const toggleSection = (sectionId: string) => {
    // Don't allow expanding sections when collapsed
    if (isCollapsed) return
    
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  useEffect(() => {
    // Auto-expand sections containing active page (only when not collapsed)
    if (!isCollapsed) {
      const activeSection = data.find(section =>
        section.items?.some(item => item.href && pathname.startsWith(item.href))
      )
      if (activeSection) {
        setExpandedSections(new Set([activeSection.id]))
      }
    }
  }, [pathname, data, isCollapsed])

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)]
          bg-white dark:bg-[var(--sidebar)] border-r border-slate-200 dark:border-[var(--sidebar-border)]
          overflow-y-auto z-40 relative
          transition-[width,transform] duration-150 ease-in-out
          ${isCollapsed ? 'lg:w-16' : 'w-64 lg:w-72'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="p-4 space-y-1 pb-16">
          {data.map((section) => (
            <SidebarSection 
              key={section.id} 
              section={section} 
              pathname={pathname}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              depth={0}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Collapse toggle button (desktop only) */}
        <div className="hidden lg:flex items-center justify-between px-2 py-2 border-t border-slate-200 dark:border-[var(--sidebar-border)] absolute bottom-0 left-0 right-0 bg-white dark:bg-[var(--sidebar)]">
          <button
            onClick={onToggleCollapse}
            className={cn(
              "flex items-center gap-2 rounded-md transition-colors",
              "hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]",
              "text-slate-600 dark:text-[var(--sidebar-foreground)]",
              isCollapsed ? "w-full justify-center p-1.5" : "w-full px-3 py-2"
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
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
  expandedSections: Set<string>
  toggleSection: (id: string) => void
  depth: number
  isCollapsed: boolean
}

function SidebarSection({ 
  section, 
  pathname, 
  expandedSections, 
  toggleSection, 
  depth,
  isCollapsed 
}: SidebarSectionProps) {
  const isExpanded = expandedSections.has(section.id)
  const isActive = pathname === section.href
  const hasChildren = section.items && section.items.length > 0

  const paddingLeft = depth * 12

  // For leaf items (no children)
  if (!hasChildren && section.href) {
    const linkContent = (
      <Link
        href={section.href}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
            : 'text-slate-700 dark:text-[var(--sidebar-foreground)] hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]'
        } ${isCollapsed ? 'justify-center' : ''}`}
        style={!isCollapsed ? { paddingLeft: `${paddingLeft + 12}px` } : undefined}
      >
        {section.icon && <span className="flex-shrink-0">{section.icon}</span>}
        {!isCollapsed && <span className="flex-1 truncate">{section.label}</span>}
      </Link>
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
      className={`flex items-center justify-between w-full px-3 py-2 text-sm font-semibold rounded-md hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)] ${
        isCollapsed ? 'justify-center' : ''
      }`}
      style={!isCollapsed ? { paddingLeft: `${paddingLeft + 12}px` } : undefined}
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
              expandedSections={expandedSections}
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
