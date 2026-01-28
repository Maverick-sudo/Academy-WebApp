import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')
const EXCLUDED_DIRS = new Set([
  'node_modules',
  'out',
  'build',
  'inventory',
  'roles',
  'playbooks',
  'group_vars',
  'host_vars',
  'templates',
  'defaults',
  'tasks',
])

function shouldSkipDir(name: string): boolean {
  return name.startsWith('.') || EXCLUDED_DIRS.has(name)
}

// In-memory cache for parsed content (enabled outside development)
const shouldCache = process.env.NODE_ENV !== 'development'
const contentCache = new Map<string, Doc>()
const fileParseCache = new Map<string, { data: DocMeta; content: string }>()
const markdownFilesCache = new Map<string, string[]>()
const fileTreeCache = new Map<string, FileTreeNode[]>()
const docsInDirCache = new Map<string, Doc[]>()
const allDocsCache = new Map<string, Doc[]>()
let allDocsForSearchCache: Array<{
  slug: string[]
  title: string
  description?: string
  content: string
}> | null = null
let staticPathsCache: string[][] | null = null
let contentHealthCache: ContentHealth | null = null

function parseMatterSafe(raw: string, filePath: string) {
  try {
    return matter(raw)
  } catch (error) {
    console.error(`Frontmatter parse failed for ${filePath}:`, error)
    return { data: {}, content: raw }
  }
}

function readAndParseFile(filePath: string): { data: DocMeta; content: string } {
  if (shouldCache && fileParseCache.has(filePath)) {
    return fileParseCache.get(filePath)!
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = parseMatterSafe(fileContents, filePath)
  const result = { data: data as DocMeta, content }

  if (shouldCache) {
    fileParseCache.set(filePath, result)
  }

  return result
}

export interface DocMeta {
  title: string
  description?: string
  date?: string
  status?: 'draft' | 'updated' | 'complete'
  [key: string]: any
}

export interface Doc {
  slug: string[]
  content: string
  meta: DocMeta
  filePath: string
}

export interface FileTreeNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileTreeNode[]
  meta?: DocMeta
}

export interface ContentHealthRepo {
  name: string
  exists: boolean
  docCount: number
  readmeExists: boolean
}

export interface ContentHealth {
  ok: boolean
  totalDocs: number
  repos: ContentHealthRepo[]
  errors: string[]
}

export function getMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  if (shouldCache && baseDir === dir && markdownFilesCache.has(dir)) {
    return markdownFilesCache.get(dir)!
  }

  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (!shouldSkipDir(item)) {
        files.push(...getMarkdownFiles(fullPath, baseDir))
      }
    } else if (item.endsWith('.md')) {
      files.push(path.relative(baseDir, fullPath))
    }
  }

  if (shouldCache && baseDir === dir) {
    markdownFilesCache.set(dir, files)
  }

  return files
}

export function buildFileTree(dir: string, relativePath: string = ''): FileTreeNode[] {
  const cacheKey = `${dir}:${relativePath}`
  if (shouldCache && fileTreeCache.has(cacheKey)) {
    return fileTreeCache.get(cacheKey)!
  }

  const tree: FileTreeNode[] = []
  
  if (!fs.existsSync(dir)) {
    return tree
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    if (shouldSkipDir(item)) {
      continue
    }

    const fullPath = path.join(dir, item)
    const itemRelativePath = relativePath ? path.join(relativePath, item) : item
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const children = buildFileTree(fullPath, itemRelativePath)
      if (children.length > 0) {
        tree.push({
          name: item,
          path: itemRelativePath,
          type: 'directory',
          children: children.sort((a, b) => {
            if (a.type !== b.type) {
              return a.type === 'directory' ? -1 : 1
            }
            return a.name.localeCompare(b.name)
          })
        })
      }
    } else if (item.endsWith('.md')) {
      try {
        const { data } = readAndParseFile(fullPath)
        
        tree.push({
          name: item.replace(/\.md$/, ''),
          path: itemRelativePath.replace(/\.md$/, ''),
          type: 'file',
          meta: data as DocMeta
        })
      } catch (error) {
        console.error(`Error reading ${fullPath}:`, error)
      }
    }
  }

  if (shouldCache) {
    fileTreeCache.set(cacheKey, tree)
  }

  return tree
}

