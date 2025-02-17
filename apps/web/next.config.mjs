import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
