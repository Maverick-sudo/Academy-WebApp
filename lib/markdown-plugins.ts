/**
 * Server-side markdown processing configuration
 * This file should only be imported on the server to avoid bundling plugins in client
 */

import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

// Using 'any' for plugin arrays to avoid TypeScript complexity with react-markdown types
// The plugins are all correctly typed at their source
export const remarkPlugins: any[] = [remarkGfm]

export const rehypePlugins: any[] = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  rehypeHighlight,
]


