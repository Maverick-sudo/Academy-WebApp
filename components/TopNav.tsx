import Link from 'next/link'
import { ThemeToggle } from './ThemeProvider'
import SearchErrorBoundary from './SearchErrorBoundary'
import SearchLauncher from './SearchLauncher'
import MenuButton from './MenuButton'

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--sidebar)]">
      <div className="container flex h-16 items-center px-4 md:px-8">
        {/* Mobile menu button - More visible */}
        <MenuButton className="xl:hidden mr-3 p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white transition-colors" />
        <Link href="/" className="flex items-center">
          <img src="/favicon.ico" alt="Academy" className="w-6 h-6 rounded" width="24" height="24" />
          <span className="sr-only">Academy</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <SearchErrorBoundary>
            <SearchLauncher />
          </SearchErrorBoundary>
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
