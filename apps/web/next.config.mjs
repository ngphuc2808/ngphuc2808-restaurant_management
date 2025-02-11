/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
