'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import type { SidebarItem } from '@/lib/sidebar'

interface LayoutClientProps {
  children: React.ReactNode
  sidebarData: SidebarItem[]
}

export default function LayoutClient({ children, sidebarData }: LayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
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
        <main className={`flex-1 min-w-0 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
