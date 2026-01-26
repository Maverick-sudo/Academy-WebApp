'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeProvider'
import Search from './Search'
import { Menu } from 'lucide-react'

interface TopNavProps {
  onMenuClick?: () => void
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container flex h-16 items-center px-4 md:px-8">
        {/* Mobile menu button - More visible */}
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-3 p-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md transition-all hover:shadow-lg active:scale-95"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Academy</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Search />
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs/study-notes"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/Maverick-sudo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              GitHub
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
