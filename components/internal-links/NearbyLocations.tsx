import { getNearbyLocations } from "@/lib/internal-links";
import { RelatedLinks } from "./RelatedLinks";

export function NearbyLocations({ locationSlug }: { locationSlug: string }) {
  return <RelatedLinks heading="Nearby areas" links={getNearbyLocations(locationSlug)} group="nearby-locations" ariaLabel="Nearby locations" />;
}
