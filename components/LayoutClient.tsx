'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import TopNav from '@/components/TopNav'
import type { SidebarItem } from '@/lib/sidebar'
import { usePathname } from 'next/navigation'

const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  ssr: false,
})

const CompactMobileTree = dynamic(() => import('@/components/CompactMobileTree'), {
  ssr: false,
})

const ScrollControls = dynamic(() => import('@/components/ScrollControls'), {
  ssr: false,
})

interface LayoutClientProps {
  children: React.ReactNode
  sidebarData: SidebarItem[]
}

export default function LayoutClient({ children, sidebarData }: LayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const pathname = usePathname()
  const isDocsRoute = pathname.startsWith('/docs')

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('academy-sidebar-collapsed')
    if (savedCollapsed !== null) {
      setIsCollapsed(savedCollapsed === 'true')
    }
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('academy-sidebar-collapsed', String(isCollapsed))
  }, [isCollapsed])

  // Detect desktop breakpoint so we can change main layout behavior accordingly
  useEffect(() => {
    // Treat widths >= 1280px as desktop so tablets (<1280px) are treated as mobile.
    const mq = window.matchMedia('(min-width: 1280px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }
    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  const toggleSidebar = useCallback(() => {
    // On desktop toggle the sidebar; on mobile open the mobile nav drawer.
    // Use a synchronous viewport check here to avoid stale `isDesktop` from effects.
    const desktopNow = typeof window !== 'undefined' ? window.innerWidth >= 1280 : isDesktop
    if (desktopNow) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsMobileOpen(prev => !prev)
    }
  }, [isDesktop, isSidebarOpen])

  useEffect(() => {
    const handler = () => toggleSidebar()
    window.addEventListener('academy:toggle-sidebar', handler)
    return () => window.removeEventListener('academy:toggle-sidebar', handler)
  }, [toggleSidebar])

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    setIsMobileOpen(false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const sidebarDebug = useMemo(() => {
    if (process.env.NODE_ENV === 'production') {
      return null
    }
    try {
      return JSON.stringify(sidebarData).replace(/</g, '\\u003c')
    } catch {
      return null
    }
  }, [sidebarData])

  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="flex">
        {isDocsRoute && (
          <Sidebar 
            data={sidebarData} 
            isOpen={isSidebarOpen} 
            onClose={closeSidebar}
            isCollapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
          />
        )}
        {/* Mobile navigation menu inline above content (hidden on desktop). */}
        <main className={`flex-1 min-w-0 px-4 xl:px-6 ${isDesktop && isDocsRoute ? (isCollapsed ? 'xl:ml-16' : 'xl:ml-72') : ''}`}> 
          {isDocsRoute && isMobileOpen && (
            <CompactMobileTree open={isMobileOpen} onClose={() => setIsMobileOpen(false)} data={sidebarData} />
          )}
          {children}
        </main>
      </div>
      {isDocsRoute && <ScrollControls threshold={200} />}
      {sidebarDebug && (
        <script
          type="application/json"
          data-sidebar-debug
          dangerouslySetInnerHTML={{ __html: sidebarDebug }}
        />
      )}
    </div>
  )
}
