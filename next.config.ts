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
        source: "/about",
        destination: "/our-facilities",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/schedule-training",
        permanent: false,
      },
      {
        source: "/schedule",
        destination: "/schedule-training",
        permanent: false,
      },
      {
        source: "/schedule-training/:type",
        destination: "/schedule-training",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
