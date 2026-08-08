import { site } from "@/lib/site";
import type { SchemaNode } from "./types";
import { IDS } from "./utils";

export type StudioKey = "birmingham" | "nunthorpe";
export const studioId = (key: StudioKey) => key === "birmingham" ? IDS.birminghamStudio : IDS.nunthorpeStudio;

export function buildBusinessLocationSchema(key: StudioKey): SchemaNode {
  const office = site.offices[key];
  const birmingham = key === "birmingham";
  const sameAs = birmingham ? site.googleBusinessBirmingham : site.googleBusinessNorthEast;
  return {
    "@type": ["LocalBusiness", "ProfessionalService"], "@id": studioId(key),
    name: `Hepburn Architects ${birmingham ? "Birmingham" : "Nunthorpe"}`,
    url: birmingham ? `${site.url}/locations/birmingham-architects` : `${site.url}/locations/nunthorpe-architects`,
    parentOrganization: { "@id": IDS.organisation }, telephone: "+447720813035", email: site.email,
    image: `${site.url}/images/social-sharing.jpg`, hasMap: office.mapUrl,
    address: { "@type": "PostalAddress", streetAddress: office.streetAddress, addressLocality: office.addressLocality, addressRegion: birmingham ? "West Midlands" : "North Yorkshire", postalCode: office.postalCode, addressCountry: "GB" },
    areaServed: birmingham
      ? [{ "@type": "City", name: "Birmingham" }, { "@type": "City", name: "Solihull" }, { "@type": "AdministrativeArea", name: "West Midlands" }]
      : [{ "@type": "Place", name: "Nunthorpe" }, { "@type": "Place", name: "Teesside" }, { "@type": "AdministrativeArea", name: "North East England" }],
    sameAs: sameAs ? [sameAs] : undefined,
  };
}
