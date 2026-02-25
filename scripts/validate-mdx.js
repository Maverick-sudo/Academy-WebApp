#!/usr/bin/env node

/**
 * Simple MDX validator that checks for HTML entities in MDX files
 * that could cause parsing errors.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const contentDir = './content';
let hasErrors = false;
let filesChecked = 0;

function getAllMDXFiles(dir) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMDXFiles(fullPath));
    } else if (extname(item) === '.mdx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function validateMDXFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const errors = [];
  let inCodeBlock = false;
  
  // Check for HTML entities that could cause MDX parsing issues
  lines.forEach((line, index) => {
    // Toggle code block state
    if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    
    // Skip lines inside code blocks
    if (inCodeBlock) {
      return;
    }
    
    // Remove inline code (content between backticks) to avoid false positives
    const lineWithoutInlineCode = line.replace(/`[^`]*`/g, '');
    
    // Check for unescaped HTML entities (outside of inline code)
    if (lineWithoutInlineCode.includes('&lt;') || lineWithoutInlineCode.includes('&gt;')) {
      errors.push({
        line: index + 1,
        message: `HTML entity found (&lt; or &gt;). Use backticks or code blocks instead.`,
        snippet: line.trim().substring(0, 80)
      });
    }
  });
  
  return errors;
}

console.log('🔍 Validating MDX files...\n');

const mdxFiles = getAllMDXFiles(contentDir);

mdxFiles.forEach(file => {
  filesChecked++;
  const errors = validateMDXFile(file);
  
  if (errors.length > 0) {
    hasErrors = true;
    console.log(`❌ ${file}`);
    errors.forEach(error => {
      console.log(`  Line ${error.line}: ${error.message}`);
      console.log(`  ${error.snippet}\n`);
    });
  }
});

if (hasErrors) {
  console.log(`\n❌ MDX validation failed! Found errors in ${filesChecked} files.\n`);
  process.exit(1);
} else {
  console.log(`✅ All ${filesChecked} MDX files validated successfully!\n`);
  process.exit(0);
}
