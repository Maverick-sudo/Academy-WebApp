const fs = require('fs');
const path = require('path');

// Course definitions
const courses = [
  {
    slug: 'network-fundamentals',
    meta: {
      title: 'Network Fundamentals',
      description: 'Master the foundational concepts of computer networking including protocol layers, IP addressing, and application protocols.',
      chapters: [
        { slug: '01-protocol-layers', title: 'Protocol Layers and Models' },
        { slug: '02-ip-addressing-subnetting', title: 'IP Addressing and Subnetting' },
        { slug: '03-application-layer-protocols', title: 'Application Layer Protocols' }
      ],
      duration: '8h',
      difficulty: 'Beginner'
    },
    chapters: [
      {
        slug: '01-protocol-layers',
        title: 'Protocol Layers and Models',
        description: 'Understanding OSI and TCP/IP protocol layer architecture.',
        sourceFile: 'fundamentals/FundamentalProtocolLayers.md',
        startLine: 1,
        endLine: 698
      },
      {
        slug: '02-ip-addressing-subnetting',
        title: 'IP Addressing and Subnetting',
        description: 'Master IP addressing schemes, CIDR notation, and subnet calculations.',
        sourceFile: 'fundamentals/IPAddressSubnetting.md',
        startLine: 1,
        endLine: 1031
      },
      {
        slug: '03-application-layer-protocols',
        title: 'Application Layer Protocols',
        description: 'Deep dive into HTTP, DNS, FTP, SMTP and other application protocols.',
        sourceFile: 'fundamentals/ApplicationLayerProtocols.md',
        startLine: 1,
        endLine: 1069
      }
    ]
  },
  {
    slug: 'network-lab-practice',
    meta: {
      title: 'Network Lab Practice',
      description: 'Hands-on network simulation and lab practice using Packet Tracer, EVE-NG, and GNS3.',
      chapters: [
        { slug: '01-virtualization-overview', title: 'Network Virtualization Overview' },
        { slug: '02-eve-ng-setup', title: 'EVE-NG Configuration' },
        { slug: '03-gns3-deployment', title: 'GNS3 Setup and Usage' },
        { slug: '04-packet-tracer', title: 'Cisco Packet Tracer' },
        { slug: '05-advanced-lab-scenarios', title: 'Advanced Lab Scenarios' }
      ],
      duration: '12h',
      difficulty: 'Intermediate'
    },
    chapters: [
      {
        slug: '01-virtualization-overview',
        title: 'Network Virtualization Overview',
        description: 'Introduction to network simulation tools and virtualization concepts.',
        sourceFile: 'PacketTracerEveNGGNS3.md',
        startLine: 1,
        endLine: 600
      },
      {
        slug: '02-eve-ng-setup',
        title: 'EVE-NG Configuration',
        description: 'Installing and configuring EVE-NG for network labs.',
        sourceFile: 'PacketTracerEveNGGNS3.md',
        startLine: 601,
        endLine: 1200
      },
      {
        slug: '03-gns3-deployment',
        title: 'GNS3 Setup and Usage',
        description: 'Setting up GNS3 and importing network device images.',
        sourceFile: 'PacketTracerEveNGGNS3.md',
        startLine: 1201,
        endLine: 1800
      },
      {
        slug: '04-packet-tracer',
        title: 'Cisco Packet Tracer',
        description: 'Using Cisco Packet Tracer for network simulations.',
        sourceFile: 'PacketTracerEveNGGNS3.md',
        startLine: 1801,
        endLine: 2400
      },
      {
        slug: '05-advanced-lab-scenarios',
        title: 'Advanced Lab Scenarios',
        description: 'Complex multi-device scenarios and troubleshooting exercises.',
        sourceFile: 'PacketTracerEveNGGNS3.md',
        startLine: 2401,
        endLine: 3089
      }
    ]
  },
  {
    slug: 'network-infrastructure',
    meta: {
      title: 'Network Infrastructure',
      description: 'Physical network infrastructure, device operations, and deployment best practices.',
      chapters: [
        { slug: '01-physical-infrastructure', title: 'Physical Infrastructure Components' },
        { slug: '02-device-operations', title: 'Network Device Operations' }
      ],
      duration: '6h',
      difficulty: 'Intermediate'
    },
    chapters: [
      {
        slug: '01-physical-infrastructure',
        title: 'Physical Infrastructure Components',
        description: 'Cabling, racks, power, and physical network components.',
        sourceFile: 'infrastructure/PhysicalInfrastructure.md',
        startLine: 1,
        endLine: -1
      },
      {
        slug: '02-device-operations',
        title: 'Network Device Operations',
        description: 'Operating and managing network devices in production.',
        sourceFile: 'operations/NetworkDeviceOperations.md',
        startLine: 1,
        endLine: -1
      }
    ]
  },
  {
    slug: 'advanced-networking',
    meta: {
      title: 'Advanced Networking',
      description: 'Advanced networking concepts including SDN, automation, security, and modern architectures.',
      chapters: [
        { slug: '01-advanced-topics', title: 'Advanced Networking Topics' }
      ],
      duration: '4h',
      difficulty: 'Advanced'
    },
    chapters: [
      {
        slug: '01-advanced-topics',
        title: 'Advanced Networking Topics',
        description: 'SDN, network automation, programmability, and emerging technologies.',
        sourceFile: 'advanced/AdvancedTopics.md',
        startLine: 1,
        endLine: -1
      }
    ]
  }
];

