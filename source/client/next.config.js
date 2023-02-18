/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_API_HOSTNAME,
        port: process.env.NEXT_PUBLIC_API_PORT,
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
