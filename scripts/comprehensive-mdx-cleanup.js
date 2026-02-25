const fs = require('fs');
const path = require('path');

/**
 * Comprehensive MDX Cleanup Script
 * Fixes all common MDX parsing issues that cause build failures
 */

const filePath = process.argv[2] || 'content/learn/programming-languages/01-javascript.mdx';

console.log(`🔧 Processing: ${filePath}\n`);

let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
const fixedLines = [];
let inCodeBlock = false;
let issuesFixed = 0;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const originalLine = line;
    
    // Track code blocks
    if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        fixedLines.push(line);
        continue;
    }
    
    // Skip lines already in code blocks
    if (inCodeBlock) {
        fixedLines.push(line);
        continue;
    }
    
    // Track if we're inside backticks
    let inBacktick = false;
    let charArray = line.split('');
    let newLine = '';
    
    for (let j = 0; j < charArray.length; j++) {
        const char = charArray[j];
        const nextChar = j < charArray.length - 1 ? charArray[j + 1] : '';
        const next2Chars = j < charArray.length - 2 ? charArray[j + 1] + charArray[j + 2] : '';
        
        if (char === '`') {
            inBacktick = !inBacktick;
            newLine += char;
            continue;
        }
        
        // Skip if inside backticks
        if (inBacktick) {
            newLine += char;
            continue;
        }
        
        // Fix: Angle brackets that look like HTML tags
        // Match patterns like: <key>, <package>, <value>, <file>, etc.
        if (char === '<' && /[a-zA-Z]/.test(nextChar)) {
            // Look ahead to find the closing >
            let endIndex = j + 1;
            let tagContent = '';
            while (endIndex < charArray.length && charArray[endIndex] !== '>') {
                tagContent += charArray[endIndex];
                endIndex++;
            }
            
            // If we found a closing > and it looks like a placeholder tag
            if (endIndex < charArray.length && charArray[endIndex] === '>') {
                // Check if it's a simple word tag (not HTML like <script>, <head>)
                if (/^[a-z_\-\s]+$/i.test(tagContent) && !['script', 'head', 'body', 'html', 'div', 'span'].includes(tagContent.toLowerCase())) {
                    newLine += '`<' + tagContent + '>`';
                    j = endIndex;
                    continue;
                }
            }
        }
        
        // Fix: Arrow patterns like <->, <-, ->
        if (char === '<' && nextChar === '-') {
            if (charArray[j + 2] === '>') {
                newLine += '→';
                j += 2;
                continue;
            } else {
                newLine += ':';
                j += 1;
                continue;
            }
        }
        
        if (char === '-' && nextChar === '>') {
            newLine += '→';
            j += 1;
            continue;
        }
        
        // Fix: Curly braces with content that looks like code
        if (char === '{') {
            // Look ahead to find the closing }
            let endIndex = j + 1;
            let braceContent = '';
            let braceDepth = 1;
            
            while (endIndex < charArray.length && braceDepth > 0) {
                if (charArray[endIndex] === '{') braceDepth++;
                if (charArray[endIndex] === '}') braceDepth--;
                if (braceDepth > 0) braceContent += charArray[endIndex];
                endIndex++;
            }
            
            // If we found matching braces and content looks like code
            if (braceDepth === 0 && braceContent.length > 0) {
                // Check if it contains code-like patterns
                const hasCodePattern = /[:=]|return|function|const|let|var|=>/.test(braceContent);
                if (hasCodePattern || braceContent.includes('"')) {
                    newLine += '`{' + braceContent + '}`';
                    j = endIndex - 1;
                    continue;
                }
            }
        }
        
        // Fix: Regex lookahead/lookbehind patterns
        if (char === '(' && nextChar === '?') {
            // Look ahead to find the closing )
            let endIndex = j + 1;
            let parenContent = '';
            let parenDepth = 1;
            
            while (endIndex < charArray.length && parenDepth > 0) {
                if (charArray[endIndex] === '(') parenDepth++;
                if (charArray[endIndex] === ')') parenDepth--;
                if (parenDepth > 0) parenContent += charArray[endIndex];
                endIndex++;
            }
            
            // If it's a regex lookahead/lookbehind pattern
            if (/^\?[=!<]/.test(parenContent)) {
                newLine += '`(' + parenContent + ')`';
                j = endIndex - 1;
                continue;
            }
        }
        
        newLine += char;
    }
    
    // Apply additional pattern-based fixes
    line = newLine;
    
    // Fix: Double backticks
    line = line.replace(/``+/g, '`');
    
    // Fix: Em-dashes
    line = line.replace(/—/g, '-');
    
    // Fix: Common XML/HTML-like patterns that weren't caught
    line = line.replace(/(?<!`)<(key|value|file|path|name|type|id|number|string|bool|data|param|arg|option)>(?!`)/gi, '`<$1>`');
    
    // Fix: SQL/DB patterns
    line = line.replace(/(?<!`)<(database|table|column|row|query|index)(?:\s+\w+)*>(?!`)/gi, '`<$1>`');
    
    if (line !== originalLine) {
        issuesFixed++;
        if (issuesFixed <= 10) {
            console.log(`Line ${i + 1}: Fixed`);
        }
    }
    
    fixedLines.push(line);
}

// Write the fixed content
const newContent = fixedLines.join('\n');
fs.writeFileSync(filePath, newContent);

console.log(`\n✅ Cleanup complete!`);
console.log(`   Fixed ${issuesFixed} lines with potential issues`);
console.log(`   Total lines: ${lines.length}`);

// Verify no obvious issues remain
const remainingIssues = [];
const checkPatterns = [
    { pattern: /<(?!\/?\w+>)[a-z]+>/gi, name: 'Unescaped angle bracket tags' },
    { pattern: /(?<!`)(?<!`{){[^}]*["':][^}]*}(?!}`)(?!`)/g, name: 'Unescaped curly braces with code' },
    { pattern: /<-(?!>)/g, name: 'Arrow patterns' },
    { pattern: /—/g, name: 'Em-dashes' }
];

const contentLines = newContent.split('\n');
let inBlock = false;

for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];
    
    if (line.trim().startsWith('```')) {
        inBlock = !inBlock;
        continue;
    }
    
    if (inBlock) continue;
    
    for (const { pattern, name } of checkPatterns) {
        const matches = line.match(pattern);
        if (matches) {
            remainingIssues.push({ line: i + 1, issue: name, sample: matches[0] });
        }
    }
}

if (remainingIssues.length > 0) {
    console.log(`\n⚠️  Potential issues still detected (may need manual review):`);
    remainingIssues.slice(0, 10).forEach(({ line, issue, sample }) => {
        console.log(`   Line ${line}: ${issue} - "${sample}"`);
    });
    if (remainingIssues.length > 10) {
        console.log(`   ... and ${remainingIssues.length - 10} more`);
    }
} else {
    console.log(`\n✨ No obvious issues detected! File should be ready to build.`);
}
