/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    const backendUrl =
      process.env.RENDER_BACKEND_URL ||
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL;

    if (backendUrl) {
      const sanitized = backendUrl.replace(/\/+$/, '');
      const rules = [
        {
          source: '/api/auction/:path*',
          destination: `${sanitized}/api/auction/:path*`,
        },
        {
          source: '/api/reports/:path*',
          destination: `${sanitized}/api/reports/:path*`,
        },
        {
          source: '/api/players/:path*',
          destination: `${sanitized}/api/players/:path*`,
        },
        {
          source: '/health',
          destination: `${sanitized}/health`,
        },
      ];

      return {
        beforeFiles: rules,
        afterFiles: [],
        fallback: [],
      };
    }
    return [];
  },
};

export default nextConfig;
