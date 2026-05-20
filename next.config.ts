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
      {
        source: '/pharmacy',
        destination: 'https://tustinvillageah.ourvet.com/pet/',
        permanent: true,
      },
    ]
  },
}

export default config
