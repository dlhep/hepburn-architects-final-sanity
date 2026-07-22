import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { articleImageUrl, getArticle, getBlogPosts } from "@/lib/articles";
import { site } from "@/lib/site";

const topics = [
  { terms: ["extension", "rear extension", "two-storey", "single-storey"], service: { href: "/services/house-extensions", label: "House extension architect" }, guide: { href: "/guides/complete-house-extension-guide", label: "Complete House Extension Guide" } },
  { terms: ["loft", "dormer", "roof"], service: { href: "/services/loft-conversions", label: "Loft conversion architect" }, guide: { href: "/guides/loft-conversion-planning-permission", label: "Loft conversion planning guide" } },
  { terms: ["hmo", "house in multiple occupation"], service: { href: "/services/hmo-conversions", label: "HMO architect" }, guide: { href: "/guides/hmo-conversion-planning-guide", label: "HMO conversion planning guide" } },
  { terms: ["building regulations", "technical", "construction drawings"], service: { href: "/services/building-regulations", label: "Building Regulations drawings" }, guide: { href: "/guides/building-regulations-drawings", label: "Building Regulations drawings guide" } },
  { terms: ["new home", "new-build", "new build", "development", "masterplan", "apartments"], service: { href: "/services/new-build-homes", label: "New-build home architect" }, guide: { href: "/guides/replacement-dwelling-planning", label: "Replacement dwelling planning guide" } },
  { terms: ["planning", "permission", "refusal", "condition"], service: { href: "/services/planning-applications", label: "Planning application architect" }, guide: { href: "/guides/planning-refusal-next-steps", label: "Planning refusal next steps" } },
];

function topicLinks(text: string) {
  const normalised = text.toLowerCase();
  return topics.find((topic) => topic.terms.some((term) => normalised.includes(term))) || topics[5];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getArticle(slug, "blog");
  if (!page) return {};
  const image = articleImageUrl(page.featuredImage, 1200);
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || page.excerpt,
      type: "article" as const,
      url: `/blog/${slug}`,
      publishedTime: page.publishedAt,
      modifiedTime: page._updatedAt || page.publishedAt,
      authors: [`${site.url}/about`],
      images: image ? [image] : ["/images/og.svg"],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: page.seoTitle || page.title,
      description: page.seoDescription || page.excerpt,
      images: image ? [image] : ["/images/og.svg"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getArticle(slug, "blog");
  if (!page) notFound();

  const posts = await getBlogPosts();
  const related = posts
    .filter((item) => item.slug !== slug)
    .sort((a, b) => Number(b.category === page.category) - Number(a.category === page.category))
    .slice(0, 3);
  const image = articleImageUrl(page.featuredImage);
  const links = topicLinks(`${page.title} ${page.category || ""} ${page.excerpt}`);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: page.title,
      description: page.excerpt,
      datePublished: page.publishedAt,
      dateModified: page._updatedAt || page.publishedAt,
      author: { "@type": "Person", "@id": `${site.url}/#david-hepburn`, name: page.author || "David Hepburn", url: `${site.url}/about` },
      publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: "Hepburn Architects Ltd", logo: { "@type": "ImageObject", url: `${site.url}/images/og.svg` } },
      mainEntityOfPage: `${site.url}/blog/${slug}`,
      image: image || `${site.url}/images/og.svg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: page.title, item: `${site.url}/blog/${slug}` },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <article className="section">
        <div className="shell article-page">
          <nav aria-label="Breadcrumb" className="muted small-copy">
            <Link href="/">Home</Link> · <Link href="/blog">Journal</Link>
          </nav>
          <small className="eyebrow"><Newspaper size={14} /> {page.category || "Architecture journal"}</small>
          <h1>{page.title}</h1>
          <p className="lead">{page.excerpt}</p>
          <p style={{ opacity: .72 }}>
            Published {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(page.publishedAt))}
            {page._updatedAt && page._updatedAt !== page.publishedAt ? ` · Updated ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(page._updatedAt))}` : ""}
            {" "}· By <Link href="/about">{page.author || "David Hepburn"}</Link>
          </p>

          {image ? (
            <Image
              src={image}
              alt={page.featuredImage?.alt || page.title}
              width={1600}
              height={950}
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              style={{ width: "100%", height: "auto", maxHeight: "700px", objectFit: "contain", background: "#f3f3f1", borderRadius: "18px", margin: "2rem 0" }}
            />
          ) : null}

          <ArticleBody value={page.body || []} />

          <section className="sand-section" style={{ padding: "28px", borderRadius: "22px" }}>
            <small className="eyebrow">Related professional guidance</small>
            <h2>Continue with the relevant service and guide.</h2>
            <div className="actions">
              <Link className="btn primary" href={links.service.href}>{links.service.label} <ArrowRight size={16} /></Link>
              <Link className="btn secondary" href={links.guide.href}>{links.guide.label}</Link>
            </div>
          </section>

          <div className="content-cta">
            <h2>Planning a residential project?</h2>
            <p>Speak directly with Hepburn Architects about the site, design and likely next step.</p>
            <div className="actions">
              <Link className="btn primary" href="/contact">Start a conversation <ArrowRight size={17} /></Link>
              <Link className="btn light-btn" href="/projects">View projects</Link>
            </div>
          </div>

          {related.length ? (
            <section className="related-guides">
              <small className="eyebrow">More from the journal</small>
              <div className="related-guide-grid">
                {related.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post._id}>
                    <small>{post.category || "Journal"}</small>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span>Read article <ArrowRight size={15} /></span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
