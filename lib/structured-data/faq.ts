import type { FaqItem, SchemaNode } from "./types";
import { faqId } from "./utils";

export function buildFaqSchema(url: string, faqs: readonly FaqItem[]): SchemaNode | undefined {
  if (!faqs.length) return undefined;
  return { "@type": "FAQPage", "@id": faqId(url), mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}
