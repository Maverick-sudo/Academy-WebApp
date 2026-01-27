'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from './ThemeProvider'
import Search from './Search'
import { Menu } from 'lucide-react'

interface TopNavProps {
  onMenuClick?: () => void
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--sidebar)]">
      <div className="container flex h-16 items-center px-4 md:px-8">
        {/* Mobile menu button - More visible */}
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-3 p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center">
          <Image src="/favicon.ico" alt="Academy" width={24} height={24} className="w-6 h-6 rounded" />
          <span className="sr-only">Academy</span>
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
