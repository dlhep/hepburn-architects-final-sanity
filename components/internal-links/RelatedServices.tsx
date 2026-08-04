import { getRelatedServices } from "@/lib/internal-links";
import { RelatedLinks } from "./RelatedLinks";

export function RelatedServices({ serviceSlug, heading = "Related services" }: { serviceSlug?: string; heading?: string }) {
  return <RelatedLinks heading={heading} links={getRelatedServices(serviceSlug)} group="related-services" />;
}
