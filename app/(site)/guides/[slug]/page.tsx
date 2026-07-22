import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Phone,
} from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { articleImageUrl, getArticle } from "@/lib/articles";
import { guides } from "@/lib/content";
import { getGuideArticle } from "@/lib/guides";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((item) => ({ slug: item.slug }));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "Europe/London",
  }).format(new Date(`${value}T12:00:00Z`));
}

function sectionId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = guides.find((item) => item.slug === slug);
  const article = getGuideArticle(slug);
  const sanityPage = page && article ? null : await getArticle(slug, "guide");

  if (sanityPage) {
    const image = articleImageUrl(sanityPage.featuredImage, 1200);
    const title = sanityPage.seoTitle || sanityPage.title;
    const description = sanityPage.seoDescription || sanityPage.excerpt;

    return {
      title,
      description,
      authors: [{ name: sanityPage.author || "David Hepburn" }],
      alternates: { canonical: `/guides/${slug}` },
      openGraph: {
        title,
        description,
        type: "article",
        url: `${site.url}/guides/${slug}`,
        siteName: site.name,
        publishedTime: sanityPage.publishedAt,
        modifiedTime: sanityPage._updatedAt || sanityPage.publishedAt,
        authors: [sanityPage.author || "David Hepburn"],
        images: image ? [{ url: image, alt: sanityPage.featuredImage?.alt || sanityPage.title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
      },
      robots: { index: true, follow: true },
    };
  }

  if (!page || !article) return {};

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    authors: [{ name: "David Hepburn" }],
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      type: "article",
      url: `${site.url}/guides/${slug}`,
      siteName: site.name,
      publishedTime: article.publishedAt,
      modifiedTime: article.lastReviewed,
      authors: ["David Hepburn"],
    },
    twitter: {
      card: "summary",
      title: article.seoTitle,
      description: article.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = guides.find((item) => item.slug === slug);
  const article = getGuideArticle(slug);
  const sanityPage = page && article ? null : await getArticle(slug, "guide");

  if (sanityPage) {
    const image = articleImageUrl(sanityPage.featuredImage);
    const related = guides
      .filter((item) => item.slug !== slug)
      .slice(0, 4);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: sanityPage.title,
          description: sanityPage.excerpt,
          datePublished: sanityPage.publishedAt,
          dateModified: sanityPage._updatedAt || sanityPage.publishedAt,
          author: {
            "@type": "Person",
            name: sanityPage.author || "David Hepburn",
            jobTitle: "Architect",
            url: `${site.url}/studio`,
            worksFor: {
              "@type": "Organization",
              name: site.legalName,
              url: site.url,
            },
          },
          publisher: {
            "@type": "Organization",
            name: site.legalName,
            url: site.url,
          },
          mainEntityOfPage: `${site.url}/guides/${slug}`,
          image,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: site.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Guides",
              item: `${site.url}/guides`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: sanityPage.title,
              item: `${site.url}/guides/${slug}`,
            },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <article className="section">
          <div className="shell article-page">
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
              <Link href="/">Home</Link>
              <span aria-hidden="true"> / </span>
              <Link href="/guides">Guides</Link>
              <span aria-hidden="true"> / </span>
              <span>{sanityPage.title}</span>
            </nav>

            <small className="eyebrow">
              <BookOpen size={14} />{" "}
              {sanityPage.category || "Residential architecture guide"}
            </small>
            <h1>{sanityPage.title}</h1>
            <p className="lead">{sanityPage.excerpt}</p>
            <p style={{ opacity: 0.72 }}>
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

            <aside
              aria-label="Author information"
              style={{
                borderTop: "1px solid rgba(0,0,0,.12)",
                borderBottom: "1px solid rgba(0,0,0,.12)",
                padding: "1.25rem 0",
                margin: "2rem 0",
              }}
            >
              <strong>Written and reviewed by David Hepburn</strong>
              <p style={{ margin: ".5rem 0 0" }}>
                Architect and Director of Hepburn Architects, advising homeowners
                and developers on residential design, planning and Building Regulations.
              </p>
            </aside>

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

  if (!page || !article) notFound();

  const related = article.relatedSlugs
    .map((relatedSlug) => guides.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof guides)[number] => Boolean(item));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: page.title,
        description: article.metaDescription,
        datePublished: article.publishedAt,
        dateModified: article.lastReviewed,
        author: {
          "@type": "Person",
          name: "David Hepburn",
          jobTitle: "Architect",
          url: `${site.url}/studio`,
          worksFor: {
            "@type": "Organization",
            name: site.legalName,
            url: site.url,
          },
        },
        publisher: {
          "@type": "Organization",
          name: site.legalName,
          url: site.url,
        },
        mainEntityOfPage: `${site.url}/guides/${slug}`,
        articleSection: article.category,
        about: article.keyPoints,
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${site.url}/guides`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: `${site.url}/guides/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="section">
        <div className="shell article-page">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
            <Link href="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true"> / </span>
            <span>{page.title}</span>
          </nav>

          <small className="eyebrow">
            <BookOpen size={14} /> {article.category}
          </small>
          <h1>{page.title}</h1>
          <p className="lead">{page.intro}</p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem 1.5rem",
              alignItems: "center",
              opacity: 0.75,
              margin: "1.25rem 0 2rem",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: ".4rem" }}>
              <CalendarDays size={16} />
              Reviewed {formatDate(article.lastReviewed)}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: ".4rem" }}>
              <Clock3 size={16} />
              {article.readingTime} read
            </span>
            <span>By David Hepburn, Architect</span>
          </div>

          <section
            aria-labelledby="quick-answer"
            style={{
              border: "1px solid rgba(0,0,0,.12)",
              borderRadius: "18px",
              padding: "1.5rem",
              margin: "0 0 2rem",
              background: "rgba(0,0,0,.025)",
            }}
          >
            <small className="eyebrow">Quick answer</small>
            <h2 id="quick-answer" style={{ marginTop: ".5rem" }}>
              The essential position
            </h2>
            <p style={{ fontSize: "1.08rem", marginBottom: 0 }}>
              {article.quickAnswer}
            </p>
          </section>

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

          <section aria-labelledby="key-points">
            <h2 id="key-points">Key points</h2>
            <ul className="article-check-list">
              {article.keyPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 /> {point}
                </li>
              ))}
            </ul>
          </section>

          <nav
            aria-label="On this page"
            style={{
              borderTop: "1px solid rgba(0,0,0,.12)",
              borderBottom: "1px solid rgba(0,0,0,.12)",
              padding: "1.25rem 0",
              margin: "2rem 0",
            }}
          >
            <strong>On this page</strong>
            <ol style={{ marginBottom: 0 }}>
              {article.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${sectionId(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
              <li>
                <a href="#frequently-asked-questions">Frequently asked questions</a>
              </li>
            </ol>
          </nav>

          {article.sections.map((section, index) => (
            <section key={section.heading} id={sectionId(section.heading)}>
              <h2>
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section id="frequently-asked-questions">
            <small className="eyebrow">Frequently asked questions</small>
            <h2>Questions homeowners commonly ask</h2>
            <div style={{ display: "grid", gap: ".75rem" }}>
              {article.faqs.map((faq) => (
                <details
                  key={faq.question}
                  style={{
                    border: "1px solid rgba(0,0,0,.12)",
                    borderRadius: "12px",
                    padding: "1rem 1.1rem",
                  }}
                >
                  <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                    {faq.question}
                  </summary>
                  <p style={{ marginBottom: 0 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <aside
            aria-label="Author and review information"
            style={{
              borderTop: "1px solid rgba(0,0,0,.12)",
              borderBottom: "1px solid rgba(0,0,0,.12)",
              padding: "1.25rem 0",
              margin: "2.5rem 0",
            }}
          >
            <strong>Written and reviewed by David Hepburn</strong>
            <p style={{ margin: ".5rem 0" }}>
              Architect and Director of Hepburn Architects, with practical
              experience across residential extensions, loft conversions, HMOs,
              flat conversions, new homes, planning and Building Regulations.
            </p>
            <p style={{ margin: 0, opacity: 0.72 }}>
              This guide covers England and provides general information rather
              than property-specific legal or technical advice. Planning policy,
              local standards and legislation can change.
            </p>
          </aside>

          <section aria-labelledby="official-sources">
            <h2 id="official-sources">Official guidance and further reading</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">
                    {source.label} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="content-cta">
            <h2>Get project-specific advice.</h2>
            <p>
              Every property has a different planning history, physical context and
              technical risk. Start with a focused review before committing to work.
            </p>
            <div className="actions">
              <Link className="btn primary" href={article.serviceHref}>
                {article.serviceLabel} <ArrowRight size={17} />
              </Link>
              <Link className="btn light-btn" href="/estimate">
                Use fee calculator
              </Link>
            </div>
          </div>

          <section className="related-guides">
            <small className="eyebrow">Related guides</small>
            <h2>Continue your research</h2>
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
