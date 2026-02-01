export interface TocHeading {
  id: string
  text: string
  level: number
}

/**
 * Generate a slug from heading text matching rehypeSlug behavior
 * - Convert to lowercase
 * - Replace spaces with hyphens
 * - Remove special characters except hyphens
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Extract headings from markdown content using regex parsing
 * Matches headings: ## Heading, ### Heading, #### Heading
 * Generates IDs consistent with rehypeSlug plugin
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  const slugCounts = new Map<string, number>()
  const lines = markdown.split('\n')

  for (const line of lines) {
    // Match markdown headings (##, ###, ####)
    const match = line.match(/^(#{2,4})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links [text](url) -> text
        .replace(/`([^`]+)`/g, '$1') // Remove inline code `text` -> text
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold **text** -> text
        .replace(/\*([^*]+)\*/g, '$1') // Remove italic *text* -> text
      
      const baseId = slugify(text)
      const currentCount = slugCounts.get(baseId) ?? 0
      const id = currentCount === 0 ? baseId : `${baseId}-${currentCount}`
      slugCounts.set(baseId, currentCount + 1)

      headings.push({
        id,
        text,
        level
      })
    }
  }

  return headings
}
