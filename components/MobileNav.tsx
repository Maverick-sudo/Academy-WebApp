"use client"

import Link from 'next/link'
import { SidebarItem } from '@/lib/sidebar'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  data: SidebarItem[]
}

export default function MobileNav({ open, onClose, data }: MobileNavProps) {
  return (
    // This component is rendered inline above the main content. It is hidden on xl (desktop).
    <div className={`w-full bg-[var(--background)] border-b border-[var(--border)] xl:hidden ${open ? 'block' : 'hidden'}`}>
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="space-y-2">
          {data.map(section => (
            <details key={section.id} className="bg-transparent" open={false}>
              <summary className="list-none cursor-pointer flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-[var(--sidebar-accent)]">
                <span className="font-semibold">{section.label}</span>
                <span className="text-sm text-slate-500">▸</span>
              </summary>
              {section.items && section.items.length > 0 && (
                <div className="mt-2 space-y-1 pl-2">
                  {section.items.map(item => (
                    <div key={item.id}>
                      {item.href ? (
                        <Link href={item.href} onClick={onClose} className="block px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-[var(--sidebar-accent)]">
                          {item.label}
                        </Link>
                      ) : (
                        <div className="px-2 py-1 text-sm text-slate-700">{item.label}</div>
                      )}

                      {item.items && item.items.length > 0 && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.items.map(child => (
                            child.href ? (
                              <Link key={child.id} href={child.href} onClick={onClose} className="block px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-[var(--sidebar-accent)] text-sm">
                                {child.label}
                              </Link>
                            ) : (
                              <div key={child.id} className="px-2 py-1 text-sm">{child.label}</div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </details>
          ))}
        </div>
      </nav>
    </div>
  )
}
