import { site } from "@/lib/site";

export function IdentitySchema() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/images/og.svg`,
      image: `${site.url}/images/og.svg`,
      email: site.email,
      telephone: "+44 7720 813035",
      founder: { "@id": `${site.url}/#david-hepburn` },
      sameAs: [site.instagram, site.facebook, site.googleBusiness],
      areaServed: [
        "Birmingham",
        "Solihull",
        "Harborne",
        "Moseley",
        "Edgbaston",
        "Sutton Coldfield",
        "West Midlands",
      ],
      subOrganization: [{ "@id": `${site.url}/#birmingham-studio` }],
    },
    {
      "@context": "https://schema.org",
      "@type": ["Architect", "LocalBusiness"],
      "@id": `${site.url}/#birmingham-studio`,
      name: "Hepburn Architects Birmingham",
      parentOrganization: { "@id": `${site.url}/#organization` },
      url: `${site.url}/locations/birmingham-architects`,
      telephone: "+44 7720 813035",
      email: site.email,
      logo: `${site.url}/images/og.svg`,
      image: `${site.url}/images/homepage-hero.png`,
      priceRange: "££",
      hasMap: site.offices.birmingham.mapUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.offices.birmingham.streetAddress,
        addressLocality: site.offices.birmingham.addressLocality,
        postalCode: site.offices.birmingham.postalCode,
        addressCountry: "GB",
      },
      areaServed: [
        "Birmingham",
        "Solihull",
        "Harborne",
        "Moseley",
        "Edgbaston",
        "Sutton Coldfield",
        "West Midlands",
      ],
      sameAs: [site.instagram, site.facebook, site.googleBusiness],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${site.url}/#david-hepburn`,
      name: "David Hepburn",
      jobTitle: "Founding Director and Architect",
      worksFor: { "@id": `${site.url}/#organization` },
      url: `${site.url}/about`,
      image:
        "https://www.hepburnarchitects.com/wp-content/uploads/2026/06/David-Hepburn.png",
      knowsAbout: [
        "Residential architecture",
        "Planning applications",
        "Building Regulations",
        "House extensions",
        "Loft conversions",
        "HMO conversions",
        "Small residential developments",
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
