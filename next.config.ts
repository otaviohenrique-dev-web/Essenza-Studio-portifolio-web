/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite qualidades altas para telas retina/premium
    qualities: [75, 90, 100], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;