import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { ROOT_TITLE, SOCIAL_IMAGE } from "@/lib/seo";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: ROOT_TITLE,
    template: "%s | Hepburn Architects",
  },
  description: site.description,
  openGraph: { images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", images: [SOCIAL_IMAGE] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body><ConversionTracking />{children}</body>
    </html>
  );
}
