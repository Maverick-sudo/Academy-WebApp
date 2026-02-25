'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      
      // Show button after scrolling past viewport height
      setIsVisible(scrolled > windowHeight)
      
      // Calculate scroll progress for ring animation
      const progress = Math.min((scrolled / documentHeight) * 100, 100)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility() // Check initial state

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Scroll to top"
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-14 h-14 -rotate-90 pointer-events-none">
        <circle
          cx="28"
          cy="28"
          r="24"
          className="fill-none stroke-slate-200 dark:stroke-slate-800"
          strokeWidth="3"
        />
        <circle
          cx="28"
          cy="28"
          r="24"
          className="fill-none stroke-blue-600 dark:stroke-blue-400 transition-all duration-300"
          strokeWidth="3"
          strokeDasharray={`${2 * Math.PI * 24}`}
          strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
          strokeLinecap="round"
        />
      </svg>

      {/* Button */}
      <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
        <ArrowUp className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      </div>
    </button>
  )
}