export function getDocBySlug(slug: string[]): Doc | null {
  const cacheKey = slug.join('/')
  
  // Check cache first
  if (shouldCache && contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!
  }

  const possiblePaths = [
    path.join(contentDir, ...slug) + '.md',
    path.join(contentDir, ...slug, 'README.md'),
    path.join(contentDir, ...slug, 'Readme.md'),
    path.join(contentDir, ...slug, 'readme.md'),
  ]

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const { data, content } = readAndParseFile(filePath)

      const doc = {
        slug,
        content,
        meta: data as DocMeta,
        filePath,
      }
      
      // Cache the result
      if (shouldCache) {
        contentCache.set(cacheKey, doc)
      }

      return doc
    }
  }

  return null
}

export function getAllDocs(folder: string): Doc[] {
  if (shouldCache && allDocsCache.has(folder)) {
    return allDocsCache.get(folder)!
  }

  const docsDir = path.join(contentDir, folder)
  
  if (!fs.existsSync(docsDir)) {
    return []
  }

  const files = getMarkdownFiles(docsDir)
  const docs: Doc[] = []

  for (const file of files) {
    const fullPath = path.join(docsDir, file)
    const { data, content } = readAndParseFile(fullPath)
    
    const normalized = file
      .replace(/\.md$/, '')
      .replace(/\/README$/i, '')
    const slug = /^README$/i.test(normalized) ? [] : normalized.split('/')

    docs.push({
      slug: [folder, ...slug],
      content,
      meta: data as DocMeta,
      filePath: fullPath,
    })
  }

  if (shouldCache) {
    allDocsCache.set(folder, docs)
  }

  return docs
}
/**
 * Get all possible slug paths for static generation
 */
export function getAllStaticPaths(): string[][] {
  if (shouldCache && staticPathsCache) {
    return staticPathsCache
  }

  const paths: string[][] = []
  
  // Get all docs from all repositories
  const repositories = ['study-notes', 'automation', 'Python-Projects', 'CCNA-Labs']
  
  for (const repo of repositories) {
    const repoPath = path.join(contentDir, repo)
    
    if (!fs.existsSync(repoPath)) {
      continue
    }

    // Get all markdown files
    const files = getMarkdownFiles(repoPath)
    
    for (const file of files) {
      const normalized = file
        .replace(/\.md$/, '')
        .replace(/\/README$/i, '')
      const slug = /^README$/i.test(normalized) ? [] : normalized.split('/')
      
      paths.push([repo, ...slug])
    }

    // Also add directory paths for folder indexes
    const tree = buildFileTree(repoPath)
    const addDirectoryPaths = (nodes: FileTreeNode[], prefix: string[] = [repo]) => {
      for (const node of nodes) {
        if (node.type === 'directory' && node.children && node.children.length > 0) {
          paths.push([...prefix, node.name])
          addDirectoryPaths(node.children, [...prefix, node.name])
        }
      }
    }
    addDirectoryPaths(tree)
  }
  
  if (shouldCache) {
    staticPathsCache = paths
  }

  return paths
}
export function getDocsInDirectory(slug: string[]): Doc[] {
  const dirPath = path.join(contentDir, ...slug)
  const cacheKey = slug.join('/')

  if (shouldCache && docsInDirCache.has(cacheKey)) {
    return docsInDirCache.get(cacheKey)!
  }
  
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return []
  }

  const items = fs.readdirSync(dirPath)
  const docs: Doc[] = []

  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    const stat = fs.statSync(itemPath)

    if (stat.isFile() && item.endsWith('.md')) {
      const { data, content } = readAndParseFile(itemPath)
      const itemSlug = [...slug, item.replace(/\.md$/, '')]

      docs.push({
        slug: itemSlug,
        content,
        meta: data as DocMeta,
        filePath: itemPath,
      })
    } else if (stat.isDirectory() && !shouldSkipDir(item)) {
      const readmePaths = [
        path.join(itemPath, 'README.md'),
        path.join(itemPath, 'Readme.md'),
        path.join(itemPath, 'readme.md'),
      ]
      const existingReadme = readmePaths.find(candidate => fs.existsSync(candidate))
      if (existingReadme) {
        const { data, content } = readAndParseFile(existingReadme)
        const itemSlug = [...slug, item]

        docs.push({
          slug: itemSlug,
          content,
          meta: data as DocMeta,
          filePath: existingReadme,
        })
      }
    }
  }

  if (shouldCache) {
    docsInDirCache.set(cacheKey, docs)
  }

  return docs
}

