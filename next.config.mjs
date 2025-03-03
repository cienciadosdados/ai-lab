/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  webpack: (config) => {
    // Otimizações adicionais do webpack
    config.optimization.minimize = true;
    
    return config;
  },
};

export default nextConfig;
