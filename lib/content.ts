import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

function parseMatterSafe(raw: string, filePath: string) {
  try {
    return matter(raw)
  } catch (error) {
    console.error(`Frontmatter parse failed for ${filePath}:`, error)
    return { data: {}, content: raw }
  }
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

export function getMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (!item.startsWith('.') && item !== 'node_modules') {
        files.push(...getMarkdownFiles(fullPath, baseDir))
      }
    } else if (item.endsWith('.md')) {
      files.push(path.relative(baseDir, fullPath))
    }
  }

  return files
}

export function buildFileTree(dir: string, relativePath: string = ''): FileTreeNode[] {
  const tree: FileTreeNode[] = []
  
  if (!fs.existsSync(dir)) {
    return tree
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules' || item === 'out' || item === 'build') {
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
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = parseMatterSafe(fileContents, fullPath)
        
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

  return tree
}

export function getDocBySlug(slug: string[]): Doc | null {
  const possiblePaths = [
    path.join(contentDir, ...slug) + '.md',
    path.join(contentDir, ...slug, 'README.md'),
    path.join(contentDir, ...slug, 'Readme.md'),
    path.join(contentDir, ...slug, 'readme.md'),
  ]

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = parseMatterSafe(fileContents, filePath)

      return {
        slug,
        content,
        meta: data as DocMeta,
        filePath,
      }
    }
  }

  return null
}

export function getAllDocs(folder: string): Doc[] {
  const docsDir = path.join(contentDir, folder)
  
  if (!fs.existsSync(docsDir)) {
    return []
  }

  const files = getMarkdownFiles(docsDir)
  const docs: Doc[] = []

  for (const file of files) {
    const fullPath = path.join(docsDir, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = parseMatterSafe(fileContents, fullPath)
    
    const slug = file
      .replace(/\.md$/, '')
      .replace(/\/README$/i, '')
      .split('/')

    docs.push({
      slug: [folder, ...slug],
      content,
      meta: data as DocMeta,
      filePath: fullPath,
    })
  }

  return docs
}
/**
 * Get all possible slug paths for static generation
 */
export function getAllStaticPaths(): string[][] {
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
      const slug = file
        .replace(/\.md$/, '')
        .replace(/\/README$/i, '')
        .split('/')
      
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
  
  return paths
}
export function getDocsInDirectory(slug: string[]): Doc[] {
  const dirPath = path.join(contentDir, ...slug)
  
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return []
  }

  const items = fs.readdirSync(dirPath)
  const docs: Doc[] = []

  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    const stat = fs.statSync(itemPath)

    if (stat.isFile() && item.endsWith('.md')) {
      const fileContents = fs.readFileSync(itemPath, 'utf8')
      const { data, content } = parseMatterSafe(fileContents, itemPath)
      const itemSlug = [...slug, item.replace(/\.md$/, '')]

      docs.push({
        slug: itemSlug,
        content,
        meta: data as DocMeta,
        filePath: itemPath,
      })
    } else if (stat.isDirectory() && !item.startsWith('.')) {
      const readmePath = path.join(itemPath, 'README.md')
      if (fs.existsSync(readmePath)) {
        const fileContents = fs.readFileSync(readmePath, 'utf8')
        const { data, content } = parseMatterSafe(fileContents, readmePath)
        const itemSlug = [...slug, item]

        docs.push({
          slug: itemSlug,
          content,
          meta: data as DocMeta,
          filePath: readmePath,
        })
      }
    }
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
  return `https://github.com/Maverick-sudo/${repoName}/blob/main/${filePath}.md`
}
