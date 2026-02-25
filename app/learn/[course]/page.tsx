import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CourseHeader from '@/components/learn/CourseHeader'
import { getCourseChapters, getCourseMeta, getCourseSlugs } from '@/lib/learn'

export const revalidate = 3600

interface CoursePageProps {
  params: Promise<{ course: string }>
}

export async function generateStaticParams() {
  return getCourseSlugs().map(course => ({ course }))
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { course } = await params
  const meta = await getCourseMeta(course)

  if (!meta) {
    return { title: 'Course not found | Learn' }
  }

  return {
    title: `${meta.title} | Learn`,
    description: meta.description,
    alternates: { canonical: `/learn/${course}` },
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course } = await params
  const meta = await getCourseMeta(course)

  if (!meta) {
    notFound()
  }

  const chapters = await getCourseChapters(course)
  const firstChapter = chapters[0]

  return (
    <div className="space-y-8">
      <CourseHeader
        title={meta.title}
        description={meta.description}
        duration={meta.duration}
        difficulty={meta.difficulty}
        chapterCount={chapters.length}
      />

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Course chapters</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Follow the sequence to build momentum.</p>
          </div>
          {firstChapter && (
            <Link
              href={`/learn/${course}/${firstChapter.slug}`}
              className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start course
            </Link>
          )}
        </div>

        <div className="mt-6 grid gap-3">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.slug}
              href={`/learn/${course}/${chapter.slug}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chapter {index + 1}</p>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{chapter.title}</p>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">{chapter.readingTimeMinutes} min</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
