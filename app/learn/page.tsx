import CourseCard from '@/components/learn/CourseCard'
import { getAllCourses } from '@/lib/learn'

export const revalidate = 3600

export default async function LearnPage() {
  const courses = await getAllCourses()

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Academy Learn</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white">
            Structured learning paths
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore guided courses designed for focused progression. Track your chapters, move step by step, and keep momentum.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.slug}
              slug={course.slug}
              title={course.meta.title}
              description={course.meta.description}
              chapterCount={course.chapters.length}
              duration={course.meta.duration}
              difficulty={course.meta.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
