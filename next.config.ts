import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    taint: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      // One canonical host. www → apex, query string preserved. /api and
      // /studio are left alone so Sanity webhooks (which may post to www) and
      // the embedded Studio (CORS-allowed on www) keep working.
      {
        source: '/:path((?!api/|studio).*)',
        has: [{ type: 'host', value: 'www.tustinvillageah.com' }],
        destination: 'https://tustinvillageah.com/:path',
        permanent: true,
      },
      {
        source: '/pharmacy',
        destination: 'https://tustinvillageah.ourvet.com/pet/',
        permanent: true,
      },
    ]
  },
}

export default config
