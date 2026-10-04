import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Development Architects | Birmingham & West Midlands",
  description:
    "Architectural support for housebuilders, developers and landowners across Birmingham and the West Midlands: site appraisal, capacity studies, masterplanning, planning and technical design.",
  alternates: { canonical: "/residential-development" },
  openGraph: {
    title: "Residential Development Architects | Birmingham & West Midlands",
    description:
      "Site appraisal, residential masterplanning, planning and technical design for housebuilders, developers and landowners across the West Midlands.",
    url: `${site.url}/residential-development`,
    images: ["/images/selected-work-1.webp"],
  },
};

const capabilities = [
  {
    title: "Site appraisal",
    text: "Review planning context, physical constraints, access, surrounding development and the key issues likely to affect the opportunity before significant design work begins.",
  },
  {
    title: "Capacity studies",
    text: "Test credible development options, dwelling numbers, unit mix, parking, private amenity and landscape rather than relying on a headline unit count.",
  },
  {
    title: "Residential masterplanning",
    text: "Develop coherent layouts around street structure, plot efficiency, house orientation, gardens, parking, servicing, landscape and a clear sense of place.",
  },
  {
    title: "Planning",
    text: "Prepare and coordinate the architectural information required for residential planning applications, including layouts, house types, street scenes, sections and supporting design material.",
  },
  {
    title: "House types",
    text: "Create efficient, repeatable dwelling types that respond to the site while maintaining a consistent architectural language and commercially sensible footprints.",
  },
  {
    title: "Technical design",
    text: "Develop approved schemes into coordinated Building Regulations and construction information alongside structural, civil and specialist consultants where appointed.",
  },
];

const process = [
  ["01", "Land", "A site, building or development opportunity is identified."],
  ["02", "Appraisal", "We review context, constraints, planning history and the principal development risks."],
  ["03", "Capacity", "We test how the site can work: access, layout, unit mix, parking, amenity and landscape."],
  ["04", "Design", "The preferred strategy is developed into a coherent masterplan and house types."],
  ["05", "Planning", "We prepare the architectural planning package and coordinate the required supporting information."],
  ["06", "Technical", "Following consent, the design can be developed for Building Regulations and construction."],
];

const developerNeeds = [
  "A quick, realistic view of what a site may support",
  "Layouts that balance planning quality with commercial efficiency",
  "Clear identification of risks before unnecessary money is spent",
  "Consistent house types that can be adapted across plots",
  "Responsive architectural input when a scheme needs to move",
  "A route from early feasibility through planning and technical design",
];

const audiences = [
  "Local and regional housebuilders",
  "Residential developers",
  "Landowners",
  "Property investors",
  "Builders moving into small-site development",
  "Land and property agents",
];

