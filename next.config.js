/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configurações para otimização de imagens
  images: {
    domains: ['ai-labs.cienciadosdados.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Configurações de headers para controle de cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig
