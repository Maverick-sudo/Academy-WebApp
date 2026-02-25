import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ChapterProgress from '@/components/learn/ChapterProgress'
import PrevNextNav from '@/components/learn/PrevNextNav'
import MDXClientWrapper from '@/components/learn/MDXClientWrapper'
import { getChapterContent, getCourseChapters, getCourseMeta, getCourseSlugs } from '@/lib/learn'

export const revalidate = 3600
export const dynamicParams = true

interface ChapterPageProps {
  params: Promise<{ course: string; chapter: string }>
}

export async function generateStaticParams() {
  const courses = getCourseSlugs()
  const params: Array<{ course: string; chapter: string }> = []

  for (const course of courses) {
    const chapters = await getCourseChapters(course)
    chapters.forEach(chapter => params.push({ course, chapter: chapter.slug }))
  }

  return params
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { course, chapter } = await params
  const meta = await getCourseMeta(course)

  if (!meta) {
    return { title: 'Chapter not found | Learn' }
  }

  const content = await getChapterContent(course, chapter)
  const chapterTitle = content?.frontmatter?.title || chapter

  return {
    title: `${meta.title} · ${chapterTitle} | Learn`,
    description: content?.frontmatter?.description || meta.description,
    alternates: { canonical: `/learn/${course}/${chapter}` },
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { course, chapter } = await params
  const meta = await getCourseMeta(course)

  if (!meta) {
    notFound()
  }

  const chapters = await getCourseChapters(course)
  const currentIndex = chapters.findIndex(item => item.slug === chapter)
  if (currentIndex === -1) {
    notFound()
  }

  const chapterData = await getChapterContent(course, chapter)
  if (!chapterData) {
    notFound()
  }

  const previous = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null
  const chapterTitle = chapterData.frontmatter?.title || chapters[currentIndex].title

  return (
    <article className="space-y-6">
      <ChapterProgress
        courseSlug={course}
        currentIndex={currentIndex + 1}
        totalChapters={chapters.length}
        readingTimeMinutes={chapterData.readingTimeMinutes}
      />

      <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
        <MDXClientWrapper course={course} chapter={chapter} />
      </div>

      <PrevNextNav
        courseSlug={course}
        previous={previous ? { slug: previous.slug, title: previous.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
      />
    </article>
  )
}
