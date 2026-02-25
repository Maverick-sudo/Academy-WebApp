import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'
import type { ComponentType } from 'react'

const learnContentDir = path.join(process.cwd(), 'content', 'learn')

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | string

export interface CourseMeta {
  title: string
  description: string
  chapters?: string[]
  duration?: string
  difficulty?: CourseDifficulty
}

export interface LearnChapter {
  slug: string
  title: string
  order: number
  fileName: string
  readingTimeMinutes: number
}

export interface CourseSummary {
  slug: string
  meta: CourseMeta
  chapters: LearnChapter[]
}

export interface ChapterContent {
  Component: ComponentType<{ components?: Record<string, ComponentType<any>> }>
  frontmatter: { title?: string; description?: string }
  readingTimeMinutes: number
}

const shouldCache = process.env.NODE_ENV !== 'development'
const courseMetaCache = new Map<string, CourseMeta>()
const courseChaptersCache = new Map<string, LearnChapter[]>()

function getCourseDir(course: string) {
  return path.join(learnContentDir, course)
}

function normalizeChapterSlug(value: string) {
  return value.replace(/\.mdx?$/i, '')
}

function getNumericPrefix(value: string) {
  const match = value.match(/^(\d+)[-_]?/)
  if (!match) return Number.POSITIVE_INFINITY
  return Number.parseInt(match[1], 10)
}

export function formatChapterTitle(value: string) {
  return value
    .replace(/^\d+[-_\s]*/i, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function estimateReadingTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export const getCourseSlugs = cache((): string[] => {
  if (!fs.existsSync(learnContentDir)) {
    return []
  }

  return fs
    .readdirSync(learnContentDir)
    .filter(name => {
      const fullPath = path.join(learnContentDir, name)
      return fs.statSync(fullPath).isDirectory() && !name.startsWith('.')
    })
})

export const getCourseMeta = cache(async (course: string): Promise<CourseMeta | null> => {
  if (shouldCache && courseMetaCache.has(course)) {
    return courseMetaCache.get(course) || null
  }

  const courseDir = getCourseDir(course)
  if (!fs.existsSync(courseDir)) {
    return null
  }

  try {
    const module = await import(`@/content/learn/${course}/meta`)
    const meta = (module.default ?? module.meta ?? module) as CourseMeta
    if (shouldCache) {
      courseMetaCache.set(course, meta)
    }
    return meta
  } catch (error) {
    console.error(`Failed to load meta for course ${course}:`, error)
    return null
  }
})

function readChapterFile(course: string, slug: string) {
  const filePath = path.join(getCourseDir(course), `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { data, content, filePath }
}

function getCourseChapterFiles(course: string) {
  const courseDir = getCourseDir(course)
  if (!fs.existsSync(courseDir)) {
    return []
  }

  return fs
    .readdirSync(courseDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/i, ''))
}

export const getCourseChapters = cache(async (course: string): Promise<LearnChapter[]> => {
  if (shouldCache && courseChaptersCache.has(course)) {
    return courseChaptersCache.get(course) || []
  }

  const meta = await getCourseMeta(course)
  const chapterSlugs = getCourseChapterFiles(course)
  const chapterMap = new Map<string, LearnChapter>()

  for (const slug of chapterSlugs) {
    const chapterData = readChapterFile(course, slug)
    if (!chapterData) continue
    const title = (chapterData.data?.title as string) || formatChapterTitle(slug)
    const order = getNumericPrefix(slug)
    const readingTimeMinutes = estimateReadingTimeMinutes(chapterData.content)

    chapterMap.set(slug, {
      slug,
      title,
      order,
      fileName: `${slug}.mdx`,
      readingTimeMinutes,
    })
  }

  let ordered: LearnChapter[] = []

  if (meta?.chapters && meta.chapters.length > 0) {
    const normalizedOrder = meta.chapters.map(normalizeChapterSlug)
    for (const slug of normalizedOrder) {
      const chapter = chapterMap.get(slug)
      if (chapter) {
        ordered.push(chapter)
        chapterMap.delete(slug)
      }
    }
  }

  const remaining = Array.from(chapterMap.values()).sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.slug.localeCompare(b.slug)
  })

  ordered = [...ordered, ...remaining]

  if (shouldCache) {
    courseChaptersCache.set(course, ordered)
  }

  return ordered
})

export const getAllCourses = cache(async (): Promise<CourseSummary[]> => {
  const courses = getCourseSlugs()
  const summaries: CourseSummary[] = []

  for (const course of courses) {
    const meta = await getCourseMeta(course)
    if (!meta) continue
    const chapters = await getCourseChapters(course)
    summaries.push({ slug: course, meta, chapters })
  }

  return summaries
})

export async function getChapterContent(course: string, chapter: string) {
  const chapterData = readChapterFile(course, chapter)
  if (!chapterData) {
    return null
  }

  const { content, data } = chapterData
  const readingTimeMinutes = estimateReadingTimeMinutes(content)

  return {
    frontmatter: data as { title?: string; description?: string },
    readingTimeMinutes,
  }
}
