#!/usr/bin/env node
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')
const os = require('os')
const pLimitModule = require('p-limit')
const pLimit = pLimitModule.default || pLimitModule
const cryptoModule = require('crypto')
const matter = require('gray-matter')

const rootDir = path.join(__dirname, '..')
const contentDir = path.join(rootDir, 'content')
const outputDir = path.join(rootDir, 'public', 'mermaid-cache')
const manifestPath = path.join(outputDir, 'mermaid-manifest.json')

// Inline utility functions to avoid ESM import issues
function getMermaidHash(code: string): string {
  return cryptoModule
    .createHash('sha256')
    .update(code.trim())
    .digest('hex')
    .substring(0, 16)
}

function normalizeMermaidCode(code: string): string {
  return code
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[─│┌┐└┘├┤┬┴┼]/g, '-')
    .trim()
}

function extractDiagramsFromMarkdown(markdownContent: string, filePath: string): any[] {
  const diagrams: any[] = []
  const MERMAID_PATTERN = /```mermaid\s*\n([\s\S]*?)```/gim
  
  let match
  while ((match = MERMAID_PATTERN.exec(markdownContent)) !== null) {
    const code = match[1].trim()
    const normalizedCode = normalizeMermaidCode(code)
    const hash = getMermaidHash(normalizedCode)
    
    const beforeMatch = markdownContent.substring(0, match.index)
    const lineNumber = beforeMatch.split('\n').length
    
    diagrams.push({
      code: normalizedCode,
      hash,
      filePath,
      lineNumber
    })
  }
  
  return diagrams
}

function extractDiagramsFromDirectory(directory: string): any[] {
  const allDiagrams: any[] = []
  
  function walkDir(dir: string): void {
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
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.warn(`Failed to parse ${fullPath}:`, errorMessage)
        }
      }
    }
  }
  
  walkDir(directory)
  return allDiagrams
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Load existing manifest
let existingManifest: Record<string, any> = {}
if (fs.existsSync(manifestPath)) {
  try {
    existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  } catch (error) {
    console.warn('Failed to load existing manifest, will regenerate all diagrams')
  }
}

async function renderMermaidDiagram(code: string, hash: string): Promise<string | null> {
  const browser = await chromium.launch({ headless: true })
  
  try {
    const page = await browser.newPage()
    
    // Set up HTML with Mermaid CDN
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
      </head>
      <body>
        <div class="mermaid">${code}</div>
        <script>
          mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
        </script>
      </body>
      </html>
    `)
    
    // Wait for diagram to render
    await page.waitForSelector('.mermaid svg', { timeout: 5000 })
    
    // Extract SVG
    const svg = await page.locator('.mermaid svg').innerHTML()
    
    return `<svg xmlns="http://www.w3.org/2000/svg"${svg.substring(4)}`
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`Failed to render diagram ${hash}:`, errorMessage)
    return null
  } finally {
    await browser.close()
  }
}

async function processChunk(diagrams: any[], workerIndex: number): Promise<any> {
  const limit = pLimit(1) // One browser instance at a time per worker
  
  const tasks = diagrams.map(diagram => 
    limit(async () => {
      const outputPath = path.join(outputDir, `${diagram.hash}.svg`)
      
      // Check if already exists and hash matches
      if (existingManifest[diagram.hash] && fs.existsSync(outputPath)) {
        console.log(`[Worker ${workerIndex}] ✓ Cached ${diagram.hash} (${path.basename(diagram.filePath)})`)
        return { hash: diagram.hash, file: `${diagram.hash}.svg`, cached: true }
      }
      
      console.log(`[Worker ${workerIndex}] 🎨 Rendering ${diagram.hash} (${path.basename(diagram.filePath)}:${diagram.lineNumber})`)
      
      const svg = await renderMermaidDiagram(diagram.code, diagram.hash)
      
      if (svg) {
        fs.writeFileSync(outputPath, svg, 'utf8')
        console.log(`[Worker ${workerIndex}] ✅ Saved ${diagram.hash}.svg`)
        return { hash: diagram.hash, file: `${diagram.hash}.svg`, cached: false }
      } else {
        console.log(`[Worker ${workerIndex}] ❌ Failed ${diagram.hash}`)
        return null
      }
    })
  )
  
  return Promise.all(tasks)
}

function chunkArray(array: any[], size: number): any[][] {
  const chunks: any[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

async function main() {
  console.log('🔍 Extracting Mermaid diagrams from content...')
  
  const allDiagrams = extractDiagramsFromDirectory(contentDir)
  console.log(`📊 Found ${allDiagrams.length} Mermaid diagrams`)
  
  if (allDiagrams.length === 0) {
    console.log('No diagrams to render.')
    return
  }
  
  // Determine worker count
  const cpuCount = os.cpus().length
  const workerCount = Math.min(Math.max(2, cpuCount - 1), allDiagrams.length)
  console.log(`🚀 Using ${workerCount} parallel workers`)
  
  // Split diagrams into chunks
  const chunkSize = Math.ceil(allDiagrams.length / workerCount)
  const chunks = chunkArray(allDiagrams, chunkSize)
  
  // Process chunks in parallel
  console.log('⚙️  Starting parallel rendering...')
  const startTime = Date.now()
  
  const results = await Promise.all(
    chunks.map((chunk, index) => processChunk(chunk, index + 1))
  )
  
  // Flatten results and build manifest
  const newManifest: Record<string, any> = {}
  let renderedCount = 0
  let cachedCount = 0
  let failedCount = 0
  
  for (const chunkResults of results) {
    for (const result of chunkResults) {
      if (result) {
        newManifest[result.hash] = { hash: result.hash, file: result.file }
        if (result.cached) {
          cachedCount++
        } else {
          renderedCount++
        }
      } else {
        failedCount++
      }
    }
  }
  
  // Write manifest
  fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2))
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2)
  
  console.log('\n✨ Mermaid pre-rendering complete!')
  console.log(`   Total diagrams: ${allDiagrams.length}`)
  console.log(`   Rendered: ${renderedCount}`)
  console.log(`   Cached: ${cachedCount}`)
  console.log(`   Failed: ${failedCount}`)
  console.log(`   Duration: ${duration}s`)
  console.log(`   Output: ${outputDir}`)
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