const STUDY_NOTES_BASE = '/Users/encryptedkvng/recovery/GitHub/Academy/content/study-notes/networking-ccna-ccnp';
const LEARN_BASE = '/Users/encryptedkvng/recovery/GitHub/Academy/content/learn';

// Clean content for MDX safety
function cleanContentForMDX(content) {
  return content
    // Escape angle brackets in prose
    .replace(/<([A-Z][A-Z_]+)>/g, '&lt;$1&gt;')
    .replace(/<parent node>/g, '(parent node)')
    .replace(/<child node>/g, '(child node)')
    .replace(/<--->/g, '↔')
    // Remove unclosed br tags
    .replace(/<br>/g, '  \n')
    // Fix problematic curly braces in prose (not in code blocks)
    .replace(/\{(\d+)\}/g, '\\{$1\\}')
    .replace(/\{([^a-zA-Z${}]+)\}/g, '($1)')
    // Preserve em-dashes but ensure they're not problematic
    .replace(/—/g, '—');
}

// Read source file with line range
function readSourceFile(sourceFile, startLine, endLine) {
  const fullPath = path.join(STUDY_NOTES_BASE, sourceFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');
  
  if (endLine === -1) {
    endLine = lines.length;
  }
  
  const extractedLines = lines.slice(startLine - 1, endLine);
  return extractedLines.join('\n');
}

// Create meta.ts file
function createMetaFile(coursePath, meta) {
  const metaContent = `import { CourseMeta } from '@/lib/learn';

export const meta: CourseMeta = {
  title: '${meta.title}',
  description: '${meta.description}',
  chapters: [
${meta.chapters.map(ch => `    { slug: '${ch.slug}', title: '${ch.title}' }`).join(',\n')}
  ],
  duration: '${meta.duration}',
  difficulty: '${meta.difficulty}'
};
`;
  
  fs.writeFileSync(path.join(coursePath, 'meta.ts'), metaContent);
  console.log(`✅ Created meta.ts for ${path.basename(coursePath)}`);
}

// Create MDX chapter file
function createChapterFile(coursePath, chapter) {
  const content = readSourceFile(chapter.sourceFile, chapter.startLine, chapter.endLine);
  const cleanedContent = cleanContentForMDX(content);
  
  const mdxContent = `---
title: "${chapter.title}"
description: "${chapter.description}"
---

${cleanedContent}

## Key Takeaways

- Completed ${chapter.title}
- Applied concepts from ${chapter.description}
- Ready to proceed to the next chapter
`;
  
  const chapterPath = path.join(coursePath, `${chapter.slug}.mdx`);
  fs.writeFileSync(chapterPath, mdxContent);
  console.log(`✅ Created ${chapter.slug}.mdx`);
}

// Main migration
function migrate() {
  console.log('🚀 Starting Phase 4 migration: Additional Network Courses\n');
  
  courses.forEach((course, index) => {
    console.log(`\n[${index + 1}/4] Migrating ${course.meta.title}...`);
    
    const coursePath = path.join(LEARN_BASE, course.slug);
    
    // Create course directory
    if (!fs.existsSync(coursePath)) {
      fs.mkdirSync(coursePath, { recursive: true });
      console.log(`📁 Created directory: ${course.slug}`);
    }
    
    // Create meta.ts
    createMetaFile(coursePath, course.meta);
    
    // Create all chapter files
    course.chapters.forEach(chapter => {
      try {
        createChapterFile(coursePath, chapter);
      } catch (error) {
        console.error(`❌ Error creating ${chapter.slug}:`, error.message);
      }
    });
  });
  
  console.log('\n✨ Phase 4 migration complete!');
  console.log('\n📊 Summary:');
  console.log(`   - 4 new courses created`);
  console.log(`   - 11 new chapters created`);
  console.log(`   - Total Learn chapters: ${65 + 11} = 76`);
  console.log('\n🔍 Next step: Run `node scripts/validate-mdx.js` to validate all MDX files');
}

migrate();
