'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface BreadcrumbProps {
  slug: string[]
}

export default function Breadcrumb({ slug }: BreadcrumbProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const formatLabel = (part: string) => {
    return part
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...slug.map((part, index) => ({
      label: formatLabel(part),
      href: `/docs/${slug.slice(0, index + 1).join('/')}`,
    })),
  ]

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <nav className={`flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400 transition-all ${
          isCollapsed ? 'opacity-50' : 'opacity-100'
        }`}>
          {isCollapsed ? (
            // Show only last item when collapsed
            <div className="flex items-center">
              <span className="text-slate-400 dark:text-slate-600 mr-2">...</span>
              <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-[160px] sm:max-w-[240px] md:max-w-none">
                {breadcrumbs[breadcrumbs.length - 1].label}
              </span>
            </div>
          ) : (
            // Show full breadcrumb when expanded
            breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[80px] sm:max-w-[120px] md:max-w-none"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))
          )}
        </nav>
        
        {/* Breadcrumb Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex-shrink-0 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          aria-label={isCollapsed ? 'Expand breadcrumb' : 'Collapse breadcrumb'}
          title={isCollapsed ? 'Expand breadcrumb' : 'Collapse breadcrumb'}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
