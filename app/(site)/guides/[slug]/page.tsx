import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { ExtensionGuideDiagrams } from "@/components/ExtensionGuideDiagrams";
import { articleImageUrl, getArticle } from "@/lib/articles";
import { guides } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanityPage = await getArticle(slug, "guide");

  if (sanityPage) {
    const image = articleImageUrl(sanityPage.featuredImage, 1200);
    return {
      title: sanityPage.seoTitle || sanityPage.title,
      description: sanityPage.seoDescription || sanityPage.excerpt,
      alternates: { canonical: `/guides/${slug}` },
      openGraph: {
        title: sanityPage.seoTitle || sanityPage.title,
        description: sanityPage.seoDescription || sanityPage.excerpt,
        type: "article" as const,
        images: image ? [image] : undefined,
      },
    };
  }

  const page = guides.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article" as const,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanityPage = await getArticle(slug, "guide");

  if (sanityPage) {
    const image = articleImageUrl(sanityPage.featuredImage);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: sanityPage.title,
      description: sanityPage.excerpt,
      datePublished: sanityPage.publishedAt,
      dateModified: sanityPage._updatedAt || sanityPage.publishedAt,
      author: {
        "@type": "Person",
        name: sanityPage.author || "David Hepburn",
      },
      publisher: {
        "@type": "Organization",
        name: "Hepburn Architects Ltd",
      },
      mainEntityOfPage: `${site.url}/guides/${slug}`,
      image,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        <article className="section">
          <div className="shell article-page">
            <small className="eyebrow">
              <BookOpen size={14} /> {sanityPage.category || "Residential architecture guide"}
            </small>
            <h1>{sanityPage.title}</h1>
            <p className="lead">{sanityPage.excerpt}</p>
            <p style={{ opacity: .72 }}>
              Published{" "}
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "long",
              }).format(new Date(sanityPage.publishedAt))}
              {" "}· By {sanityPage.author || "David Hepburn"}
            </p>

            {image ? (
              <Image
                src={image}
                alt={sanityPage.featuredImage?.alt || sanityPage.title}
                width={1600}
                height={950}
                priority
                style={{
                  width: "100%",
                  height: "min(520px, 55vw)",
                  objectFit: "cover",
                  borderRadius: "18px",
                  margin: "2rem 0",
                }}
              />
            ) : null}

            <div className="guide-callout">
              <strong>Need advice on a specific property?</strong>
              <span>
                Call David directly on {site.phone} or book a free consultation.
              </span>
              <div className="actions">
                <a className="btn call-btn" href={site.phoneHref}>
                  <Phone size={17} /> Call now
                </a>
                <a
                  className="btn primary"
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book consultation
                </a>
              </div>
            </div>

            <ArticleBody value={sanityPage.body || []} />

            {slug === "complete-house-extension-guide" ? (
              <ExtensionGuideDiagrams />
            ) : null}

            <div className="content-cta">
              <h2>Get project-specific advice.</h2>
              <p>
                Use the calculator for an early fee indication, or speak directly
                with Hepburn Architects.
              </p>
              <div className="actions">
                <Link className="btn primary" href="/estimate">
                  Use fee calculator <ArrowRight size={17} />
                </Link>
                <Link className="btn light-btn" href="/services">
                  View services
                </Link>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }

  const page = guides.find((item) => item.slug === slug);
  if (!page) notFound();

  const related = guides.filter((item) => item.slug !== slug).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: { "@type": "Organization", name: "Hepburn Architects Ltd" },
    publisher: { "@type": "Organization", name: "Hepburn Architects Ltd" },
    mainEntityOfPage: `${site.url}/guides/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="section">
        <div className="shell article-page">
          <small className="eyebrow">
            <BookOpen size={14} /> Residential architecture guide
          </small>
          <h1>{page.title}</h1>
          <p className="lead">{page.intro}</p>

          <div className="guide-callout">
            <strong>Need advice on a specific property?</strong>
            <span>
              Call David directly on {site.phone} or book a free consultation.
            </span>
            <div className="actions">
              <a className="btn call-btn" href={site.phoneHref}>
                <Phone size={17} /> Call now
              </a>
              <a
                className="btn primary"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book consultation
              </a>
            </div>
          </div>

          <section>
            <h2>What this guide covers</h2>
            <p>
              Residential projects are shaped by the property, site history,
              local planning policy and the exact form of development proposed.
            </p>
            <ul className="article-check-list">
              {page.points.map((point) => (
                <li key={point}>
                  <CheckCircle2 /> {point}
                </li>
              ))}
            </ul>
          </section>

          {page.points.map((point, index) => (
            <section key={point}>
              <h2>{index + 1}. {point}</h2>
              <p>
                This issue should be reviewed early because it can affect the
                design, likely approval route, consultant requirements, project
                cost and overall programme.
              </p>
              <p>
                A proportionate assessment should consider the existing
                property, surrounding context, previous alterations, local policy
                and the information the decision-maker will need.
              </p>
              <h3>Practical next step</h3>
              <p>
                Record the relevant property information and confirm whether the
                issue can be addressed through design, supporting evidence or
                specialist advice before the application is submitted.
              </p>
            </section>
          ))}

          <section>
            <h2>When professional advice is worthwhile</h2>
            <p>
              Professional advice becomes particularly valuable where the site
              is constrained, the property has been extended before, neighbours
              are close, heritage or Green Belt policies apply, or the proposal
              involves a change of use or multiple dwellings.
            </p>
          </section>

          <div className="content-cta">
            <h2>Get project-specific advice.</h2>
            <p>
              Use the calculator for an early fee indication, or speak directly
              with Hepburn Architects about the property and likely next step.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">
                Use fee calculator <ArrowRight size={17} />
              </Link>
              <Link className="btn light-btn" href="/services">
                View architectural services
              </Link>
            </div>
          </div>

          <section className="related-guides">
            <small className="eyebrow">Related guides</small>
            <div className="related-guide-grid">
              {related.map((guide) => (
                <Link href={`/guides/${guide.slug}`} key={guide.slug}>
                  <h3>{guide.shortTitle}</h3>
                  <p>{guide.description}</p>
                  <span>
                    Read guide <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
