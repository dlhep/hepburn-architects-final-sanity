import { site } from "@/lib/site";
import type { SchemaNode } from "./types";
import { IDS } from "./utils";

export function buildOrganisationSchema(): SchemaNode {
  return {
    "@type": "Organization", "@id": IDS.organisation, name: site.name, legalName: site.legalName,
    url: `${site.url}/`, logo: { "@type": "ImageObject", url: `${site.url}/images/social-sharing.jpg`, width: 1200, height: 630 },
    image: `${site.url}/images/social-sharing.jpg`, telephone: "+447720813035", email: site.email,
    founder: { "@id": IDS.davidHepburn }, sameAs: [site.instagram, site.facebook],
    subOrganization: [{ "@id": IDS.birminghamStudio }, { "@id": IDS.nunthorpeStudio }],
  };
}

export function buildArchitectSchema(): SchemaNode {
  return { "@type": "Person", "@id": IDS.davidHepburn, name: "David Hepburn", jobTitle: "Founding Director and Architect", worksFor: { "@id": IDS.organisation }, url: `${site.url}/about`, image: `${site.url}/images/david-hepburn-studio.jpg` };
}
