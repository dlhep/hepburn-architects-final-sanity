import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Architecture Blog | Hepburn Architects",
  description:
    "News, planning insights, design ideas and residential architecture updates from Hepburn Architects.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow"><Newspaper size={14} />Journal</small>
        <h1>Architecture news and insights.</h1>
        <p>
          Planning updates, design ideas, project news and practical residential
          architecture advice.
        </p>
      </div>

      <div className="shell guides-index">
        {posts.map((post, index) => {
          const image = articleImageUrl(post.featuredImage, 900);

          return (
            <Link
              href={`/blog/${post.slug}`}
              className="guide-index-card"
              key={post._id}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                {image ? (
                  <Image
                    src={image}
                    alt={post.featuredImage?.alt || post.title}
                    width={900}
                    height={560}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      borderRadius: "14px",
                      marginBottom: "1rem",
                    }}
                  />
                ) : null}
                <small>{post.category || "Architecture journal"}</small>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <ArrowRight />
            </Link>
          );
        })}

        {!posts.length ? (
          <div>
            <h2>No blog posts published yet.</h2>
            <p>
              Add the first post in Sanity Studio and publish it. It should appear
              here within about one minute.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
