/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Development'ta da kapat
  swcMinify: true,
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['react', 'react-dom'],
    // Page loading speed optimizations
    optimizeServerReact: true,
    serverMinification: true,
  },
  // Exclude blog dynamic pages from static generation
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // Remove the dynamic blog slug route from static export
    const { ['/blog/[slug]']: removed, ...pathMap } = defaultPathMap
    return pathMap
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 60 saniye
    pagesBufferLength: 5, // 5 sayfa tut
  },
  // Performance optimizations
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable Fast Refresh in development
      config.resolve.alias = {
        ...config.resolve.alias,
        '@next/react-refresh-utils/runtime': false,
        '@next/react-dev-overlay/hot-dev-client': false,
      };
      
      // Configure watch options to reduce file watching
      config.watchOptions = {
        poll: false,
        aggregateTimeout: 2000, // Wait 2 seconds before rebuilding
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/fix-*.ps1',
          '**/*.log',
          '**/*.tmp',
          '**/*.hot-update.json',
          '**/docs/**',
          '**/.git/**',
          '**/coverage/**',
        ],
      };
      
      // Remove React Refresh Plugin
      config.plugins = config.plugins.filter(plugin => {
        return plugin.constructor.name !== 'ReactRefreshPlugin';
      });
    }
    
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'; default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://static.cloudflareinsights.com;",
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
