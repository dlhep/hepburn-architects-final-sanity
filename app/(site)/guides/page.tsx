import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/lib/content";
import { articleImageUrl, getSanityGuides } from "@/lib/articles";
import { getGuideArticle } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Planning & Architecture Guides | Hepburn Architects",
  description:
    "Expert residential architecture guides for England covering extensions, permitted development, lofts, HMOs, planning applications, costs and Building Regulations.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Residential Planning & Architecture Guides",
    description:
      "Practical, architect-reviewed guidance for homeowners, developers and property investors.",
    type: "website",
    url: `${site.url}/guides`,
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default async function GuidesPage() {
  const sanityGuides = await getSanityGuides();
  const staticSlugs = new Set(guides.map((guide) => guide.slug));
  const newGuides = sanityGuides.filter((guide) => !staticSlugs.has(guide.slug));

  const allItems = [
    ...newGuides.map((guide) => ({
      name: guide.title,
      url: `${site.url}/guides/${guide.slug}`,
    })),
    ...guides.map((guide) => ({
      name: guide.title,
      url: `${site.url}/guides/${guide.slug}`,
    })),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Residential planning and architecture guides",
    description:
      "Architect-reviewed guidance for residential projects in England.",
    url: `${site.url}/guides`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allItems.length,
      itemListElement: allItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="section">
        <div className="shell page-intro">
          <small className="eyebrow">
            <BookOpen size={14} />
            Knowledge centre
          </small>
          <h1>Residential planning and architecture guides.</h1>
          <p>
            Clear, architect-reviewed guidance for homeowners, developers and
            property investors across England. Each guide explains the rules,
            practical design decisions, common risks and the next steps for a
            real project.
          </p>
          <div className="actions">
            <Link className="btn light-btn" href="/blog">
              View practice journal
            </Link>
            <Link className="btn primary" href="/services">
              Explore architectural services
            </Link>
          </div>
        </div>

        {newGuides.length ? (
          <div className="shell" style={{ marginBottom: "3rem" }}>
            <small className="eyebrow">Featured guide</small>
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
                      <small className="eyebrow">
                        {guide.category || "In-depth guide"}
                      </small>
                      <h2>{guide.title}</h2>
                      <p>{guide.excerpt}</p>
                    </div>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="shell" style={{ marginBottom: "1.5rem" }}>
          <small className="eyebrow">Browse all guides</small>
          <h2>Plan with clearer information.</h2>
          <p>
            Start with the guide closest to your project, then follow the
            related links to understand planning, technical design, cost and
            approval requirements together.
          </p>
        </div>

        <div className="shell guides-index">
          {guides.map((guide, index) => {
            const article = getGuideArticle(guide.slug);
            return (
              <Link
                href={`/guides/${guide.slug}`}
                className="guide-index-card"
                key={guide.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {article ? (
                    <small className="eyebrow">{article.category}</small>
                  ) : null}
                  <h2>{guide.title}</h2>
                  <p>{guide.description}</p>
                  {article ? (
                    <small>
                      {article.readingTime} read · Reviewed 22 July 2026
                    </small>
                  ) : null}
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
