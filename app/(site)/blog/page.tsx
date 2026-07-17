import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Architecture Blog | Hepburn Architects",
  description: "News, planning insights, design ideas and residential architecture updates from Hepburn Architects.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <section className="section"><div className="shell page-intro"><small className="eyebrow"><Newspaper size={14} />Journal</small><h1>Architecture news and insights.</h1><p>Planning updates, design ideas, project news and practical residential architecture advice.</p></div><div className="shell article-card-grid">{posts.map((post) => { const image = articleImageUrl(post.featuredImage, 900); return <Link href={`/blog/${post.slug}`} className="article-card" key={post._id}>{image ? <Image src={image} alt={post.featuredImage?.alt || post.title} width={900} height={560} /> : null}<div><small>{post.category || "Practice news"}</small><h2>{post.title}</h2><p>{post.excerpt}</p><span>Read article <ArrowRight size={16} /></span></div></Link>; })}{!posts.length ? <p>No blog posts have been published yet. Add your first post in Sanity Studio.</p> : null}</div></section>;
}
