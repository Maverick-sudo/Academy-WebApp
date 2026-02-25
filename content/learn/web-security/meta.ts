import type { CourseMeta } from '@/lib/learn'

const meta: CourseMeta = {
  title: 'Web Security',
  description: 'OWASP-focused web security fundamentals and common vulnerability patterns.',
  chapters: [
    '01-owasp-top-10-foundations',
    '02-xss-and-client-side',
    '03-request-and-injection',
    '04-web-enumeration-burp-suite',
  ],
  duration: '3h 30m',
  difficulty: 'Beginner',
}

export default meta
