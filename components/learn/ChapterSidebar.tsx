'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { CheckCircle2, List, RotateCcw } from 'lucide-react'
import type { LearnChapter } from '@/lib/learn'
import { useCourseProgress } from '@/lib/learnProgress'
import { cn } from '@/lib/utils'
import MobileNavDrawer from '@/components/MobileNavDrawer'

interface ChapterSidebarProps {
  courseSlug: string
  courseTitle: string
  chapters: LearnChapter[]
}

export default function ChapterSidebar({
  courseSlug,
  courseTitle,
  chapters,
}: ChapterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeChapter = useSelectedLayoutSegment()
  const { completedCount, isCompleted, markCompleted, resetProgress, isHydrated } = useCourseProgress(courseSlug)

  useEffect(() => {
    if (activeChapter) {
      markCompleted(activeChapter)
    }
  }, [activeChapter, markCompleted])

  useEffect(() => {
    const handler = () => {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1280
      if (!isDesktop) {
        setIsOpen(true)
      }
    }

    window.addEventListener('academy:toggle-sidebar', handler)
    return () => window.removeEventListener('academy:toggle-sidebar', handler)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const progressLabel = useMemo(() => {
    if (!isHydrated) return 'Loading progress...'
    return `${completedCount}/${chapters.length} completed`
  }, [completedCount, chapters.length, isHydrated])

  const chapterList = (
    <div className="flex h-full flex-col">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Course</p>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{courseTitle}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{progressLabel}</p>
      </div>

      <ol className="mt-6 flex-1 min-h-0 space-y-2 overflow-y-auto pr-2">
        {chapters.map((chapter, index) => {
          const isActive = chapter.slug === activeChapter
          const completed = isCompleted(chapter.slug)

          return (
            <li key={chapter.slug}>
              <Link
                href={`/learn/${courseSlug}/${chapter.slug}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-start gap-3 rounded-2xl border px-4 py-3 transition-colors',
                  isActive
                    ? 'border-blue-500/70 bg-blue-50 text-blue-700 dark:border-blue-500/60 dark:bg-blue-950/40 dark:text-blue-200'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600',
                )}
              >
                <div className={cn(
                  'mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                  completed
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400',
                )}>
                  {completed ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{chapter.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{chapter.readingTimeMinutes} min read</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>

      <button
        type="button"
        onClick={resetProgress}
        className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <RotateCcw className="h-4 w-4" />
        Reset progress
      </button>
    </div>
  )

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          <List className="h-4 w-4" />
          Chapters
        </button>
      </div>

      <aside className="hidden lg:flex lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:flex-col lg:rounded-3xl lg:border lg:border-slate-200/70 lg:dark:border-slate-800 lg:bg-white/80 lg:dark:bg-slate-950/60 lg:p-6">
        {chapterList}
      </aside>

      {isOpen && (
        <MobileNavDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          contentClassName="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
        >
          <div className="min-h-full h-full w-full p-6">
            {chapterList}
          </div>
        </MobileNavDrawer>
      )}
    </>
  )
}
