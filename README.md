# Academy Documentation Hub

A modern, GitBook-style documentation hub built with Next.js, deployed on Vercel.

## Features

- 📚 **Multi-Repository Documentation**: Centralized hub for study-notes, automation, CCNA-Labs, and Python-Projects
- 🎨 **Clean UI**: GitBook/GitLab-inspired design with sidebar navigation
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Mobile-friendly with collapsible sidebar
- 🔍 **Table of Contents**: Auto-generated TOC for easy navigation
- ⚡ **Fast**: Static generation with Next.js 14
- 🚀 **Vercel-Ready**: Optimized for Vercel deployment

## Project Structure

```
Academy/
├── app/
│   ├── layout.tsx          # Root layout with sidebar & navbar
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   └── docs/
│       └── [...slug]/      # Dynamic doc routes
├── components/
│   ├── Sidebar.tsx         # Collapsible navigation
│   ├── TopNav.tsx          # Header with theme toggle
│   ├── ThemeProvider.tsx   # Dark mode logic
│   └── Toc.tsx             # Table of contents
├── lib/
│   ├── sidebar.ts          # Navigation structure
│   └── content.ts          # MD/MDX content loading
├── content/                # Symlinked to sibling repos
│   ├── automation/
│   ├── CCNA-Labs/
│   ├── Python-Projects/
│   └── study-notes/
```

## Setup

### 1. Install Dependencies

```bash
cd Academy
npm install
```

### 2. Link Content Folders

The app expects content from sibling repositories. Create symbolic links:

```bash
# From Academy directory
ln -s ../automation content/automation
ln -s ../CCNA-Labs content/CCNA-Labs
ln -s ../Python-Projects content/Python-Projects
ln -s ../study-notes content/study-notes
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Next.js and deploys

The project is configured for static export (`output: 'export'` in `next.config.js`), making it compatible with any static host.

### Manual Build

```bash
npm run build
```

Static files are generated in `out/` directory.

## Content Management

### Adding Documentation

1. Add Markdown files to content folders (automation, study-notes, etc.)
2. Optionally add frontmatter:

```markdown
---
title: "My Doc Title"
description: "Brief description"
---

# Content here
```

3. Update `lib/sidebar.ts` to add navigation links

### Frontmatter Support

- `title`: Page title (defaults to filename)
- `description`: Subtitle/description
- `date`: Optional date field

## Customization

### Sidebar Navigation

Edit `lib/sidebar.ts` to modify navigation structure:

```typescript
export const sidebarStructure: SidebarItem[] = [
  {
    id: 'section-id',
    label: 'Section Name',
    items: [
      { id: 'page-id', label: 'Page Name', href: '/docs/path' }
    ]
  }
]
```

### Styling

- Global styles: `app/globals.css`
- Theme colors: CSS variables in `globals.css`
- Tailwind config: `tailwind.config.ts`

### Typography

The project uses Tailwind Typography plugin. Customize in `tailwind.config.ts` under `typography` extension.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with `next-mdx-remote`
- **Syntax Highlighting**: `rehype-highlight` with highlight.js
- **Markdown**: `remark-gfm` for GitHub-flavored markdown

## Design Philosophy

Following the principles from `copilot-instructions.md`:

- **Documentation-first**: Content is treated as authoritative technical docs, not blog posts
- **No backend**: Pure static generation
- **Clarity over features**: Prioritizes readability and information architecture
- **Minimal abstractions**: Clean, maintainable code
- **Vercel-optimized**: Static export for edge deployments

## License

MIT
