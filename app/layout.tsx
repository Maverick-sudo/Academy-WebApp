import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { generateSidebarStructure } from '@/lib/sidebar'
import LayoutClient from '@/components/LayoutClient'

export const metadata: Metadata = {
  title: 'Academy Documentation Hub',
  description: 'Technical documentation for cybersecurity, networking, and development projects',
  icons: {
    icon: [
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/android-chrome-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch sidebar data server-side
  const sidebarData = await generateSidebarStructure()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <LayoutClient sidebarData={sidebarData}>
            {children}
          </LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
