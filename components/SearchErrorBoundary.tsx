'use client'

import { Component, ReactNode } from 'react'
import { Search as SearchIcon } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class SearchErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Search component error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <button 
          className="p-2 text-slate-400 cursor-not-allowed"
          title="Search temporarily unavailable"
          disabled
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      )
    }

    return this.props.children
  }
}

export default SearchErrorBoundary
