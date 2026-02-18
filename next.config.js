/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Fallback if SWC binary issues occur
  swcMinify: true,
  compiler: {
    // Remove console in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig

