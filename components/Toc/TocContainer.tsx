'use client'

import { useState } from 'react'
import TocTracker from './TocTracker.client'

interface TocHeading {
  id: string
  text: string
  level: number
}

interface TocContainerProps {
  headings: TocHeading[]
}

export default function TocContainer({ headings }: TocContainerProps) {
  const [activeId, setActiveId] = useState<string>('')

  const getPaddingClass = (level: number) => {
    switch (level) {
      case 2:
        return 'pl-2'
      case 3:
        return 'pl-5'
      case 4:
        return 'pl-8'
      default:
        return 'pl-2'
    }
  }

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block sticky top-20 w-64 shrink-0 h-[calc(100vh-6rem)] overflow-y-auto">
      <TocTracker headings={headings} onActiveChange={setActiveId} />
      <nav className="py-4">
        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4 px-2 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/60 dark:after:bg-blue-400/50">
          On this page
        </p>
        <ul className="space-y-2 text-sm border-l-2 border-slate-200 dark:border-slate-800">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              className={getPaddingClass(heading.level)}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-1.5 px-2 -ml-px border-l-2 transition-all ${
                  activeId === heading.id
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
