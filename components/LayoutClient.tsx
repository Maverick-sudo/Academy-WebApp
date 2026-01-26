'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import type { SidebarItem } from '@/lib/sidebar'

interface LayoutClientProps {
  children: React.ReactNode
  sidebarData: SidebarItem[]
}

export default function LayoutClient({ children, sidebarData }: LayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen">
      <TopNav onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar 
          data={sidebarData} 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar}
        />
        <main className="flex-1 min-w-0 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  )
}
