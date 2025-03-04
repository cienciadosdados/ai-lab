/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Desativar cache estático para forçar nova renderização
  staticPageGenerationTimeout: 1000,
  // Configurações para otimização de imagens
  images: {
    domains: ['ai-labs.cienciadosdados.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Reduzir TTL do cache para 1 minuto
  },
  // Configurações de headers para controle de cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ]
  },
  // Configurações de redirecionamento para forçar HTTPS
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://ai-labs.cienciadosdados.com/:path*',
        permanent: true,
      },
    ]
  },
  // Configuração de compilação
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
    optimizeCss: true,
  },
  // Versão para forçar recompilação: 20250304-1
}

module.exports = nextConfig
