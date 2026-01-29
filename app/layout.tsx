import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { generateSidebarStructure } from '@/lib/sidebar'
import LayoutClient from '@/components/LayoutClient'

const inter = Inter({ subsets: ['latin'] })

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
    // Use the SVG shortcut to avoid serving a malformed or missing /favicon.ico
    shortcut: ['/favicon-32x32.svg'],
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
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutClient sidebarData={sidebarData}>
            {children}
          </LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
