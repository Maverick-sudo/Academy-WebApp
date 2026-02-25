import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface DocumentMetadata {
  title: string
  href: string
  summary?: string
  concepts?: string[]
  lineCount?: number
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime?: string
  category?: string
}

/**
 * Extract key concepts from markdown content
 * Looks for technical terms, headings, and important keywords
 */
function extractConcepts(content: string, maxConcepts = 8): string[] {
  const concepts = new Set<string>()
  
  // Extract from headings (### or ##)
  const headingMatches = content.match(/^#{2,3}\s+(.+)$/gm)
  if (headingMatches) {
    headingMatches.forEach(heading => {
      const clean = heading.replace(/^#+\s+/, '').trim()
      if (clean.length > 3 && clean.length < 50) {
        concepts.add(clean)
      }
    })
  }
  
  // Extract bold terms (**term**)
  const boldMatches = content.match(/\*\*([^*]+)\*\*/g)
  if (boldMatches) {
    boldMatches.slice(0, 10).forEach(match => {
      const clean = match.replace(/\*\*/g, '').trim()
      if (clean.length > 3 && clean.length < 40 && !clean.includes('\n')) {
        concepts.add(clean)
      }
    })
  }
  
  // Extract code terms (`term`)
  const codeMatches = content.match(/`([^`]+)`/g)
  if (codeMatches) {
    codeMatches.slice(0, 15).forEach(match => {
      const clean = match.replace(/`/g, '').trim()
      if (clean.length > 2 && clean.length < 30 && !clean.includes('\n') && !clean.includes(' ')) {
        concepts.add(clean)
      }
    })
  }
  
  return Array.from(concepts).slice(0, maxConcepts)
}

/**
 * Extract a summary from markdown content
 * Tries to get the first meaningful paragraph
 */
