import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Architecture Blog | Planning, Projects & Residential Design",
  description:
    "Planning updates, project news, residential design ideas and practice insights from Hepburn Architects in Birmingham and the West Midlands.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Hepburn Architects Journal",
    description: "Planning updates, project news and practical residential architecture insights.",
    url: "/blog",
    type: "website",
    images: ["/images/og.svg"],
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
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${site.url}/blog/${post.slug}`,
        name: post.title,
      })),
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
          {posts.map((post, index) => {
            const image = articleImageUrl(post.featuredImage, 900);
            return (
              <Link href={`/blog/${post.slug}`} className="guide-index-card" key={post._id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
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

          {!posts.length ? (
            <div>
              <h2>No journal posts published yet.</h2>
              <p>Add and publish an article in Sanity Studio.</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
