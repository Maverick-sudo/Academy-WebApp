'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class MarkdownErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Markdown rendering error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
            Content Rendering Issue
          </h3>
          <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
            There was a problem rendering part of this document. This may be due to malformed markdown or unsupported syntax.
          </p>
          {this.state.error && (
            <details className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              <summary className="cursor-pointer hover:text-amber-800 dark:hover:text-amber-200 font-medium">
                Technical details
              </summary>
              <pre className="mt-2 p-2 bg-amber-100 dark:bg-amber-900/40 rounded overflow-auto">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
