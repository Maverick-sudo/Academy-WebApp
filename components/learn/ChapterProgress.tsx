'use client'

import ProgressBar from '@/components/learn/ProgressBar'
import { useCourseProgress } from '@/lib/learnProgress'

interface ChapterProgressProps {
  courseSlug: string
  currentIndex: number
  totalChapters: number
  readingTimeMinutes?: number
}

export default function ChapterProgress({
  courseSlug,
  currentIndex,
  totalChapters,
  readingTimeMinutes,
}: ChapterProgressProps) {
  const { completedCount, isHydrated } = useCourseProgress(courseSlug)
  const percentage = Math.round((currentIndex / totalChapters) * 100)

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 p-4 md:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Chapter {currentIndex} of {totalChapters}</p>
          {readingTimeMinutes && (
            <p className="text-sm text-slate-500 dark:text-slate-400">Estimated time: {readingTimeMinutes} min</p>
          )}
        </div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {isHydrated ? `${completedCount}/${totalChapters} completed` : 'Loading progress...'}
        </div>
      </div>
      <ProgressBar value={percentage} max={100} label="Course position" />
    </div>
  )
}
