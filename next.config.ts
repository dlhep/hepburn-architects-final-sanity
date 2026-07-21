import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/locations/birmingham",
        destination: "/locations/birmingham-architects",
        permanent: true,
      },
      {
        source: "/locations/solihull-architect",
        destination: "/locations/solihull-architects",
        permanent: true,
      },
      {
        source: "/locations/solihull",
        destination: "/locations/solihull-architects",
        permanent: true,
      },
      {
        source: "/locations/birmingham-architect",
        destination: "/locations/birmingham-architects",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.hepburnarchitects.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
