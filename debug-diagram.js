const crypto = require('crypto');
const fs = require('fs');

// Read the source file
const content = fs.readFileSync('content/study-notes/security/ethical-hacking/ActiveDirectoryPentest.md', 'utf8');

// Extract the diagram at line 310
const lines = content.split('\n');
let inDiagram = false;
let diagramLines = [];
let lineNum = 0;

for (const line of lines) {
  lineNum++;
  if (lineNum >= 310 && line.includes('mermaid')) {
    inDiagram = true;
    continue;
  }
  if (inDiagram) {
    if (line.includes('```')) break;
    diagramLines.push(line);
  }
}

const originalCode = diagramLines.join('\n');
console.log('=== ORIGINAL CODE (first 400 chars) ===');
console.log(originalCode.substring(0, 400));
console.log('');
console.log('Contains <br/>:', originalCode.includes('<br/>'));
console.log('');

// Apply normalization
const normalized = originalCode
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/\r\n/g, '\n')
  .replace(/\r/g, '\n')
  .replace(/[─│┌┐└┘├┤┬┴┼]/g, '-')
  .trim();

console.log('=== NORMALIZED CODE (first 400 chars) ===');
console.log(normalized.substring(0, 400));
console.log('');
console.log('Contains <br/>:', normalized.includes('<br/>'));
console.log('');

const hash = crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 16);
console.log('=== HASH ===');
console.log(hash);
console.log('Expected: 35aa805c9e8ee28c');
