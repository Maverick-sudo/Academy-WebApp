'use client'

import { ReactNode } from 'react'
import CodeCopyButton from './CodeCopyButton'

interface CodeBlockProps {
  children: ReactNode
  className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  // Extract text content for copying
  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      return extractText(node.props.children)
    }
    return ''
  }

  const codeText = extractText(children)

  return (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <CodeCopyButton code={codeText} />
      </div>
      <pre className={className}>
        {children}
      </pre>
    </div>
  )
}