export default function ResidentialDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Residential Development Architectural Services",
    description:
      "Architectural support for housebuilders, developers and landowners across Birmingham and the West Midlands, including site appraisal, capacity studies, masterplanning, planning and technical design.",
    provider: {
      "@type": "Organization",
      name: "Hepburn Architects",
      url: site.url,
    },
    areaServed: [
      { "@type": "City", name: "Birmingham" },
      { "@type": "AdministrativeArea", name: "West Midlands" },
    ],
    url: `${site.url}/residential-development`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        style={{
          background: "#f1efe9",
          padding: "76px 24px 64px",
          borderBottom: "1px solid rgba(32,35,33,.12)",
        }}
      >
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <small className="eyebrow">Hepburn / Development</small>
            <h1
              style={{
                fontSize: "clamp(42px,6vw,76px)",
                lineHeight: 0.98,
                letterSpacing: "-.045em",
                fontWeight: 500,
                margin: "18px 0 28px",
              }}
            >
              Residential development architects.
            </h1>
            <p className="lead" style={{ maxWidth: 720 }}>
              From land appraisal to planning and technical delivery. We help
              housebuilders, developers and landowners turn residential
              opportunities into well-considered, commercially credible schemes.
            </p>
            <div className="actions" style={{ marginTop: 30 }}>
              <Link className="btn primary" href="/contact?service=residential-development">
                Discuss a site <ArrowRight size={17} />
              </Link>
              <Link className="btn secondary" href="/development-potential-appraisal">
                Start with an appraisal
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: 14, opacity: 0.72 }}>
              Birmingham · Solihull · West Midlands
            </p>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: 500,
              overflow: "hidden",
              background: "#ddd9d0",
            }}
          >
            <Image
              src="/images/selected-work-1.webp"
              alt="Residential development architecture by Hepburn Architects"
              fill
              priority
              sizes="(max-width: 850px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                background: "rgba(32,35,33,.88)",
                color: "white",
                padding: "12px 16px",
                fontSize: 13,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Land · Planning · Homes · Delivery
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <small className="eyebrow">For housebuilders and developers</small>
            <h2 style={{ maxWidth: 560 }}>
              A development architect should understand more than the elevations.
            </h2>
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.72 }}>
            <p>
              Successful residential development depends on the relationship
              between planning strategy, site capacity, access, parking, private
              amenity, landscape, house types and buildability. Those decisions
              need to work together from the beginning.
            </p>
            <p>
              Our role is to help establish a credible development strategy,
              improve the quality of the proposal and produce clear architectural
              information as the project moves from feasibility through planning
              and technical design.
            </p>
          </div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Development services</small>
            <h2>Support at the stages that affect value and risk.</h2>
            <p className="lead">
              Appoint us for an early site study or continue through concept,
              planning and technical delivery.
            </p>
          </div>

          <div className="process-card-grid">
            {capabilities.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <small className="eyebrow">The commercial question</small>
            <h2>Is there enough credible potential to justify the next stage?</h2>
            <p className="lead">
              For smaller opportunities, our existing Development Potential
              Appraisal provides a defined first step before a full architectural
              appointment.
            </p>
            <Link className="btn primary" href="/development-potential-appraisal">
              View the £750 appraisal <ArrowRight size={17} />
            </Link>
          </div>

          <div className="faq-list">
            {developerNeeds.map((item) => (
              <div key={item}>
                <CheckCircle2 /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">A clear development process</small>
            <h2>From opportunity to deliverable homes.</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
              gap: 18,
              marginTop: 34,
            }}
          >
            {process.map(([number, title, text]) => (
              <article
                key={number}
                style={{
                  borderTop: "1px solid rgba(32,35,33,.35)",
                  paddingTop: 18,
                }}
              >
                <span style={{ fontSize: 13, opacity: 0.55 }}>{number}</span>
                <h3 style={{ fontSize: 25, fontWeight: 500, margin: "14px 0 10px" }}>
                  {title}
                </h3>
                <p style={{ lineHeight: 1.65, margin: 0 }}>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#202321", color: "white", padding: "76px 24px" }}>
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <small className="eyebrow">Who we work with</small>
            <h2 style={{ color: "white" }}>
              Built for small and regional development teams.
            </h2>
            <p style={{ color: "white", opacity: 0.82, fontSize: 18, lineHeight: 1.7 }}>
              Our developer service is aimed particularly at small and
              medium-sized residential opportunities where direct senior
              architectural input, speed and clear decision-making matter.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              gap: 12,
            }}
          >
            {audiences.map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid rgba(255,255,255,.22)",
                  padding: 18,
                  color: "white",
                  minHeight: 92,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 56,
          }}
        >
          <div>
            <small className="eyebrow">House types and technical delivery</small>
            <h2>Design quality without unnecessary complexity.</h2>
            <p className="lead">
              We develop dwelling types around efficient plans, coherent external
              character and the needs of the specific site. Where appointed, the
              approved design can then be developed into coordinated technical
              information for Building Regulations and construction.
            </p>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.75 }}>
            <p>
              Depending on the project, separate specialist input may be required
              from planning, highways, drainage, ecology, arboriculture,
              structural and other consultants. We identify these requirements
              early and can coordinate the architectural information alongside
              the wider team.
            </p>
            <p>
              We do not promise a predetermined unit number or planning outcome.
              The objective is to establish the strongest realistic development
              strategy from the information available.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#dedbd2",
          padding: "84px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <small className="eyebrow">Have a site?</small>
          <h2
            style={{
              fontSize: "clamp(38px,5.5vw,66px)",
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: "-.04em",
              margin: "16px 0 22px",
            }}
          >
            Send us the opportunity before you commit.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.65 }}>
            Send the site address, sales particulars or plans and tell us what
            you are considering. We will advise whether an initial appraisal,
            capacity study or wider development appointment is the appropriate
            next step.
          </p>
          <div className="actions centered-actions" style={{ marginTop: 28 }}>
            <Link className="btn primary" href="/contact?service=residential-development">
              Discuss a site <ArrowRight size={17} />
            </Link>
            <a className="btn secondary" href={site.phoneHref}>
              <Phone size={17} /> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
