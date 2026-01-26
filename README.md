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