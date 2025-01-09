import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dse00-exam.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.leetcode.com',
      },
      {
        protocol: 'https',
        hostname: 'leetcode.com',
      }
    ],
  },
};

export default nextConfig;
