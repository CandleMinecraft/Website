/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remove or comment out the deprecated configuration
    // domains: ['domain1.com', 'domain2.com'],
    
    // Add the new recommended configuration
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.github.com',
        port: '',
        pathname: '/**',
      },
      // Add any other domains you were using before
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'domain1.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
}

module.exports = nextConfig 