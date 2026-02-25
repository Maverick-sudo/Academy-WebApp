module.exports = function stripFrontmatterLoader(source) {
  // Remove YAML frontmatter from MDX files
  const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
  return source.replace(frontmatterRegex, '');
};
