const fs = require('fs');
const path = require('path');

const learnDir = '/Users/encryptedkvng/recovery/GitHub/Academy/content/learn';

function removeDuplicateHeader(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let frontmatterEnd = -1;
  let dashCount = 0;
  
  // Find where frontmatter ends
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      dashCount++;
      if (dashCount === 2) {
        frontmatterEnd = i;
        break;
      }
    }
  }
  
  if (frontmatterEnd === -1) {
    return false; // No frontmatter found
  }
  
  // Look for first H1 or H2 after frontmatter (skip empty lines)
  let headerIndex = -1;
  for (let i = frontmatterEnd + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue; // Skip empty lines
    
    if (line.startsWith('## ') || line.startsWith('# ')) {
      headerIndex = i;
      break;
    } else {
      // If we hit content that's not a header, stop looking
      break;
    }
  }
  
  if (headerIndex === -1) {
    return false; // No header found
  }
  
  // Remove the header line
  lines.splice(headerIndex, 1);
  
  // Write back
  fs.writeFileSync(filePath, lines.join('\n'));
  return true;
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subdir = path.join(dir, entry.name);
      count += processDirectory(subdir);
    } else if (entry.name.endsWith('.mdx')) {
      const filePath = path.join(dir, entry.name);
      if (removeDuplicateHeader(filePath)) {
        console.log(`✅ Removed header from: ${path.relative(learnDir, filePath)}`);
        count++;
      }
    }
  }
  
  return count;
}

console.log('🔧 Removing duplicate headers from Learn chapters...\n');
const totalFixed = processDirectory(learnDir);
console.log(`\n✨ Fixed ${totalFixed} files`);
