import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IdentitySchema } from "@/components/Schema";
import { Analytics } from "@/components/Analytics";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Residential Architects Birmingham & West Midlands | Hepburn",
    template: "%s | Hepburn Architects",
  },
  description:
    "Residential architects for extensions, loft conversions, new homes, HMOs, planning and Building Regulations across Birmingham, Solihull and the West Midlands.",
  authors: [{ name: "David Hepburn", url: `${site.url}/about` }],
  creator: "Hepburn Architects Ltd",
  publisher: "Hepburn Architects Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Residential Architects Birmingham & West Midlands | Hepburn",
    description:
      "Director-led residential architecture, planning and technical design across Birmingham, Solihull and the West Midlands.",
    images: [
      {
        url: "/images/og.svg",
        width: 1200,
        height: 630,
        alt: "Hepburn Architects residential architecture practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residential Architects Birmingham & West Midlands | Hepburn",
    description:
      "Director-led residential architecture, planning and technical design across Birmingham, Solihull and the West Midlands.",
    images: ["/images/og.svg"],
  },
  category: "architecture",
};

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <IdentitySchema />
      <Analytics />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
