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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
      // Update URL without triggering page reload
      window.history.pushState({}, '', `#${id}`)
    }
  }

  if (headings.length === 0) return null

  const activeIndex = headings.findIndex(h => h.id === activeId)
  const progress = headings.length > 0 ? ((activeIndex + 1) / headings.length) * 100 : 0

  return (
    <aside className="hidden xl:block sticky top-20 w-64 shrink-0 h-[calc(100vh-6rem)] overflow-y-auto">
      <nav className="py-4 pr-4">
        <div className="mb-4 px-2">
          <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2 flex items-center justify-between">
            <span className="relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-cyan-500 dark:after:from-blue-400 dark:after:to-cyan-400">
              On this page
            </span>
            {activeIndex >= 0 && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                {activeIndex + 1}/{headings.length}
              </span>
            )}
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <ul className="space-y-1 text-sm border-l-2 border-slate-200 dark:border-slate-800">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              className={getPaddingClass(heading.level)}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`block py-2 px-3 -ml-px border-l-2 transition-all duration-200 rounded-r-md ${
                  activeId === heading.id
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
