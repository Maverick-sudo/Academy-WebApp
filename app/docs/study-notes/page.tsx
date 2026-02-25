import { Metadata } from 'next'
import { LinkPreview } from '@/components/LinkPreview'
import { studyNotesMetadata } from '@/lib/study-notes-metadata'
import { BookOpen, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Study Notes - Academy',
  description: 'Comprehensive study notes across networking, security, programming, and cloud technologies'
}

export const revalidate = 3600
export const dynamic = 'force-static'

export default function StudyNotesIndexPage() {
  const categories = Object.entries(studyNotesMetadata)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                Study Notes
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Curated technical documentation & learning resources
              </p>
            </div>
          </div>
          
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
            Comprehensive notes covering networking (CCNA/CCNP), cybersecurity, programming languages, 
            web development, cloud technologies, and more. Each topic includes key concepts, 
            practical examples, and estimated reading times.
          </p>
          
          {/* Quick Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {categories.map(([category, items]) => (
              <div key={category} className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {items.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {category} {items.length === 1 ? 'topic' : 'topics'}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {categories.map(([category, items]) => (
            <section key={category} className="scroll-mt-24" id={category.toLowerCase().replace(/\s+/g, '-')}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {category}
                </h2>
                <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
                  {items.length} {items.length === 1 ? 'document' : 'documents'}
                </span>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <LinkPreview
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    summary={item.summary}
                    concepts={item.concepts}
                    lineCount={item.lineCount}
                    difficulty={item.difficulty}
                    estimatedTime={item.estimatedTime}
                  >
                    {item.title}
                  </LinkPreview>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              How to Use These Notes
            </h3>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span><strong>Hover over any link</strong> to preview its content, key concepts, and reading time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span><strong>Difficulty badges</strong> help you choose content matching your skill level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span><strong>Key concepts</strong> give you a quick overview of what you'll learn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span><strong>Reading time estimates</strong> help you plan your study sessions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
