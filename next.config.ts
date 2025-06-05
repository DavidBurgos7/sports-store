import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'another-example.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '/a/images/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.asics.com',
        port: '',
        pathname: '/is/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.converse.com',
        port: '',
        pathname: '/dw/image/**',
      },
      {
        protocol: 'https',
        hostname: 'nb.scene7.com',
        port: '',
        pathname: '/is/image/**',
      }
    ],
  },
};

export default nextConfig;
