import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '**.kleinanzeigen.de',
      },
      {
        protocol: 'https',
        hostname: '**.ebay-kleinanzeigen.de',
      },
    ],
  },
};

export default nextConfig;
