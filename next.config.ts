import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // assetPrefix: '/S-S_Oppenheim_Book_v1.1',
  // basePath: '/S-S_Oppenheim_Book_v1.1',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
