import { notFound, redirect } from 'next/navigation'
import { getDocBySlug, getDocsInDirectory, getAdjacentDocs, getGitHubUrl, getAllStaticPaths } from '@/lib/content'
import { Suspense } from 'react'
import { remarkPlugins, rehypePlugins } from '@/lib/markdown-plugins'
import TocContainer from '@/components/Toc/TocContainer'
import { extractHeadings } from '@/lib/toc/extractHeadings'
import Breadcrumb from '@/components/Breadcrumb'
import PrevNextNav from '@/components/PrevNextNav'
import EditOnGitHub from '@/components/EditOnGitHub'
import Link from 'next/link'
import { formatDisplayTitle } from '@/lib/title'
import Mermaid from '@/components/Mermaid'
import { Link2 } from 'lucide-react'
import { MarkdownErrorBoundary } from '@/components/MarkdownErrorBoundary'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '@/components/CodeBlock'

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
                <div
                  key={doc.slug.join('/')}
                  className="block p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                      {formatDisplayTitle(doc.meta.title || doc.slug[doc.slug.length - 1])}
                    </h2>
                    <Link
                      href={`/docs/${doc.slug.join('/')}`}
                      aria-label={`Open ${formatDisplayTitle(doc.meta.title || doc.slug[doc.slug.length - 1])}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:border-blue-500 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      <Link2 className="h-4 w-4" />
                    </Link>
                  </div>
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
                </div>
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
            
            <article className="prose prose-sm sm:prose lg:prose-lg prose-slate dark:prose-invert max-w-[75ch] mx-auto prose-headings:scroll-mt-24 prose-img:rounded-lg prose-p:leading-relaxed prose-li:my-1 prose-code:before:content-none prose-code:after:content-none leading-relaxed">
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
          <MarkdownErrorBoundary>
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            components={{
              h1: () => null,
              img: () => null,
              pre({ children }) {
                return <CodeBlock>{children}</CodeBlock>
              },
              a({ href, children, ...props }) {
                const label = extractText(children) || 'Open link'
                const textNode = (
                  <span className="text-slate-800 dark:text-slate-200">{children}</span>
                )

                if (!href) {
                  return textNode
                }

                const iconClassName = "ml-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:border-blue-500 dark:text-slate-400 dark:hover:text-blue-400"

                // Handle anchor links (same page navigation)
                if (href.startsWith('#')) {
                  return (
                    <span className="inline-flex items-center">
                      {textNode}
                      <a href={href} aria-label={label} className={iconClassName} {...props}>
                        <Link2 className="h-3.5 w-3.5" />
                      </a>
                    </span>
                  )
                }

                // Handle external links
                if (href.startsWith('http://') || href.startsWith('https://')) {
                  return (
                    <span className="inline-flex items-center">
                      {textNode}
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconClassName} {...props}>
                        <Link2 className="h-3.5 w-3.5" />
                      </a>
                    </span>
                  )
                }

                // Handle internal markdown links - strip .md extension and convert to proper path
                let cleanHref = href.replace(/\.md$/i, '')

                // If it's a relative path, prepend current doc path
                if (!cleanHref.startsWith('/')) {
                  const basePath = `/docs/${normalizedSlug.join('/')}`
                  cleanHref = `${basePath}/${cleanHref}`
                }

                // Normalize multiple slashes
                cleanHref = cleanHref.replace(/\/+/g, '/')

                return (
                  <span className="inline-flex items-center">
                    {textNode}
                    <Link href={cleanHref} aria-label={label} className={iconClassName} {...props}>
                      <Link2 className="h-3.5 w-3.5" />
                    </Link>
                  </span>
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
          </MarkdownErrorBoundary>
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
              {['w-3/5', 'w-2/3', 'w-4/5', 'w-3/5', 'w-2/3', 'w-4/5'].map((widthClass, i) => (
                <div key={i} className={`h-4 ${widthClass} bg-slate-200 dark:bg-slate-800 rounded`} />
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
