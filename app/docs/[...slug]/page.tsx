import { notFound, redirect } from 'next/navigation'
import { getDocBySlug, getDocsInDirectory, getAdjacentDocs, getGitHubUrl, getAllStaticPaths } from '@/lib/content'
import dynamic from 'next/dynamic'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import TableOfContents from '@/components/Toc'
import Breadcrumb from '@/components/Breadcrumb'
import PrevNextNav from '@/components/PrevNextNav'
import EditOnGitHub from '@/components/EditOnGitHub'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'

// Lazy load heavy components
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <div className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded h-96" />,
  ssr: true,
})

const Mermaid = dynamic(() => import('@/components/Mermaid'), {
  loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />,
  ssr: false,
})

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const normalizedSlug = params.slug.map(segment => segment.replace(/\.md$/i, ''))
  const lastSegment = normalizedSlug[normalizedSlug.length - 1]
  if (lastSegment && /^readme$/i.test(lastSegment)) {
    const redirectSlug = normalizedSlug.slice(0, -1)
    redirect(`/docs/${redirectSlug.join('/')}`)
  }
  const doc = getDocBySlug(normalizedSlug)
  
  // If not a file, check if it's a directory and show index
  if (!doc) {
    const docsInDir = getDocsInDirectory(normalizedSlug)
    
    if (docsInDir.length > 0) {
      // Render directory index
      return (
        <div className="w-full">
          <div className="container mx-0 px-4 sm:px-6 lg:px-6 max-w-4xl py-8 lg:py-12">
            <Breadcrumb slug={normalizedSlug} />
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              {normalizedSlug[normalizedSlug.length - 1]
                .replace(/[-_]/g, ' ')
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h1>
            
            <div className="grid gap-4">
              {docsInDir.map(doc => (
                <Link
                  key={doc.slug.join('/')}
                  href={`/docs/${doc.slug.join('/')}`}
                  className="block p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {doc.meta.title || doc.slug[doc.slug.length - 1]}
                  </h2>
                  {doc.meta.description && (
                    <p className="text-slate-600 dark:text-slate-400">
                      {doc.meta.description}
                    </p>
                  )}
                  {doc.meta.status && (
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                      doc.meta.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      doc.meta.status === 'updated' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {doc.meta.status}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    notFound()
  }

  const title = doc.meta.title || normalizedSlug[normalizedSlug.length - 1]
  const adjacentDocs = getAdjacentDocs(normalizedSlug)
  const githubUrl = getGitHubUrl(normalizedSlug)

  const extractText = (node: unknown): string => {
    if (typeof node === 'string') {
      return node
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join('')
    }
    if (node && typeof node === 'object' && 'props' in node) {
      const props = (node as { props?: { children?: unknown } }).props
      return extractText(props?.children)
    }
    return ''
  }

  return (
    <div className="w-full">
      <div className="container mx-0 px-4 sm:px-6 lg:px-6 max-w-7xl">
        <div className="flex gap-6 py-8 lg:py-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-4xl">
            <Breadcrumb slug={normalizedSlug} />
            
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg">
              <h1>{title}</h1>
              {doc.meta.description && (
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  {doc.meta.description}
                </p>
              )}
              {doc.meta.status && (
                <div className="not-prose mb-6">
                  <span className={`inline-block px-3 py-1 text-sm rounded ${
                    doc.meta.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    doc.meta.status === 'updated' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {doc.meta.status.toUpperCase()}
                  </span>
                </div>
              )}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ]}
            components={{
              img: () => null,
              code({ className, children, ...props }) {
                const languageMatch = className?.match(/language-([\w-]+)/)
                const language = languageMatch?.[1]
                if (language === 'mermaid') {
                  const mermaidCode = extractText(children).trim()
                  return <Mermaid code={mermaidCode} />
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </article>
        
        <EditOnGitHub githubUrl={githubUrl} />
        <PrevNextNav prev={adjacentDocs.prev} next={adjacentDocs.next} />
      </div>
      
      {/* Table of Contents - Hidden on mobile/tablet */}
      <TableOfContents content={doc.content} />
    </div>
  </div>
</div>
  )
}

export async function generateStaticParams() {
  const paths = getAllStaticPaths()
  
  return paths.map(slug => ({
    slug
  }))
}

export const dynamicParams = true // Allow dynamic routes not in generateStaticParams
