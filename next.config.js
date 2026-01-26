/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export' is for production static builds only, removed for development
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
