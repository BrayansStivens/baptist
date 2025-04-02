import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/baptist",
  assetPrefix: "/baptist/",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
