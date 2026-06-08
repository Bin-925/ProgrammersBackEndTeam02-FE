import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? "https://be-production-9ee1.up.railway.app";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: "/cart/:path*",
        destination: `${BACKEND_URL}/cart/:path*`,
      },
    ];
  },
};

export default nextConfig;
