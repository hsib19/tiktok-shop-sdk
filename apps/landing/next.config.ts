import type { NextConfig } from 'next';
import i18nConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
