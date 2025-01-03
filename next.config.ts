import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dse00-exam.s3.eu-west-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
