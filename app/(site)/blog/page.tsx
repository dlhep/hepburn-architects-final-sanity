import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";
import { site } from "@/lib/site";

const birminghamAuthorityArticles = [
  {
    title: "House Extension Planning Permission in Birmingham: 2026 Guide",
    excerpt: "A practical guide to planning permission, permitted development, prior approval and Lawful Development Certificates for Birmingham extensions.",
    href: "/journal/house-extension-planning-permission-birmingham-2026-guide",
    image: "/images/birmingham-residential-project.jpg",
    category: "Planning guidance",
    publishedAt: "2026-08-02",
  },
  {
    title: "How to Choose the Best Architect in Birmingham",
    excerpt: "A practical guide to comparing Birmingham architects, checking credentials, reviewing relevant projects and appointing the right practice.",
    href: "/journal/how-to-choose-the-best-architect-in-birmingham",
    image: "/images/birmingham-residential-project.jpg",
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hepburn Architects Journal",
    url: `${site.url}/blog`,
    description: "Planning updates, project news and residential architecture insights.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        ...birminghamAuthorityArticles.map((article, index) => ({ "@type": "ListItem", position: index + 1, url: `${site.url}${article.href}`, name: article.title })),
        ...posts.map((post, index) => ({ "@type": "ListItem", position: index + birminghamAuthorityArticles.length + 1, url: `${site.url}/blog/${post.slug}`, name: post.title })),
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="section">
        <div className="shell page-intro">
          <small className="eyebrow"><Newspaper size={14} /> Journal</small>
          <h1>Architecture news and insights.</h1>
          <p>Planning updates, design ideas, project news and practical residential architecture advice from a director-led RIBA Chartered practice.</p>
        </div>

        <div className="shell guides-index">
          {birminghamAuthorityArticles.map((article, index) => <Link href={article.href} className="guide-index-card" key={article.href}>
            <span>{String(index + 1).padStart(2, "0")}</span><div>
              <Image src={article.image} alt={article.title} width={1024} height={485} sizes="(max-width: 950px) 100vw, 760px" style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "14px", marginBottom: "1rem" }} />
              <small>{article.category}</small><h2>{article.title}</h2><p>{article.excerpt}</p><p className="muted small-copy">2 Aug 2026</p>
            </div><ArrowRight />
          </Link>)}
          {posts.map((post, index) => {
            const image = articleImageUrl(post.featuredImage, 900);
            return (
              <Link href={`/blog/${post.slug}`} className="guide-index-card" key={post._id}>
                <span>{String(index + birminghamAuthorityArticles.length + 1).padStart(2, "0")}</span>
                <div>
                  {image ? (
                    <Image
                      src={image}
                      alt={post.featuredImage?.alt || post.title}
                      width={900}
                      height={560}
                      sizes="(max-width: 950px) 100vw, 760px"
                      style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "14px", marginBottom: "1rem" }}
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
