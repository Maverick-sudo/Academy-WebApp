import { notFound, redirect } from 'next/navigation'
import { getDocBySlug, getDocsInDirectory, getAdjacentDocs, getGitHubUrl, getAllStaticPaths } from '@/lib/content'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import TocContainer from '@/components/Toc/TocContainer'
import { extractHeadings } from '@/lib/toc/extractHeadings'
import Breadcrumb from '@/components/Breadcrumb'
import PrevNextNav from '@/components/PrevNextNav'
import EditOnGitHub from '@/components/EditOnGitHub'
import Link from 'next/link'
import { formatDisplayTitle } from '@/lib/title'
import Mermaid from '@/components/Mermaid'

// Lazy load heavy components
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <div className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded h-96" />,
  ssr: true,
})

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params
  const decodeSegment = (segment: string) => {
    try {
      return decodeURIComponent(segment)
    } catch {
      return segment
    }
  }
  const normalizedSlug = resolvedParams.slug.map(segment => decodeSegment(segment).replace(/\.md$/i, ''))
  const repoRoot = normalizedSlug[0] ? String(normalizedSlug[0]).toLowerCase() : ''
  const isAutomation = repoRoot === 'automation'
  const isCcnaLabs = repoRoot === 'ccna-labs' || repoRoot === 'ccna-lab'
  const isCcnaIndex = isCcnaLabs && normalizedSlug.length === 1
  const automationRepoUrl = 'https://github.com/Maverick-sudo/Automation'
  const ccnaDownloadUrl = 'https://github.com/Maverick-sudo/network-engineering'
  const ccnaDownloadText = 'Download .pkt files'
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
          <div className="w-full max-w-none lg:max-w-4xl py-8 lg:py-12">
            <Breadcrumb slug={normalizedSlug} />
              <h1 className="text-3xl md:text-4xl font-bold mb-8 break-words">
                {formatDisplayTitle(normalizedSlug[normalizedSlug.length - 1])}
            </h1>
            
            <div className="grid gap-4">
              {docsInDir.map(doc => (
                <Link
                  key={doc.slug.join('/')}
                  href={`/docs/${doc.slug.join('/')}`}
                  className="block p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {formatDisplayTitle(doc.meta.title || doc.slug[doc.slug.length - 1])}
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
            {isAutomation && (
              <div className="mt-8 not-prose">
                <a
                  href={automationRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-sm font-medium"
                >
                  View configuration files on GitHub
                </a>
              </div>
            )}
            {isCcnaIndex && (
              <div className="mt-8 not-prose">
                <a
                  href={ccnaDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-sm font-medium"
                >
                  {ccnaDownloadText}
                </a>
              </div>
            )}
          </div>
        </div>
      )
    }
    
    notFound()
  }

  const title = doc.meta.title || normalizedSlug[normalizedSlug.length - 1]
  const displayTitle = formatDisplayTitle(title)
  const adjacentDocs = getAdjacentDocs(normalizedSlug)
  const githubUrl = getGitHubUrl(normalizedSlug)

  // Extract TOC headings server-side
  const tocHeadings = extractHeadings(doc.content)

  // If the markdown content starts with a top-level H1 and we already have a
  // `meta.title`, strip the leading H1 from the markdown so we don't render
  // duplicate titles. This is a conservative, local fix — more advanced
  // parsing can be added later if needed.
  const contentToRender = doc.meta.title
    ? doc.content.replace(/^\s*#\s.*(\r?\n)*/i, '')
    : doc.content

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
      <div className="w-full">
        <div className="flex gap-6 py-8 lg:py-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-none lg:max-w-4xl">
            <Breadcrumb slug={normalizedSlug} />
            
            <article className="prose prose-sm sm:prose lg:prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg leading-relaxed">
              <Suspense fallback={
                <div className="not-prose mb-8 animate-pulse">
                  <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                </div>
              }>
                <div className="not-prose mb-8">
                  <h1 className="text-4xl font-bold leading-tight break-words bg-gradient-to-r from-blue-600 to-slate-600 dark:from-blue-400 dark:to-slate-300 bg-clip-text text-transparent">
                    {displayTitle}
                  </h1>
                  {doc.meta.description && (
                    <p className="mt-3 text-xl text-slate-600 dark:text-slate-400">
                      {doc.meta.description}
                    </p>
                  )}
                  {doc.meta.status && (
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 text-sm rounded ${
                        doc.meta.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        doc.meta.status === 'updated' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {doc.meta.status.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </Suspense>
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-11/12" />
              <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-10/12" />
            </div>
          }>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ]}
            components={{
              h1: () => null,
              img: () => null,
              a({ href, children, ...props }) {
                if (!href) return <a {...props}>{children}</a>
                
                // Handle anchor links (same page navigation)
                if (href.startsWith('#')) {
                  return <a href={href} {...props}>{children}</a>
                }
                
                // Handle external links
                if (href.startsWith('http://') || href.startsWith('https://')) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                      {children}
                    </a>
                  )
                }
                
                // Handle internal markdown links - strip .md extension and convert to proper path
                let cleanHref = href.replace(/\.md$/i, '')
                
                // If it's a relative path, prepend current doc path
                if (!cleanHref.startsWith('/')) {
                  // Get current base path (e.g., /docs/study-notes)
                  const basePath = `/docs/${normalizedSlug.join('/')}`
                  cleanHref = `${basePath}/${cleanHref}`
                }
                
                // Normalize multiple slashes
                cleanHref = cleanHref.replace(/\/+/g, '/')
                
                return (
                  <Link href={cleanHref} {...props}>
                    {children}
                  </Link>
                )
              },
              code({ className, children, ...props }) {
                const languageMatch = className?.match(/language-([\w-]+)/)
                const language = languageMatch?.[1]
                const text = extractText(children).trim()

                // If explicitly marked as mermaid, render with Mermaid.
                // Also, treat indented or missing className blocks as mermaid
                // when the code starts with a known mermaid keyword.
                const looksLikeMermaid = /^(?:graph|flowchart|sequenceDiagram|stateDiagram|classDiagram)\b/i.test(text)

                if (language === 'mermaid' || (!language && looksLikeMermaid)) {
                  return <Mermaid code={text} />
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
              {contentToRender}
          </ReactMarkdown>
          </Suspense>
        </article>
        
        {isAutomation && (
          <div className="mt-6 not-prose">
            <a
              href={automationRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-sm font-medium"
            >
              View configuration files on GitHub
            </a>
          </div>
        )}
        <EditOnGitHub githubUrl={githubUrl} />
        <PrevNextNav prev={adjacentDocs.prev} next={adjacentDocs.next} />
      </div>
      
      {/* Table of Contents - Hidden on mobile/tablet */}
      <Suspense fallback={
        <div className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-4 animate-pulse">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-4" />
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 dark:bg-slate-800 rounded" style={{ width: `${60 + (i % 3) * 10}%` }} />
              ))}
            </div>
          </div>
        </div>
      }>
        <TocContainer headings={tocHeadings} />
      </Suspense>
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
export const revalidate = 3600 // ISR: Revalidate every hour (3600 seconds)
