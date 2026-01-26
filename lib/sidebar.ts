import { buildFileTree, FileTreeNode } from './content'
import path from 'path'

export interface SidebarItem {
  id: string
  label: string
  href?: string
  type: 'file' | 'directory'
  items?: SidebarItem[]
  status?: 'draft' | 'updated' | 'complete'
  icon?: string
}

const contentDir = path.join(process.cwd(), 'content')

// Repository configuration
const repositories = [
  {
    id: 'study-notes',
    label: '📚 Study Notes',
    path: 'study-notes',
    icon: '📚',
  },
  {
    id: 'automation',
    label: '🤖 Automation',
    path: 'automation',
    icon: '🤖',
  },
  {
    id: 'ccna-labs',
    label: '🌐 CCNA Labs',
    path: 'CCNA-Labs',
    icon: '🌐',
  },
  {
    id: 'python-projects',
    label: '🐍 Python Projects',
    path: 'Python-Projects',
    icon: '🐍',
  },
]

/**
 * Convert FileTreeNode to SidebarItem
 */
function treeNodeToSidebarItem(node: FileTreeNode, parentPath: string): SidebarItem {
  const fullPath = parentPath ? `${parentPath}/${node.path}` : node.path
  const href = node.type === 'file' ? `/docs/${fullPath}` : undefined

  return {
    id: fullPath,
    label: formatLabel(node.name),
    href,
    type: node.type,
    status: node.meta?.status,
    items: node.children?.map(child => 
      treeNodeToSidebarItem(child, parentPath ? parentPath.split('/')[0] : node.path)
    ),
  }
}

/**
 * Format label from filename/foldername
 */
function formatLabel(name: string): string {
  return name
    .replace(/README/i, 'Overview')
    .replace(/[-_]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Generate dynamic sidebar structure from file system
 */
export async function generateSidebarStructure(): Promise<SidebarItem[]> {
  const sidebar: SidebarItem[] = [
    {
      id: 'home',
      label: '🏠 Home',
      href: '/',
      type: 'file',
    },
  ]

  for (const repo of repositories) {
    const repoPath = path.join(contentDir, repo.path)
    const tree = buildFileTree(repoPath)

    if (tree.length > 0) {
      sidebar.push({
        id: repo.id,
        label: repo.label,
        type: 'directory',
        icon: repo.icon,
        items: tree.map(node => treeNodeToSidebarItem(node, repo.path)),
      })
    }
  }

  return sidebar
}
