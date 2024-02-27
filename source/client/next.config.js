/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_SERVER_HOSTNAME,
        port: process.env.NEXT_PUBLIC_IMAGE_SERVER_PORT,
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
