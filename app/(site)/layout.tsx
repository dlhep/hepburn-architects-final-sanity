import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IdentitySchema } from "@/components/Schema";
import { Analytics } from "@/components/Analytics";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Residential Architects Birmingham & Teesside | Hepburn",
    template: "%s | Hepburn Architects",
  },
  description:
    "Residential architects for extensions, loft conversions, new homes, HMOs and planning across Birmingham, the West Midlands and Teesside.",
  keywords: [
    "residential architects",
    "architect Birmingham",
    "architect Teesside",
    "house extension architect",
    "loft conversion architect",
    "planning applications",
    "Building Regulations drawings",
    "new build architect",
    "HMO architect",
  ],
  authors: [{ name: "Hepburn Architects Ltd", url: site.url }],
  creator: "Hepburn Architects Ltd",
  publisher: "Hepburn Architects Ltd",
  alternates: { canonical: "/" },
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
    title: "Residential Architects Birmingham & Teesside | Hepburn",
    description:
      "Residential architects for extensions, loft conversions, new homes, HMOs and planning across Birmingham, the West Midlands and Teesside.",
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
    title: "Residential Architects Birmingham & Teesside | Hepburn",
    description:
      "Residential architects for extensions, loft conversions, new homes, HMOs and planning across Birmingham, the West Midlands and Teesside.",
    images: ["/images/og.svg"],
  },
  category: "architecture",
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
