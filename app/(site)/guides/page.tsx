import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/lib/content";
export const metadata:Metadata={title:"Residential Planning and Architecture Guides",description:"SEO-rich practical guides covering planning permission, extensions, loft conversions, HMOs, flat conversions, architect fees and Building Regulations.",alternates:{canonical:"/guides"}};
export default function GuidesPage(){return <section className="section"><div className="shell page-intro"><small className="eyebrow"><BookOpen size={14}/>Knowledge centre</small><h1>Residential planning and architecture guides.</h1><p>Practical, plain-English guidance for homeowners, developers and property investors in England.</p></div><div className="shell guides-index">{guides.map((g,i)=><Link href={`/guides/${g.slug}`} className="guide-index-card" key={g.slug}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{g.title}</h2><p>{g.description}</p></div><ArrowRight/></Link>)}</div></section>}
