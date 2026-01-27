#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const outputPath = path.join(rootDir, 'public', 'search-index.json');

const repositories = ['study-notes', 'automation', 'Python-Projects', 'CCNA-Labs'];

function getMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md')) {
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

function generateSearchIndex() {
  const searchIndex = [];

  for (const repo of repositories) {
    const repoPath = path.join(contentDir, repo);
    if (!fs.existsSync(repoPath)) {
      console.warn(`Repository not found: ${repo}`);
      continue;
    }

    const files = getMarkdownFiles(repoPath);
    
    for (const file of files) {
      const fullPath = path.join(repoPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = file
        .replace(/\.md$/, '')
        .replace(/\/README$/i, '')
        .split(path.sep);

      searchIndex.push({
        title: data.title || slug[slug.length - 1],
        description: data.description || '',
        slug: [repo, ...slug].join('/'),
        content: content.slice(0, 1000) // First 1000 chars for search
      });
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  console.log(`✓ Generated search index with ${searchIndex.length} documents`);
}

generateSearchIndex();
