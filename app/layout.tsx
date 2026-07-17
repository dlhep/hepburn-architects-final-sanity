import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
export const metadata: Metadata = { metadataBase:new URL(site.url), title:{default:"Hepburn Architects | Residential Architects",template:"%s | Hepburn Architects"}, description:site.description, alternates:{canonical:"/"}, openGraph:{type:"website",locale:"en_GB",siteName:"Hepburn Architects",url:site.url,title:"Hepburn Architects | Residential Architects",description:site.description}, twitter:{card:"summary_large_image"} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body>{children}</body></html>}