function extractSummary(content: string, maxLength = 150): string {
  // Remove frontmatter if present
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '')
  
  // Remove headings at the start
  const withoutHeadings = withoutFrontmatter.replace(/^#+\s+.+\n+/gm, '')
  
  // Get first paragraph
  const paragraphs = withoutHeadings.split(/\n\n+/)
  const firstParagraph = paragraphs.find(p => p.trim().length > 50)
  
  if (!firstParagraph) return ''
  
  // Clean up the paragraph
  let summary = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
    .replace(/[*_`]/g, '') // Remove markdown formatting
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
  
  // Truncate if needed
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength).trim()
    const lastSpace = summary.lastIndexOf(' ')
    if (lastSpace > maxLength - 20) {
      summary = summary.substring(0, lastSpace)
    }
    summary += '...'
  }
  
  return summary
}

/**
 * Calculate reading time based on line count
 */
function estimateReadingTime(lineCount: number): string {
  const wordsPerLine = 10
  const wordsPerMinute = 200
  const totalWords = lineCount * wordsPerLine
  const minutes = Math.ceil(totalWords / wordsPerMinute)
  
  if (minutes < 5) return '< 5 min read'
  if (minutes < 60) return `${minutes} min read`
  const hours = Math.floor(minutes / 60)
  const remainingMins = minutes % 60
  return `${hours}h ${remainingMins}m read`
}

/**
 * Extract metadata from a markdown file
 */
export function extractMetadataFromFile(filePath: string, baseHref: string): DocumentMetadata | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)
    
    // Count lines
    const lineCount = fileContent.split('\n').length
    
    // Extract title (from frontmatter or first heading)
    let title = frontmatter.title || ''
    if (!title) {
      const headingMatch = content.match(/^#\s+(.+)$/m)
      if (headingMatch) {
        title = headingMatch[1]
      }
    }
    
    // Get or extract summary
    const summary = frontmatter.description || extractSummary(content)
    
    // Get or extract concepts
    const concepts = frontmatter.concepts || extractConcepts(content)
    
    // Get difficulty
    const difficulty = frontmatter.difficulty as 'Beginner' | 'Intermediate' | 'Advanced' | undefined
    
    // Calculate reading time
    const estimatedTime = frontmatter.estimatedTime || estimateReadingTime(lineCount)
    
    return {
      title: title || path.basename(filePath, '.md'),
      href: baseHref,
      summary,
      concepts: Array.isArray(concepts) ? concepts : [],
      lineCount,
      difficulty,
      estimatedTime,
      category: frontmatter.category
    }
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error)
    return null
  }
}

/**
 * Predefined study notes index with manually curated metadata
 * This provides better control over what's displayed
 */
export const studyNotesMetadata: Record<string, DocumentMetadata[]> = {
  'Security': [
    {
      title: 'OWASP Top 10',
      href: '/docs/study-notes/security/web-security/OwaspTop10',
      summary: 'Comprehensive guide to the top 10 web application security risks including injection attacks, broken authentication, XSS, and security misconfigurations.',
      concepts: ['SQL Injection', 'XSS', 'CSRF', 'Broken Authentication', 'Security Misconfiguration', 'XXE', 'Broken Access Control', 'Sensitive Data Exposure'],
      difficulty: 'Intermediate',
      estimatedTime: '45 min read',
      category: 'Security'
    },
    {
      title: 'Security Foundations & Frameworks',
      href: '/docs/study-notes/security/foundations/SecurityFoundationsFrameworks',
      summary: 'Enterprise security governance, risk management frameworks (NIST, ISO 27001), compliance standards, and security architecture principles.',
      concepts: ['NIST Framework', 'ISO 27001', 'Risk Management', 'Governance', 'Compliance', 'CIA Triad', 'Defense in Depth'],
      difficulty: 'Advanced',
      estimatedTime: '1h read',
      category: 'Security'
    },
    {
      title: 'Penetration Testing & Attack Techniques',
      href: '/docs/study-notes/security/offensive-security/PenetrationTestingAttackTechniques',
      summary: 'Offensive security methodologies, penetration testing phases, exploitation techniques, and post-exploitation strategies.',
      concepts: ['Reconnaissance', 'Exploitation', 'Post-Exploitation', 'Privilege Escalation', 'Lateral Movement', 'Metasploit', 'Kali Linux'],
      difficulty: 'Advanced',
      estimatedTime: '1h 15m read',
      category: 'Security'
    },
    {
      title: 'Defense Implementation & Operations',
      href: '/docs/study-notes/security/defensive-security/DefenseImplementationandOperations',
      summary: 'Defensive security operations including EDR, SIEM, endpoint protection, incident response, and security monitoring.',
      concepts: ['EDR', 'SIEM', 'Endpoint Protection', 'Incident Response', 'Security Monitoring', 'Threat Hunting', 'SOC Operations'],
      difficulty: 'Intermediate',
      estimatedTime: '2h read',
      category: 'Security'
    },
    {
      title: 'Active Directory Penetration Testing',
      href: '/docs/study-notes/security/ethical-hacking/ActiveDirectoryPentest',
      summary: 'Advanced Active Directory exploitation techniques, Kerberos attacks, domain persistence, and enterprise network compromise.',
      concepts: ['Kerberoasting', 'Pass-the-Hash', 'Golden Ticket', 'Domain Enumeration', 'Bloodhound', 'LDAP', 'Privilege Escalation'],
      difficulty: 'Advanced',
      estimatedTime: '50 min read',
      category: 'Security'
    }
  ],
  'Networking': [
    {
      title: 'Network Device Operations',
      href: '/docs/study-notes/networking-ccna-ccnp/operations/NetworkDeviceOperations',
      summary: 'Router and switch operations covering IOS fundamentals, routing protocols (OSPF, EIGRP, BGP), VLANs, and device management.',
      concepts: ['OSPF', 'EIGRP', 'BGP', 'VLANs', 'Trunking', 'STP', 'HSRP', 'Port Channels'],
      difficulty: 'Intermediate',
      estimatedTime: '1h 30m read',
      category: 'Networking'
    },
    {
      title: 'Fundamental Protocols & Layers',
      href: '/docs/study-notes/networking-ccna-ccnp/fundamentals/FundamentalProtocolLayers',
      summary: 'OSI model, TCP/IP stack, encapsulation, protocol operations, and fundamental networking concepts.',
      concepts: ['OSI Model', 'TCP/IP', 'Encapsulation', 'Layer 2', 'Layer 3', 'Ethernet', 'IP'],
      difficulty: 'Beginner',
      estimatedTime: '40 min read',
      category: 'Networking'
    },
    {
      title: 'IP Addressing & Subnetting',
      href: '/docs/study-notes/networking-ccna-ccnp/fundamentals/IPAddressSubnetting',
      summary: 'IPv4 and IPv6 addressing, subnetting calculations, CIDR notation, and network design principles.',
      concepts: ['IPv4', 'IPv6', 'Subnetting', 'CIDR', 'VLSM', 'Subnet Mask', 'Network Address'],
      difficulty: 'Intermediate',
      estimatedTime: '35 min read',
      category: 'Networking'
    },
    {
      title: 'Physical Infrastructure',
      href: '/docs/study-notes/networking-ccna-ccnp/infrastructure/PhysicalInfrastructure',
      summary: 'Ethernet cabling standards (IEEE 802.3), fiber optics, copper transmission, and physical layer implementations.',
      concepts: ['Cat5e', 'Cat6', 'Fiber Optic', 'Ethernet Standards', 'PoE', '10GBASE-T', 'SFP'],
      difficulty: 'Beginner',
      estimatedTime: '30 min read',
      category: 'Networking'
    },
    {
      title: 'Application Layer Protocols',
      href: '/docs/study-notes/networking-ccna-ccnp/fundamentals/ApplicationLayerProtocols',
      summary: 'HTTP, DNS, DHCP, FTP, SSH, and other application layer protocols with practical examples.',
      concepts: ['HTTP', 'DNS', 'DHCP', 'FTP', 'SSH', 'Telnet', 'SNMP'],
      difficulty: 'Beginner',
      estimatedTime: '25 min read',
      category: 'Networking'
    }
  ],
  'Programming': [
    {
      title: 'JavaScript Fundamentals',
      href: '/docs/study-notes/programming-languages/Javascript/Javascript_Intro',
      summary: 'Core JavaScript concepts including variables, data types, functions, objects, arrays, and modern ES6+ features.',
      concepts: ['Variables', 'Functions', 'Objects', 'Arrays', 'ES6', 'Promises', 'Async/Await', 'DOM'],
      difficulty: 'Beginner',
      estimatedTime: '45 min read',
      category: 'Programming'
    },
    {
      title: 'Python Introduction',
      href: '/docs/study-notes/programming-languages/python/Python_intro',
      summary: 'Python fundamentals covering syntax, data structures, functions, OOP, and common libraries.',
      concepts: ['Python Syntax', 'Data Structures', 'Functions', 'Classes', 'Modules', 'pip', 'Virtual Environments'],
      difficulty: 'Beginner',
      estimatedTime: '40 min read',
      category: 'Programming'
    },
    {
      title: 'PHP Documentation',
      href: '/docs/study-notes/programming-languages/PHP/PHP_Docs',
      summary: 'PHP web development guide covering syntax, forms, databases, sessions, and server-side programming.',
      concepts: ['PHP Syntax', 'Forms', 'MySQL', 'Sessions', 'Cookies', 'File Handling', 'PDO'],
      difficulty: 'Intermediate',
      estimatedTime: '50 min read',
      category: 'Programming'
    }
  ],
  'Web Development': [
    {
      title: 'CSS & Styling',
      href: '/docs/study-notes/web-development/frontend/css/Cascading_Style_Sheet',
      summary: 'Comprehensive CSS guide including selectors, box model, flexbox, grid, animations, and responsive design with Bootstrap.',
      concepts: ['CSS Selectors', 'Box Model', 'Flexbox', 'Grid', 'Responsive Design', 'Bootstrap', 'Media Queries'],
      difficulty: 'Intermediate',
      estimatedTime: '1h read',
      category: 'Web Development'
    },
    {
      title: 'React JS Framework',
      href: '/docs/study-notes/web-development/frontend/react/React_JSFramework',
      summary: 'React fundamentals covering components, JSX, state, props, hooks, and component lifecycle.',
      concepts: ['Components', 'JSX', 'State', 'Props', 'Hooks', 'useState', 'useEffect', 'Virtual DOM'],
      difficulty: 'Intermediate',
      estimatedTime: '55 min read',
      category: 'Web Development'
    }
  ],
  'Databases': [
    {
      title: 'SQL Fundamentals',
      href: '/docs/study-notes/databases/SQL/SQL',
      summary: 'Structured Query Language covering SELECT, JOIN, subqueries, transactions, and database design principles.',
      concepts: ['SELECT', 'JOIN', 'WHERE', 'GROUP BY', 'Transactions', 'Indexes', 'Normalization', 'Views'],
      difficulty: 'Beginner',
      estimatedTime: '35 min read',
      category: 'Databases'
    }
  ],
  'Low-Level Programming': [
    {
      title: 'Assembly Language',
      href: '/docs/study-notes/low-level-languages/assembly-language/assembly-notes',
      summary: 'Low-level programming with assembly language, CPU architecture, registers, and machine code.',
      concepts: ['Registers', 'Instructions', 'Stack', 'Memory', 'x86', 'x64', 'Opcodes'],
      difficulty: 'Advanced',
      estimatedTime: '1h 10m read',
      category: 'Low-Level Programming'
    },
    {
      title: 'C/C++ Programming',
      href: '/docs/study-notes/low-level-languages/c-cpp/c-cpp-notes',
      summary: 'Systems programming with C and C++ covering pointers, memory management, and low-level operations.',
      concepts: ['Pointers', 'Memory Management', 'Structs', 'malloc', 'free', 'Header Files', 'Compilation'],
      difficulty: 'Advanced',
      estimatedTime: '1h 5m read',
      category: 'Low-Level Programming'
    }
  ],
  'Cloud & System Administration': [
    {
      title: 'AWS EC2 Web Server Setup',
      href: '/docs/study-notes/system-architecture/system-administration/AwsEC2WebServerSetup',
      summary: 'Complete guide to launching and configuring web servers on AWS EC2 including security groups and SSH access.',
      concepts: ['AWS EC2', 'Security Groups', 'SSH', 'Linux', 'Apache', 'NGINX', 'IAM'],
      difficulty: 'Intermediate',
      estimatedTime: '30 min read',
      category: 'Cloud'
    },
    {
      title: 'Azure ExpressRoute Deep Dive',
      href: '/docs/study-notes/system-architecture/system-administration/AzureExpressRouteDeepDive',
      summary: 'Enterprise hybrid connectivity using Azure ExpressRoute for dedicated private connections to Azure.',
      concepts: ['ExpressRoute', 'Azure', 'Hybrid Cloud', 'Private Peering', 'BGP', 'VNet Gateway'],
      difficulty: 'Advanced',
      estimatedTime: '40 min read',
      category: 'Cloud'
    }
  ]
}
