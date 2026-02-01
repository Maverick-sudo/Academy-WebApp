// Web Worker for search scoring and filtering
// Offloads CPU-intensive search operations from main thread

self.addEventListener('message', (event) => {
  const { type, docs, query } = event.data

  if (type === 'SEARCH') {
    try {
      const results = performSearch(docs, query)
      self.postMessage({ type: 'RESULTS', results })
    } catch (error) {
      self.postMessage({ type: 'ERROR', error: error.message })
    }
  }
})

function performSearch(docs, queryLower) {
  const results = []

  for (const doc of docs) {
    const { title = '', description = '', content = '', slug } = doc

    if (!slug) continue

    const titleMatch = title.toLowerCase().includes(queryLower)
    const descriptionMatch = description.toLowerCase().includes(queryLower)
    const contentMatch = content.toLowerCase().includes(queryLower)

    if (!titleMatch && !descriptionMatch && !contentMatch) {
      continue
    }

    // Calculate relevance score
    let score = 0
    if (titleMatch) score += 10
    if (descriptionMatch) score += 5
    if (contentMatch) score += 1

    // Extract excerpt
    const contentLower = content.toLowerCase()
    const queryIndex = contentLower.indexOf(queryLower)
    let excerpt = ''

    if (queryIndex !== -1 && content.length > 0) {
      const start = Math.max(0, queryIndex - 50)
      const end = Math.min(content.length, queryIndex + 100)
      excerpt =
        (start > 0 ? '...' : '') +
        content.slice(start, end).trim() +
        (end < content.length ? '...' : '')
    } else if (content.length > 0) {
      excerpt = content.slice(0, 150).trim() + '...'
    } else if (description) {
      excerpt = description
    }

    results.push({
      title,
      description: description || undefined,
      slug,
      excerpt,
      score,
    })
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score)
}
