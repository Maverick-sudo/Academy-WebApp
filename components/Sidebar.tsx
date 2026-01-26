'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SidebarItem } from '@/lib/sidebar'

interface SidebarProps {
  data: SidebarItem[]
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ data, isOpen, onClose }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  useEffect(() => {
    // Auto-expand sections containing active page
    const activeSection = data.find(section =>
      section.items?.some(item => item.href && pathname.startsWith(item.href))
    )
    if (activeSection) {
      setExpandedSections(new Set([activeSection.id]))
    }
  }, [pathname, data])

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
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 lg:w-72
          bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
          overflow-y-auto z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="p-4 space-y-1">
          {data.map((section) => (
            <SidebarSection 
              key={section.id} 
              section={section} 
              pathname={pathname}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              depth={0}
            />
          ))}
        </nav>
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
}

function SidebarSection({ section, pathname, expandedSections, toggleSection, depth }: SidebarSectionProps) {
  const isExpanded = expandedSections.has(section.id)
  const isActive = pathname === section.href
  const hasChildren = section.items && section.items.length > 0

  const paddingLeft = depth * 12

  if (!hasChildren && section.href) {
    return (
      <Link
        href={section.href}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
      >
        {section.status && (
          <span className={`w-2 h-2 rounded-full ${
            section.status === 'draft' ? 'bg-yellow-500' :
            section.status === 'updated' ? 'bg-green-500' :
            'bg-blue-500'
          }`} />
        )}
        <span className="flex-1">{section.label}</span>
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => toggleSection(section.id)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
      >
        <span className="flex items-center gap-2">
          {section.icon && <span>{section.icon}</span>}
          <span>{section.label}</span>
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {isExpanded && hasChildren && section.items && (
        <div className="mt-1 space-y-1">
          {section.items.map((item) => (
            <SidebarSection
              key={item.id}
              section={item}
              pathname={pathname}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
