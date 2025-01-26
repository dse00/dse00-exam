import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.dse00.com',
      },
    ],
  },
};

export default nextConfig;
