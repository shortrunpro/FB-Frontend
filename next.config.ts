import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: '*.federalbrace.com'
      },
      {
        protocol: 'https',
        hostname: 'federalbrace.com'
      },
      {
        protocol: 'https',
        hostname: 'pub-ad684fbc57174773982dd597e7e48ec4.r2.dev'
      },
      {
        protocol: 'https',
        hostname: 'federal-brace.vercel.app'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
