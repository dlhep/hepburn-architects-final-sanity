import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { ARTICLE_QUERY, ARTICLE_SLUGS_QUERY, BLOG_POSTS_QUERY, GUIDES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export type ArticleImage = {
  alt?: string;
  caption?: string;
  asset?: { url?: string; _id?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
  hotspot?: unknown;
  crop?: unknown;
};

export type Article = {
  _id: string;
  _updatedAt?: string;
  contentType: "guide" | "blog";
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  author?: string;
  featured?: boolean;
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: ArticleImage;
};

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!isSanityConfigured) return [] as T;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60, tags: ["sanity-articles"] } });
  } catch (error) {
    console.error("Sanity article fetch failed.", error);
    return [] as T;
  }
}

export const getGuides = () => fetchSanity<Article[]>(GUIDES_QUERY);
export const getBlogPosts = () => fetchSanity<Article[]>(BLOG_POSTS_QUERY);
export const getArticle = (slug: string, contentType: "guide" | "blog") => fetchSanity<Article | null>(ARTICLE_QUERY, { slug, contentType });
export const getArticleSlugs = () => fetchSanity<Array<{ slug: string; contentType: "guide" | "blog" }>>(ARTICLE_SLUGS_QUERY);

export function articleImageUrl(image?: ArticleImage, width = 1600): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image).width(width).quality(86).url();
}
