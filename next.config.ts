import type { NextConfig } from "next";

const permanentHostRedirects = (hosts: string[], destination: string) =>
  hosts.map((host) => ({
    source: "/:path*",
    has: [{ type: "host" as const, value: host }],
    destination,
    permanent: true,
  }));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Content-Security-Policy",
        value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self';",
      },
    ];
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/downloads/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/journal",
        permanent: true,
      },
      ...permanentHostRedirects(
        ["hepburnarchitects.net", "www.hepburnarchitects.net"],
        "https://hepburnarchitects.co.uk",
      ),
      ...permanentHostRedirects(
        [
          "solihullarchitects.co.uk",
          "www.solihullarchitects.co.uk",
          "architectsolihull.co.uk",
          "www.architectsolihull.co.uk",
          "architectssolihull.co.uk",
          "www.architectssolihull.co.uk",
        ],
        "https://hepburnarchitects.co.uk/locations/solihull-architects",
      ),
      ...permanentHostRedirects(
        ["hmo-architects.co.uk", "www.hmo-architects.co.uk"],
        "https://hepburnarchitects.co.uk/services/hmo-conversions",
      ),
      ...permanentHostRedirects(
        [
          "dlhepburn.co.uk",
          "www.dlhepburn.co.uk",
          "dlhepburn.com",
          "www.dlhepburn.com",
          "hepburndaoudi.com",
          "www.hepburndaoudi.com",
        ],
        "https://hepburnarchitects.co.uk/about",
      ),
      {
        source: "/knowledge-centre/house-extensions",
        destination: "/services/house-extensions",
        permanent: true,
      },
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
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "hepburnarchitects.co.uk" },
      { protocol: "https", hostname: "www.hepburnarchitects.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
