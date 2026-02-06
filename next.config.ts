import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // O pathname '/**' permite qualquer subpasta da sua conta Cloudinary
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;