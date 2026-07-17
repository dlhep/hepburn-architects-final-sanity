import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Phone } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { articleImageUrl, getArticle, getGuides } from "@/lib/articles";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getArticle(slug, "guide");
  if (!page) return {};
  const image = articleImageUrl(page.featuredImage, 1200);
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { title: page.seoTitle || page.title, description: page.seoDescription || page.excerpt, type: "article", images: image ? [image] : undefined },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getArticle(slug, "guide");
  if (!page) notFound();
  const guides = await getGuides();
  const related = guides.filter((item) => item.slug !== slug).slice(0, 3);
  const image = articleImageUrl(page.featuredImage);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.excerpt,
    datePublished: page.publishedAt,
    dateModified: page._updatedAt || page.publishedAt,
    author: { "@type": "Person", name: page.author || "David Hepburn" },
    publisher: { "@type": "Organization", name: "Hepburn Architects Ltd" },
    mainEntityOfPage: `${site.url}/guides/${slug}`,
    image,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="section">
        <div className="shell article-page">
          <small className="eyebrow"><BookOpen size={14} /> {page.category || "Residential architecture guide"}</small>
          <h1>{page.title}</h1>
          <p className="lead">{page.excerpt}</p>
          <p className="article-meta">Published {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(page.publishedAt))} · By {page.author || "David Hepburn"}</p>
          {image ? <Image className="article-hero-image" src={image} alt={page.featuredImage?.alt || page.title} width={1600} height={950} priority /> : null}
          <div className="guide-callout">
            <strong>Need advice on a specific property?</strong>
            <span>Call David directly on {site.phone} or book a free consultation.</span>
            <div className="actions"><a className="btn call-btn" href={site.phoneHref}><Phone size={17} /> Call now</a><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a></div>
          </div>
          <ArticleBody value={page.body || []} />
          <div className="content-cta"><h2>Get project-specific advice.</h2><p>Use the calculator for an early fee indication, or speak directly with Hepburn Architects.</p><div className="actions"><Link className="btn primary" href="/estimate">Use fee calculator <ArrowRight size={17} /></Link><Link className="btn light-btn" href="/services">View services</Link></div></div>
          {related.length ? <section className="related-guides"><small className="eyebrow">Related guides</small><div className="related-guide-grid">{related.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide._id}><h3>{guide.title}</h3><p>{guide.excerpt}</p><span>Read guide <ArrowRight size={15} /></span></Link>)}</div></section> : null}
        </div>
      </article>
    </>
  );
}
