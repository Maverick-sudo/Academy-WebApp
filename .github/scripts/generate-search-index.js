#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootDir = path.join(__dirname, '..', '..');
const contentDir = path.join(rootDir, 'content');
const outputDir = path.join(rootDir, 'public');

const repositories = ['study-notes', 'automation', 'Python-Projects', 'CCNA-Labs'];

// Generate build timestamp for versioning
const buildVersion = Date.now();

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
  const allIndices = {};
  const fastIndices = {};
  
  // Initialize empty arrays for each repo
  repositories.forEach(repo => {
    allIndices[repo] = [];
    fastIndices[repo] = [];
  });

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

      allIndices[repo].push({
        title: data.title || slug[slug.length - 1],
        description: data.description || '',
        slug: [repo, ...slug].join('/'),
        content: content.slice(0, 1000) // First 1000 chars for search
      });

      fastIndices[repo].push({
        title: data.title || slug[slug.length - 1],
        description: data.description || '',
        slug: [repo, ...slug].join('/'),
      });
    }
  }

  // Write individual repo index files with version
  let totalDocs = 0;
  repositories.forEach(repo => {
    const filename = `search-index-${repo}-v${buildVersion}.json`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, JSON.stringify(allIndices[repo], null, 2));
    const fastFilename = `search-index-fast-${repo}-v${buildVersion}.json`;
    const fastOutputPath = path.join(outputDir, fastFilename);
    fs.writeFileSync(fastOutputPath, JSON.stringify(fastIndices[repo], null, 2));
    totalDocs += allIndices[repo].length;
    console.log(`✓ Generated ${filename} with ${allIndices[repo].length} documents`);
  });

  // Write version manifest for client to discover latest versions
  const manifest = {
    version: buildVersion,
    files: repositories.reduce((acc, repo) => {
      acc[repo] = `search-index-${repo}-v${buildVersion}.json`;
      return acc;
    }, {}),
    fastFiles: repositories.reduce((acc, repo) => {
      acc[repo] = `search-index-fast-${repo}-v${buildVersion}.json`;
      return acc;
    }, {})
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'search-index-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log(`✓ Generated search-index-manifest.json`);
  console.log(`✓ Total: ${totalDocs} documents across ${repositories.length} repositories`);
}

generateSearchIndex();

