import { NextRequest, NextResponse } from 'next/server'
import { getAllDocsForSearch } from '@/lib/content'

// Simple search implementation (can be replaced with Flexsearch for better performance)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const allDocs = getAllDocsForSearch()
    
    const results = allDocs
      .map(doc => {
        const titleMatch = doc.title.toLowerCase().includes(query)
        const descriptionMatch = doc.description?.toLowerCase().includes(query)
        const contentMatch = doc.content.toLowerCase().includes(query)
        
        if (!titleMatch && !descriptionMatch && !contentMatch) {
          return null
        }

        // Calculate relevance score
        let score = 0
        if (titleMatch) score += 10
        if (descriptionMatch) score += 5
        if (contentMatch) score += 1

        // Extract excerpt
        const contentLower = doc.content.toLowerCase()
        const queryIndex = contentLower.indexOf(query)
        let excerpt = ''
        
        if (queryIndex !== -1) {
          const start = Math.max(0, queryIndex - 50)
          const end = Math.min(doc.content.length, queryIndex + 100)
          excerpt = (start > 0 ? '...' : '') + 
                   doc.content.slice(start, end).trim() + 
                   (end < doc.content.length ? '...' : '')
        } else {
          excerpt = doc.content.slice(0, 150).trim() + '...'
        }

        return {
          title: doc.title,
          description: doc.description,
          slug: doc.slug.join('/'),
          excerpt,
          score,
        }
      })
      .filter(Boolean)
      .sort((a, b) => (b?.score || 0) - (a?.score || 0))
      .slice(0, 10)

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
