import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { articleImageUrl, getArticle, getBlogPosts } from "@/lib/articles";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getArticle(slug, "blog");

  if (!page) notFound();

  const posts = await getBlogPosts();
  const related = posts.filter((item) => item.slug !== slug).slice(0, 3);
  const image = articleImageUrl(page.featuredImage);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: page.title,
    description: page.excerpt,
    datePublished: page.publishedAt,
    dateModified: page._updatedAt || page.publishedAt,
    author: {
      "@type": "Person",
      name: page.author || "David Hepburn",
    },
    publisher: {
      "@type": "Organization",
      name: "Hepburn Architects Ltd",
    },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
    image,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="section">
        <div className="shell article-page">
          <small className="eyebrow">
            <Newspaper size={14} /> {page.category || "Architecture journal"}
          </small>
          <h1>{page.title}</h1>
          <p className="lead">{page.excerpt}</p>
          <p style={{ opacity: .72 }}>
            Published{" "}
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "long",
            }).format(new Date(page.publishedAt))}
            {" "}· By {page.author || "David Hepburn"}
          </p>

          {image ? (
            <Image
              src={image}
              alt={page.featuredImage?.alt || page.title}
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

          <ArticleBody value={page.body || []} />

          <div className="content-cta">
            <h2>Planning a residential project?</h2>
            <p>
              Speak directly with Hepburn Architects about the site, design and
              likely next step.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/contact">
                Start a conversation <ArrowRight size={17} />
              </Link>
              <Link className="btn light-btn" href="/projects">
                View projects
              </Link>
            </div>
          </div>

          {related.length ? (
            <section className="related-guides">
              <small className="eyebrow">More from the journal</small>
              <div className="related-guide-grid">
                {related.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span>
                      Read article <ArrowRight size={15} />
                    </span>
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
