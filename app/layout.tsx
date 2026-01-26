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
