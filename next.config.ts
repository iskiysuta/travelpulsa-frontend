import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.100.151',
        port: '1337',
        pathname: '/',
      },
    ],
  },
};

export default nextConfig;
