const fs = require('fs');
const path = require('path');

// Chapter boundaries from the source file (line numbers)
const chapters = [
  { num: 1, slug: '01-osi-and-tcpip-implementation', title: 'OSI & TCP/IP Implementation of Networking Protocols', start: 28, end: 232, exists: true },
  { num: 2, slug: '02-tcpip-network-model', title: 'TCP/IP Network Model and Implementation', start: 233, end: 368, exists: true },
  { num: 3, slug: '03-ip-addressing-techniques', title: 'Internet Protocol Addressing Techniques', start: 369, end: 1396 },
  { num: 4, slug: '04-transport-layer', title: 'Transport Layer', start: 1397, end: 1722 },
  { num: 5, slug: '05-application-layer', title: 'Application Layer', start: 1723, end: 2624 },
  { num: 6, slug: '06-voice-and-video-protocols', title: 'Voice and Video Protocols', start: 2625, end: 2643 },
  { num: 7, slug: '07-cabling-standards', title: 'Cabling Standards (Ethernet & Fibre)', start: 2644, end: 3144 },
  { num: 8, slug: '08-device-categorization', title: 'Device Categorization', start: 3145, end: 3194 },
  { num: 9, slug: '09-device-configuration', title: 'Device Configuration', start: 3195, end: 3541 },
  { num: 10, slug: '10-switches-layer2', title: 'Switches (Layer 2)', start: 3542, end: 4786 },
  { num: 11, slug: '11-routers-layer3', title: 'Routers (Layer 3)', start: 4787, end: 5772 },
  { num: 12, slug: '12-management-plane-protocols', title: 'Management Plane/Layer Protocols', start: 5773, end: 6351 },
  { num: 13, slug: '13-control-plane-protocols', title: 'Control Plane/Layer Protocols', start: 6352, end: 6592 },
  { num: 14, slug: '14-network-device-security', title: 'Network Device Security', start: 6593, end: 6807 },
  { num: 15, slug: '15-architecture-design-topology', title: 'Architecture, Design, Topology', start: 6808, end: 7088 },
  { num: 16, slug: '16-troubleshooting-tools', title: 'Troubleshooting & Information Gathering Tools', start: 7089, end: 7261 },
  { num: 17, slug: '17-troubleshooting-methodology', title: 'Network Troubleshooting Methodology', start: 7262, end: 7727 },
  { num: 18, slug: '18-wireless-standards-security', title: 'Wireless Standard & Wireless Security', start: 7728, end: 8371 },
  { num: 19, slug: '19-software-defined-networking', title: 'Software Defined Networking', start: 8372, end: 8482 },
  { num: 20, slug: '20-infrastructure-as-code', title: 'Infrastructure as Code (IaC): Automation & Orchestration', start: 8483, end: 8545 },
];

const sourceFile = '/Users/encryptedkvng/recovery/GitHub/Academy/content/study-notes/networking-ccna-ccnp/NetworkingProtcols.md';
const targetDir = '/Users/encryptedkvng/recovery/GitHub/Academy/content/learn/networking-protocols';

// Read the entire source file
const sourceContent = fs.readFileSync(sourceFile, 'utf8');
const lines = sourceContent.split('\n');

// Generate descriptions based on chapter titles
function generateDescription(title) {
  const descriptions = {
    'Internet Protocol Addressing Techniques': 'Master IPv4/IPv6 addressing, subnetting, CIDR, and address assignment protocols.',
    'Transport Layer': 'Deep dive into TCP and UDP protocols, ports, sockets, and reliable data delivery.',
    'Application Layer': 'Explore HTTP, DNS, SMTP, FTP, and other protocols that power applications.',
    'Voice and Video Protocols': 'Understand VoIP, SIP, RTP, and protocols enabling real-time communication.',
    'Cabling Standards (Ethernet & Fibre)': 'Learn copper and fiber optic cabling standards, connectors, and deployment best practices.',
    'Device Categorization': 'Categorize network devices by OSI layer, function, and role in network design.',
    'Device Configuration': 'Configure network devices including IOS boot process and command-line interfaces.',
    'Switches (Layer 2)': 'Master switch operation, VLANs, trunking, STP, and Layer 2 optimization.',
    'Routers (Layer 3)': 'Learn routing protocols, tables, static/dynamic routing, and inter-network connectivity.',
    'Management Plane/Layer Protocols': 'Explore SNMP, Syslog, NTP, and protocols for device management and monitoring.',
    'Control Plane/Layer Protocols': 'Understand routing protocols, BGP, OSPF, EIGRP, and network control mechanisms.',
    'Network Device Security': 'Implement security controls for network devices including AAA, ACLs, and hardening.',
    'Architecture, Design, Topology': 'Design scalable network architectures with proper topology and redundancy.',
    'Troubleshooting & Information Gathering Tools': 'Master ping, traceroute, Wireshark, and diagnostic utilities.',
    'Network Troubleshooting Methodology': 'Apply systematic troubleshooting approaches to resolve network issues.',
    'Wireless Standard & Wireless Security': 'Configure wireless networks with proper security using WPA3 and 802.11 standards.',
    'Software Defined Networking': 'Understand SDN architecture, controllers, and programmable network infrastructure.',
    'Infrastructure as Code (IaC): Automation & Orchestration': 'Automate network provisioning with Ansible, Terraform, and IaC principles.',
  };
  return descriptions[title] || `Learn about ${title.toLowerCase()} in modern networks.`;
}

// Process each chapter
chapters.forEach(chapter => {
  if (chapter.exists) {
    console.log(`Skipping ${chapter.slug} (already exists)`);
    return;
  }

  console.log(`Creating ${chapter.slug}...`);
  
  // Extract chapter content
  const chapterLines = lines.slice(chapter.start - 1, chapter.end);
  let content = chapterLines.join('\n');
  
  // Remove the "## Chapter X:" header
  content = content.replace(/^## Chapter \d+:\s*.*$/m, '');
  
  // Clean up multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  // Build frontmatter
  const frontmatter = `---
title: "${chapter.title}"
description: ${generateDescription(chapter.title)}
---
`;
  
  // Combine
  const finalContent = frontmatter + '\n' + content.trim() + '\n';
  
  // Write file
  const filePath = path.join(targetDir, `${chapter.slug}.mdx`);
  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`✓ Created ${chapter.slug}.mdx`);
});

console.log('\nMigration complete!');