export function getSlugVariations(slug: string[]): string[][] {
  const variations: string[][] = []
  variations.push(slug)
  variations.push([...slug, 'README'])
  variations.push([...slug, 'Readme'])
  variations.push([...slug, 'readme'])
  return variations
}

export function getAllDocsForSearch(): Array<{
  slug: string[]
  title: string
  description?: string
  content: string
}> {
  if (shouldCache && allDocsForSearchCache) {
    return allDocsForSearchCache
  }

  const repos = ['automation', 'CCNA-Labs', 'Python-Projects', 'study-notes']
  const allDocs: Array<{
    slug: string[]
    title: string
    description?: string
    content: string
  }> = []

  for (const repo of repos) {
    const docs = getAllDocs(repo)
    allDocs.push(
      ...docs.map(doc => ({
        slug: doc.slug,
        title: doc.meta.title || doc.slug[doc.slug.length - 1],
        description: doc.meta.description,
        content: doc.content,
      }))
    )
  }

  if (shouldCache) {
    allDocsForSearchCache = allDocs
  }

  return allDocs
}

export function getAdjacentDocs(currentSlug: string[]): {
  prev: { slug: string[]; title: string } | null
  next: { slug: string[]; title: string } | null
} {
  const allDocs = getAllDocsForSearch()
  const currentIndex = allDocs.findIndex(
    doc => doc.slug.join('/') === currentSlug.join('/')
  )

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0
      ? { slug: allDocs[currentIndex - 1].slug, title: allDocs[currentIndex - 1].title }
      : null,
    next: currentIndex < allDocs.length - 1
      ? { slug: allDocs[currentIndex + 1].slug, title: allDocs[currentIndex + 1].title }
      : null,
  }
}

export function getContentHealth(): ContentHealth {
  if (shouldCache && contentHealthCache) {
    return contentHealthCache
  }

  const repos = ['study-notes', 'automation', 'Python-Projects', 'CCNA-Labs']
  const errors: string[] = []
  let totalDocs = 0

  const repoStats: ContentHealthRepo[] = repos.map(repo => {
    const repoPath = path.join(contentDir, repo)
    const exists = fs.existsSync(repoPath)
    const readmeExists = exists && (
      fs.existsSync(path.join(repoPath, 'README.md')) ||
      fs.existsSync(path.join(repoPath, 'Readme.md')) ||
      fs.existsSync(path.join(repoPath, 'readme.md'))
    )
    const docCount = exists ? getAllDocs(repo).length : 0

    if (!exists) {
      errors.push(`Missing content repository: ${repo}`)
    } else if (docCount === 0) {
      errors.push(`No markdown docs found in ${repo}`)
    }

    totalDocs += docCount

    return {
      name: repo,
      exists,
      docCount,
      readmeExists,
    }
  })

  const health: ContentHealth = {
    ok: errors.length === 0,
    totalDocs,
    repos: repoStats,
    errors,
  }

  if (shouldCache) {
    contentHealthCache = health
  }

  return health
}

export function getGitHubUrl(slug: string[]): string | null {
  if (slug.length === 0) return null

  const repoMap: Record<string, string> = {
    'automation': 'Automation',
    'CCNA-Labs': 'CCNA-Labs',
    'Python-Projects': 'Python-Projects',
    'study-notes': 'study-notes',
  }

  const repo = slug[0]
  const repoName = repoMap[repo]
  
  if (!repoName) return null

  const filePath = slug.slice(1).join('/')
  if (!filePath) {
    return `https://github.com/Maverick-sudo/${repoName}/blob/main/README.md`
  }
  if (/\/README$/i.test(filePath) || /^README$/i.test(filePath)) {
    const basePath = filePath.replace(/\/?README$/i, '')
    const readmePath = basePath ? `${basePath}/README.md` : 'README.md'
    return `https://github.com/Maverick-sudo/${repoName}/blob/main/${readmePath}`
  }
  return `https://github.com/Maverick-sudo/${repoName}/blob/main/${filePath}.md`
}
