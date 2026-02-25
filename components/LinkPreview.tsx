'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import * as HoverCard from '@radix-ui/react-hover-card'
import { ChevronDown, BookOpen, Tag, Clock, FileText } from 'lucide-react'

interface LinkPreviewProps {
  href: string
  title: string
  children: ReactNode
  summary?: string
  concepts?: string[]
  lineCount?: number
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime?: string
}

export function LinkPreview({ 
  href, 
  title, 
  children, 
  summary, 
  concepts = [],
  lineCount,
  difficulty,
  estimatedTime
}: LinkPreviewProps) {
  const hasMetadata = summary || concepts.length > 0 || lineCount || difficulty || estimatedTime

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <Link
          href={href}
          className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 
            hover:border-blue-500 dark:hover:border-blue-400 
            hover:bg-blue-50 dark:hover:bg-blue-900/10 
            hover:shadow-md
            transition-all duration-200"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 
            group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-medium text-slate-900 dark:text-slate-100 block truncate">
              {children}
            </span>
            {difficulty && (
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium
                ${difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {difficulty}
              </span>
            )}
          </div>
          {hasMetadata && (
            <ChevronDown className="w-4 h-4 ml-auto text-slate-400 group-hover:text-blue-500 
              transition-transform group-hover:translate-y-0.5 shrink-0" />
          )}
        </Link>
      </HoverCard.Trigger>

      {hasMetadata && (
        <HoverCard.Portal>
          <HoverCard.Content
            sideOffset={8}
            className="w-96 p-4 rounded-lg border border-slate-200 dark:border-slate-700 
              bg-white dark:bg-slate-900 shadow-xl z-50
              data-[state=open]:animate-in data-[state=closed]:animate-out 
              data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
              data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
              data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <div className="space-y-3">
              {/* Title */}
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {title}
              </h4>

              {/* Metadata badges */}
              {(estimatedTime || lineCount) && (
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  {estimatedTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {estimatedTime}
                    </span>
                  )}
                  {lineCount && (
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {lineCount.toLocaleString()} lines
                    </span>
                  )}
                </div>
              )}

              {/* Summary */}
              {summary && (
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {summary}
                </p>
              )}

              {/* Key Concepts */}
              {concepts.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Key Concepts ({concepts.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {concepts.slice(0, 8).map((concept, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md bg-blue-50 dark:bg-blue-900/20 
                          text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        {concept}
                      </span>
                    ))}
                    {concepts.length > 8 && (
                      <span className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
                        +{concepts.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Footer hint */}
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                Click to view full content →
              </div>
            </div>
            <HoverCard.Arrow className="fill-white dark:fill-slate-900" />
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  )
}
