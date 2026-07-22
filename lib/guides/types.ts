export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideSource = {
  label: string;
  href: string;
};

export type GuideArticle = {
  seoTitle: string;
  metaDescription: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  lastReviewed: string;
  quickAnswer: string;
  keyPoints: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedSlugs: string[];
  serviceHref: string;
  serviceLabel: string;
  sources: GuideSource[];
};

