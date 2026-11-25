import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/valorant",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
      },
    ],
  },
};

export default nextConfig;
