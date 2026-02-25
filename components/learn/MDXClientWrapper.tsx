'use client'


import { useEffect, useState } from 'react'
import { mdxComponents } from './mdx-components'

interface MDXClientWrapperProps {
  course: string
  chapter: string
}

export default function MDXClientWrapper({ course, chapter }: MDXClientWrapperProps) {
  const [Component, setComponent] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    import(`@/content/learn/${course}/${chapter}.mdx`).then(mod => {
      if (mounted) setComponent(() => mod.default)
    })
    return () => { mounted = false }
  }, [course, chapter])

  if (!Component) return <div>Loading…</div>
  return <Component components={mdxComponents} />
}
