'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeCopyButtonProps {
  code: string
  className?: string
}

export default function CodeCopyButton({ code, className = '' }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`group relative p-2 rounded-lg bg-slate-700 hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 ${className}`}
      title={copied ? 'Copied!' : 'Copy code'}
      aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
    >
      <div className="relative w-4 h-4">
        <Copy 
          className={`absolute inset-0 text-slate-300 group-hover:text-white transition-all duration-200 ${
            copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
        />
        <Check 
          className={`absolute inset-0 text-green-400 transition-all duration-200 ${
            copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-950 text-white text-xs rounded whitespace-nowrap pointer-events-none transition-opacity duration-200 ${
        copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {copied ? 'Copied!' : 'Copy code'}
      </span>
    </button>
  )
}
