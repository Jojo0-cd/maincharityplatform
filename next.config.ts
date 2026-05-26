import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // This allows production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows production builds to complete even if there are TS type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;