'use client'

import { Menu } from 'lucide-react'

interface MenuButtonProps {
  className?: string
}

export default function MenuButton({ className }: MenuButtonProps) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('academy:toggle-sidebar'))}
      className={className}
      aria-label="Toggle sidebar"
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}
