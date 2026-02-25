'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

interface CourseProgressData {
  completed: string[]
  updatedAt: string
}

const createStorageKey = (courseSlug: string) => `academy-learn-progress:${courseSlug}`

function readProgress(courseSlug: string): CourseProgressData {
  if (typeof window === 'undefined') {
    return { completed: [], updatedAt: new Date(0).toISOString() }
  }

  const raw = window.localStorage.getItem(createStorageKey(courseSlug))
  if (!raw) {
    return { completed: [], updatedAt: new Date(0).toISOString() }
  }

  try {
    const parsed = JSON.parse(raw) as CourseProgressData
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      updatedAt: parsed.updatedAt || new Date(0).toISOString(),
    }
  } catch {
    return { completed: [], updatedAt: new Date(0).toISOString() }
  }
}

function writeProgress(courseSlug: string, data: CourseProgressData) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(createStorageKey(courseSlug), JSON.stringify(data))
}

export function useCourseProgress(courseSlug: string) {
  const [completed, setCompleted] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const data = readProgress(courseSlug)
    setCompleted(data.completed)
    setIsHydrated(true)
  }, [courseSlug])

  const markCompleted = useCallback((chapterSlug: string) => {
    if (!chapterSlug) return
    setCompleted(prev => {
      if (prev.includes(chapterSlug)) return prev
      const next = [...prev, chapterSlug]
      writeProgress(courseSlug, { completed: next, updatedAt: new Date().toISOString() })
      return next
    })
  }, [courseSlug])

  const resetProgress = useCallback(() => {
    setCompleted([])
    writeProgress(courseSlug, { completed: [], updatedAt: new Date().toISOString() })
  }, [courseSlug])

  const isCompleted = useCallback((chapterSlug: string) => {
    return completed.includes(chapterSlug)
  }, [completed])

  const completedCount = useMemo(() => completed.length, [completed])

  return {
    completed,
    completedCount,
    isCompleted,
    isHydrated,
    markCompleted,
    resetProgress,
  }
}
