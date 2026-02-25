import { notFound } from 'next/navigation'
import { getCourseChapters, getCourseMeta } from '@/lib/learn'
import ChapterSidebar from '@/components/learn/ChapterSidebar'

export const revalidate = 3600

interface CourseLayoutProps {
  children: React.ReactNode
  params: Promise<{ course: string }>
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
  const { course } = await params
  const meta = await getCourseMeta(course)

  if (!meta) {
    notFound()
  }

  const chapters = await getCourseChapters(course)

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <ChapterSidebar
            courseSlug={course}
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
