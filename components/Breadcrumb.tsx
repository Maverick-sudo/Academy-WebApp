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
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg px-4 py-3 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
        <nav className={`flex flex-wrap items-center gap-2 text-sm transition-all duration-300 ${
          isCollapsed ? 'opacity-50' : 'opacity-100'
        }`}>
          {isCollapsed ? (
            // Show only last item when collapsed
            <div className="flex items-center animate-in fade-in duration-200">
              <span className="text-slate-400 dark:text-slate-600 mr-2 font-semibold">...</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[200px] md:max-w-none">
                {breadcrumbs[breadcrumbs.length - 1].label}
              </span>
            </div>
          ) : (
            // Show full breadcrumb when expanded
            breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center animate-in fade-in slide-in-from-left-2 duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                {index > 0 && (
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 mx-1.5 md:mx-2.5 flex-shrink-0 text-slate-400 dark:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[150px] md:max-w-none">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    prefetch={true}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 truncate max-w-[100px] md:max-w-none hover:underline decoration-2 underline-offset-2"
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
          className="flex-shrink-0 p-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow"
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
