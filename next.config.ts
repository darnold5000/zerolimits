import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zerolimitsbaseball.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/schedule-training",
        permanent: true,
      },
      {
        source: "/schedule",
        destination: "/schedule-training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
