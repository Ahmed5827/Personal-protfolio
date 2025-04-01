import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  fontLoaders: [
    {
      loader: '@next/font/google',
      options: {
        domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
        // Or use Chinese mirror if you're in China:
        // domains: ['fonts.googleapis.cn', 'fonts.gstatic.com'],
      },
    },
  ]
};

export default nextConfig;
