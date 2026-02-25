import Link from 'next/link'
import Callout from '@/components/learn/Callout'
import type { ComponentProps } from 'react'

export const mdxComponents = {
  a({ href, children, ...props }: ComponentProps<'a'>) {
    if (!href) {
      return <a {...props}>{children}</a>
    }

    if (href.startsWith('http://') || href.startsWith('https://')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  },
  pre({ children, ...props }: ComponentProps<'pre'>) {
    return (
      <pre
        className="rounded-xl bg-slate-950 text-slate-50 overflow-x-auto p-4 text-sm border border-slate-800"
        {...props}
      >
        {children}
      </pre>
    )
  },
  code({ children, ...props }: ComponentProps<'code'>) {
    return (
      <code className="rounded bg-slate-900/80 px-1.5 py-0.5 text-slate-100" {...props}>
        {children}
      </code>
    )
  },
  Callout,
}
