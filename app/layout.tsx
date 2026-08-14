import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ROOT_TITLE, SOCIAL_IMAGE } from "@/lib/seo";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

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
      <body className={sourceSans.variable}><ConversionTracking />{children}</body>
    </html>
  );
}
