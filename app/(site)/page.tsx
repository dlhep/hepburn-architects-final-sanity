import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { articleImageUrl, getGuides } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Residential Planning & Architecture Guides | Hepburn Architects",
  description: "Practical guides covering planning permission, extensions, loft conversions, Building Regulations, conversions and residential development.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesPage() {
  const guides = await getGuides();
  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow"><BookOpen size={14} />Knowledge centre</small>
        <h1>Residential planning and architecture guides.</h1>
        <p>Practical, plain-English guidance for homeowners, developers and property investors.</p>
      </div>
      <div className="shell article-card-grid">
        {guides.map((guide) => {
          const image = articleImageUrl(guide.featuredImage, 900);
          return (
            <Link href={`/guides/${guide.slug}`} className="article-card" key={guide._id}>
              {image ? <Image src={image} alt={guide.featuredImage?.alt || guide.title} width={900} height={560} /> : null}
              <div>
                <small>{guide.category || "Architecture guide"}</small>
                <h2>{guide.title}</h2>
                <p>{guide.excerpt}</p>
                <span>Read guide <ArrowRight size={16} /></span>
              </div>
            </Link>
          );
        })}
        {!guides.length ? <p>No guides have been published yet. Add your first guide in Sanity Studio.</p> : null}
      </div>
    </section>
  );
}
