'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('article h2, article h3, article h4')
    )

    const items: TocItem[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))

    setHeadings(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [content])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block sticky top-20 w-64 shrink-0 h-[calc(100dvh-6rem)] overflow-y-auto">
      <nav className="py-4">
        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4 px-2 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/60 dark:after:bg-blue-400/50">
          On this page
        </p>
        <ul className="space-y-2 text-sm border-l-2 border-slate-200 dark:border-slate-800">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12 + 8}px` }}
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
