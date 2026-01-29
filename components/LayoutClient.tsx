'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import MobileNav from '@/components/MobileNav'
import type { SidebarItem } from '@/lib/sidebar'

interface LayoutClientProps {
  children: React.ReactNode
  sidebarData: SidebarItem[]
}

export default function LayoutClient({ children, sidebarData }: LayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

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

  useEffect(() => {
    // Only lock body scroll when mobile menu is actually open (not sidebar on desktop)
    if (isMobileOpen && !isDesktop) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen, isDesktop])

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

  const toggleSidebar = () => {
    // On desktop toggle the sidebar; on mobile open the mobile nav drawer.
    // Use a synchronous viewport check here to avoid stale `isDesktop` from effects.
    const desktopNow = typeof window !== 'undefined' ? window.innerWidth >= 1280 : isDesktop
    if (desktopNow) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsMobileOpen(!isMobileOpen)
    }
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    setIsMobileOpen(false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="min-h-screen">
      <TopNav onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar 
          data={sidebarData} 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar}
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
        />
        {/* Mobile navigation menu inline above content (hidden on desktop). */}
        <main className={`flex-1 min-w-0 px-4 xl:px-6 ${isDesktop ? (isCollapsed ? 'xl:ml-16' : 'xl:ml-48') : ''}`}> 
          <MobileNav open={isMobileOpen} onClose={() => setIsMobileOpen(false)} data={sidebarData} />
          {children}
        </main>
      </div>
    </div>
  )
}
