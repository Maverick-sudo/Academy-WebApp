'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollProgress, 100))
    }

    // Initial calculation
    updateProgress()

    // Update on scroll with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-500 dark:via-blue-400 dark:to-cyan-400 transition-all duration-150 ease-out shadow-lg shadow-blue-500/50"
        style={{ 
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none'
        }}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
    </div>
  )
}
