import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/lib/content";
import { articleImageUrl, getSanityGuides } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Residential Planning & Architecture Guides | Hepburn Architects",
  description:
    "SEO-rich practical guides covering planning permission, extensions, loft conversions, HMOs, flat conversions, architect fees and Building Regulations.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesPage() {
  const sanityGuides = await getSanityGuides();
  const staticSlugs = new Set(guides.map((guide) => guide.slug));
  const newGuides = sanityGuides.filter((guide) => !staticSlugs.has(guide.slug));

  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow"><BookOpen size={14} />Knowledge centre</small>
        <h1>Residential planning and architecture guides.</h1>
        <p>Practical, plain-English guidance for homeowners, developers and property investors in England.</p>
        <div className="actions">
          <Link className="btn light-btn" href="/blog">View architecture blog</Link>
        </div>
      </div>

      {newGuides.length ? (
        <div className="shell" style={{ marginBottom: "3rem" }}>
          <small className="eyebrow">Latest guides</small>
          <div className="guides-index">
            {newGuides.map((guide, index) => {
              const image = articleImageUrl(guide.featuredImage, 700);
              return (
                <Link
                  href={`/guides/${guide.slug}`}
                  className="guide-index-card"
                  key={guide._id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    {image ? (
                      <Image
                        src={image}
                        alt={guide.featuredImage?.alt || guide.title}
                        width={700}
                        height={420}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                          borderRadius: "14px",
                          marginBottom: "1rem",
                        }}
                      />
                    ) : null}
                    <h2>{guide.title}</h2>
                    <p>{guide.excerpt}</p>
                  </div>
                  <ArrowRight />
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="shell guides-index">
        {guides.map((guide, index) => (
          <Link
            href={`/guides/${guide.slug}`}
            className="guide-index-card"
            key={guide.slug}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </section>
  );
}
