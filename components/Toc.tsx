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
    <aside className="hidden xl:block sticky top-20 w-64 shrink-0 h-[calc(100vh-6rem)] overflow-y-auto">
      <nav className="py-4">
        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-4 px-2">On this page</p>
        <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-800">
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
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
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
