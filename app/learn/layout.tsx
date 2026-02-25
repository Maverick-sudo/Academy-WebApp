import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Learn | Academy',
  description: 'Structured courses and chapter-based learning paths.',
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {children}
    </section>
  )
}
