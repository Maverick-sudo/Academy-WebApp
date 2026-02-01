'use client'

import dynamic from 'next/dynamic'
import NextTopLoader from 'nextjs-toploader'

// Lazy load Toaster only (NextTopLoader is small, no benefit to lazy load)
const Toaster = dynamic(() => import('sonner').then(m => ({ default: m.Toaster })), { ssr: false })

export default function ClientProviders() {
  return (
    <>
      <NextTopLoader
        color="var(--loading-bar-color)"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
      <Toaster position="bottom-right" />
    </>
  )
}
