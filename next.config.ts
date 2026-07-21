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
      {
        source: "/locations/moseley",
        destination: "/locations/moseley-architects",
        permanent: true,
      },
      {
        source: "/locations/moseley-architect",
        destination: "/locations/moseley-architects",
        permanent: true,
      },
      {
        source: "/locations/harborne",
        destination: "/locations/harborne-architects",
        permanent: true,
      },
      {
        source: "/locations/harborne-architect",
        destination: "/locations/harborne-architects",
        permanent: true,
      },
      {
        source: "/locations/edgbaston",
        destination: "/locations/edgbaston-architects",
        permanent: true,
      },
      {
        source: "/locations/edgbaston-architect",
        destination: "/locations/edgbaston-architects",
        permanent: true,
      },
      {
        source: "/locations/sutton-coldfield",
        destination: "/locations/sutton-coldfield-architects",
        permanent: true,
      },
      {
        source: "/locations/sutton-coldfield-architect",
        destination: "/locations/sutton-coldfield-architects",
        permanent: true,
      },
      {
        source: "/locations/middlesbrough",
        destination: "https://www.hepburnarchitects.com/architects-middlesbrough",
        permanent: true,
      },
      {
        source: "/locations/teesside",
        destination: "https://www.hepburnarchitects.com/architects-middlesbrough",
        permanent: true,
      },
      {
        source: "/locations/nunthorpe",
        destination: "https://www.hepburnarchitects.com/architects-middlesbrough",
        permanent: true,
      },
      {
        source: "/locations/stockton-on-tees",
        destination: "https://www.hepburnarchitects.com/architects-middlesbrough",
        permanent: true,
      },
      {
        source: "/locations/yarm",
        destination: "https://www.hepburnarchitects.com/architects-middlesbrough",
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
