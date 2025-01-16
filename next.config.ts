import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.dse00.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.leetcode.com',
      },
      {
        protocol: 'https',
        hostname: 'leetcode.com',
      },
    ],
  },
};

export default nextConfig;
