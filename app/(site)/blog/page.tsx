import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildGraph, buildItemListSchema, breadcrumbId } from "@/lib/structured-data";

const birminghamAuthorityArticles = [
  {
    title: "Loft Conversion Planning Rules in Birmingham: 2026 Guide",
    excerpt: "A practical guide to planning permission, permitted development, dormers, hip-to-gable extensions and Lawful Development Certificates for Birmingham loft conversions.",
    href: "/journal/loft-conversion-planning-rules-birmingham",
    image: "/images/journal-loft-conversion-birmingham.png",
    category: "Planning guidance",
    publishedAt: "2026-08-02",
  },
  {
    title: "House Extension Planning Permission in Birmingham: 2026 Guide",
    excerpt: "A practical guide to planning permission, permitted development, prior approval and Lawful Development Certificates for Birmingham extensions.",
    href: "/journal/house-extension-planning-permission-birmingham-2026-guide",
    image: "/images/selected-work-2.webp",
    category: "Planning guidance",
    publishedAt: "2026-08-02",
  },
  {
    title: "How to Choose the Best Architect in Birmingham",
    excerpt: "A practical guide to comparing Birmingham architects, checking credentials, reviewing relevant projects and appointing the right practice.",
    href: "/journal/how-to-choose-the-best-architect-in-birmingham",
    image: "/images/selected-work-1.webp",
    category: "Advice",
    publishedAt: "2026-08-02",
  },
];

export const metadata: Metadata = {
  title: "Architecture Journal",
  description:
    "Planning updates, project news, residential design ideas and practice insights from Hepburn Architects in Birmingham and the West Midlands.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Hepburn Architects Journal",
    description: "Planning updates, project news and practical residential architecture insights.",
    url: "/journal",
    type: "website",
    images: ["/images/social-sharing.jpg"],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const url = `${site.url}/journal`;
  const items = [...birminghamAuthorityArticles.map((article) => ({ name: article.title, url: `${site.url}${article.href}` })), ...posts.map((post) => ({ name: post.title, url: `${url}/${post.slug}` }))];
  const schema = buildGraph(buildCollectionPageSchema({ url, name: "Hepburn Architects Journal", description: metadata.description as string, breadcrumb: breadcrumbId(url) }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Journal", url }]), buildItemListSchema(url, "Published journal articles", items));

  return (
    <>
      <StructuredData data={schema} />
      <section className="section journal-index-section">
        <div className="journal-editorial-hero">
          <div className="shell journal-editorial-heading">
            <small className="eyebrow"><Newspaper size={14} /> Journal</small>
            <h1>Ideas and guidance from architectural practice.</h1>
            <div className="journal-editorial-aside">
              <span>Planning · Design · Homes</span>
              <p>Clear thinking on planning, residential design and the decisions that shape better projects across Birmingham and the West Midlands.</p>
            </div>
          </div>
          <Link className="shell journal-hero-story" href={birminghamAuthorityArticles[0].href}>
            <div className="journal-hero-story-image">
              <Image src={birminghamAuthorityArticles[0].image} alt={birminghamAuthorityArticles[0].title} fill priority sizes="(max-width: 900px) 100vw, 58vw" />
            </div>
            <div className="journal-hero-story-copy">
              <span>Featured article · 01</span>
              <small>{birminghamAuthorityArticles[0].category}</small>
              <h2>{birminghamAuthorityArticles[0].title}</h2>
              <p>{birminghamAuthorityArticles[0].excerpt}</p>
              <strong>Read the featured article <ArrowRight size={17} /></strong>
            </div>
          </Link>
        </div>

        <div className="shell guides-index journal-index-grid">
          {birminghamAuthorityArticles.slice(1).map((article, index) => <Link href={article.href} className="guide-index-card journal-index-card" key={article.href}>
            <span>{String(index + 1).padStart(2, "0")}</span><div>
              <Image className="journal-index-image" src={article.image} alt={article.title} width={1024} height={485} sizes={index === 0 ? "(max-width: 800px) 100vw, 720px" : "(max-width: 800px) 100vw, 540px"} />
              <small>{article.category}</small><h2>{article.title}</h2><p>{article.excerpt}</p><p className="muted small-copy">2 Aug 2026</p>
            </div><ArrowRight />
          </Link>)}
          {posts.map((post, index) => {
            const image = articleImageUrl(post.featuredImage, 900);
            return (
              <Link href={`/blog/${post.slug}`} className="guide-index-card journal-index-card" key={post._id}>
                <span>{String(index + birminghamAuthorityArticles.length + 1).padStart(2, "0")}</span>
                <div>
                  {image ? (
                    <Image
                      src={image}
                      alt={post.featuredImage?.alt || post.title}
                      width={900}
                      height={560}
                      sizes="(max-width: 950px) 100vw, 760px"
                      className="journal-index-image"
                    />
                  ) : null}
                  <small>{post.category || "Architecture journal"}</small>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <p className="muted small-copy">
                    {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(post.publishedAt))}
                  </p>
                </div>
                <ArrowRight />
              </Link>
            );
          })}

        </div>
      </section>
    </>
  );
}
