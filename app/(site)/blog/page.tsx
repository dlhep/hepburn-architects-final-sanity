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
    image: "/images/selected-work-3.webp",
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
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Hepburn Architects Journal",
    description: "Planning updates, project news and practical residential architecture insights.",
    url: "/blog",
    type: "website",
    images: ["/images/social-sharing.jpg"],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const url = `${site.url}/blog`;
  const items = [...birminghamAuthorityArticles.map((article) => ({ name: article.title, url: `${site.url}${article.href}` })), ...posts.map((post) => ({ name: post.title, url: `${url}/${post.slug}` }))];
  const schema = buildGraph(buildCollectionPageSchema({ url, name: "Hepburn Architects Journal", description: metadata.description as string, breadcrumb: breadcrumbId(url) }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Journal", url }]), buildItemListSchema(url, "Published journal articles", items));

  return (
    <>
      <StructuredData data={schema} />
      <section className="section journal-index-section">
        <div className="shell page-intro journal-index-intro">
          <small className="eyebrow"><Newspaper size={14} /> Journal</small>
          <h1>Architecture news and insights.</h1>
          <p>Planning updates, design ideas, project news and practical residential architecture advice from a director-led RIBA Chartered practice.</p>
        </div>

        <div className="shell guides-index journal-index-grid">
          {birminghamAuthorityArticles.map((article, index) => <Link href={article.href} className={`guide-index-card journal-index-card${index === 0 ? " journal-index-feature" : ""}`} key={article.href}>
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
