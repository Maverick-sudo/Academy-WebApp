import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getMermaidHash, normalizeMermaidCode } from './getMermaidHash'

export interface DiagramInfo {
  code: string
  hash: string
  filePath: string
  lineNumber: number
}

const MERMAID_PATTERN = /```mermaid\s*\n([\s\S]*?)```/gim

export function extractDiagramsFromMarkdown(markdownContent: string, filePath: string): DiagramInfo[] {
  const diagrams: DiagramInfo[] = []
  const lines = markdownContent.split('\n')
  let lineNumber = 0

  let match: RegExpExecArray | null
  while ((match = MERMAID_PATTERN.exec(markdownContent)) !== null) {
    const code = match[1].trim()
    const normalizedCode = normalizeMermaidCode(code)
    const hash = getMermaidHash(normalizedCode)

    // Find line number
    const beforeMatch = markdownContent.substring(0, match.index)
    lineNumber = beforeMatch.split('\n').length

    diagrams.push({
      code: normalizedCode,
      hash,
      filePath,
      lineNumber
    })
  }

  return diagrams
}

export function extractDiagramsFromDirectory(directory: string): DiagramInfo[] {
  const allDiagrams: DiagramInfo[] = []

  function walkDir(dir: string) {
    if (!fs.existsSync(dir)) return

    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walkDir(fullPath)
      } else if (item.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8')
          const { content: markdownContent } = matter(content)
          const diagrams = extractDiagramsFromMarkdown(markdownContent, fullPath)
          allDiagrams.push(...diagrams)
        } catch (error) {
          console.warn(`Failed to parse ${fullPath}:`, error)
        }
      }
    }
  }

  walkDir(directory)
  return allDiagrams
}
