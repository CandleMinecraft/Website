import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
