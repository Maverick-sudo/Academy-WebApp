const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    },
    {
      urlPattern: /\/search-index.*\.json$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'search-index-cache',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|png|svg|gif|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    {
      urlPattern: /\/mermaid-cache\/.*\.svg$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'mermaid-diagram-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 24 * 60 * 60 // 60 days
        }
      }
    }
  ]
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  productionBrowserSourceMaps: false, // Reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-markdown', 'remark-gfm', 'rehype-highlight'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  // Add minimal webpack config to force webpack mode
  webpack: (config) => {
    return config
  },
  // Add turbopack config to satisfy Next.js 16 requirement
  turbopack: {},
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
