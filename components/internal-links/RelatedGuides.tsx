import { getRelatedGuides } from "@/lib/internal-links";
import { RelatedLinks } from "./RelatedLinks";

export function RelatedGuides({ serviceSlug, heading = "Helpful guides" }: { serviceSlug?: string; heading?: string }) {
  return <RelatedLinks heading={heading} links={getRelatedGuides(serviceSlug)} group="related-guides" />;
}
