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
        destination: "/schedule-training/private-lessons",
        permanent: false,
      },
      {
        source: "/schedule",
        destination: "/schedule-training/private-lessons",
        permanent: false,
      },
      {
        source: "/schedule-training/lesson-sessions",
        destination: "/schedule-training/group-lessons",
        permanent: false,
      },
      {
        source: "/schedule-training/lesson-availability",
        destination: "/schedule-training/private-lessons",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
