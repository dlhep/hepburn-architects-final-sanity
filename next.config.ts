import type { NextConfig } from "next";
import combinedSiteRedirects from "./data/combined-site-redirects.json";

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
      ...permanentHostRedirects(["hepburnarchitects.net", "www.hepburnarchitects.net"], "https://www.hepburnarchitects.com/locations/birmingham-architects"),
      ...permanentHostRedirects(["solihullarchitects.co.uk", "www.solihullarchitects.co.uk", "architectsolihull.co.uk", "www.architectsolihull.co.uk", "architectssolihull.co.uk", "www.architectssolihull.co.uk"], "https://www.hepburnarchitects.com/locations/solihull-architects"),
      ...permanentHostRedirects(["hmo-architects.co.uk", "www.hmo-architects.co.uk"], "https://www.hepburnarchitects.com/services/hmo-conversions"),
      ...permanentHostRedirects(["dlhepburn.co.uk", "www.dlhepburn.co.uk", "dlhepburn.com", "www.dlhepburn.com", "hepburndaoudi.com", "www.hepburndaoudi.com"], "https://www.hepburnarchitects.com/studio"),
      // Retire the old-domain sitemap and retain the direct guide URLs.
      { source: "/sitemap.xml", destination: "https://www.hepburnarchitects.com/sitemap.xml", permanent: true },
      { source: "/house-extension-guide", destination: "https://www.hepburnarchitects.com/house-extension-guide", permanent: true },
      { source: "/house-extension-guide/:path*", destination: "https://www.hepburnarchitects.com/house-extension-guide/:path*", permanent: true },
      ...combinedSiteRedirects,
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
