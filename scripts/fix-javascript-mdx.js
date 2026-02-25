const fs = require('fs');

const filePath = 'content/learn/programming-languages/01-javascript.mdx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let inCodeBlock = false;
let modified = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Track code blocks
    if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
    }
    
    if (inCodeBlock) continue;
    
    // Replace specific problematic patterns
    const patterns = [
        // Curly braces with content
        [/{([^}]+)}/g, (match, content) => {
            // Skip if already in backticks
            const before = line.substring(0, line.indexOf(match));
            const backticksCount = (before.match(/`/g) || []).length;
            if (backticksCount % 2 === 1) return match; // Inside backticks
            
            // Wrap in backticks
            return '`' + match + '`';
        }]
    ];
    
    patterns.forEach(([pattern, replacement]) => {
        const newLine = line.replace(pattern, replacement);
        if (newLine !== line) {
            console.log(`Line ${i + 1}: Fixed curly braces`);
            lines[i] = newLine;
            modified = true;
        }
    });
}

if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('\nFile updated successfully!');
} else {
    console.log('\nNo changes needed.');
}
