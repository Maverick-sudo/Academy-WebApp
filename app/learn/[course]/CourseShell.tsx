'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import type { CourseMeta, LearnChapter } from '@/lib/learn'
import ChapterSidebar from '@/components/learn/ChapterSidebar'

interface CourseShellProps {
  courseSlug: string
  meta: CourseMeta
  chapters: LearnChapter[]
  children: React.ReactNode
}

export default function CourseShell({ courseSlug, meta, chapters, children }: CourseShellProps) {
  const activeChapter = useSelectedLayoutSegment()

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <ChapterSidebar
            courseSlug={courseSlug}
            courseTitle={meta.title}
            chapters={chapters}
          />
          <div className="min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
