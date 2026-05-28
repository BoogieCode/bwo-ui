/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@bwo-ui/react', '@bwo-ui/core'],
  experimental: {
    optimizePackageImports: ['@bwo-ui/react'],
  },
};

export default nextConfig;
