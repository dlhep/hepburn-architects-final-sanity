import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  DraftingCompass,
  Handshake,
  House,
  Layers3,
  MapPin,
  Ruler,
  ShieldCheck,
  UserRound,
  UsersRound,
  Workflow,
} from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Hepburn Architects | Residential Architecture Studio",
  description:
    "Meet Hepburn Architects, a director-led residential architecture studio supported by trusted independent consultants across planning, engineering and technical design.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Hepburn Architects | Residential Architecture Studio",
    description:
      "A director-led residential architecture studio supported by a trusted collaborative network.",
    url: "/about",
    images: [
      {
        url: "/images/homepage-hero.png",
        width: 1200,
        height: 1500,
        alt: "Residential architecture by Hepburn Architects",
      },
    ],
  },
};

const practiceStrengths = [
  {
    icon: House,
    title: "Residential specialists",
    text: "Extensions, loft conversions, new homes, HMOs, conversions and small residential developments.",
  },
  {
    icon: Compass,
    title: "Planning-aware design",
    text: "Design decisions are developed alongside the approval strategy, site constraints and local policy context.",
  },
  {
    icon: DraftingCompass,
    title: "Technical continuity",
    text: "Concept design can be carried forward into coordinated Building Regulations information and specialist input.",
  },
];

const collaborators = [
  {
    initials: "SE",
    role: "Structural Engineer",
    company: "Company details to be added",
    description:
      "Structural design, calculations and coordinated advice for alterations, extensions and new-build projects.",
  },
  {
    initials: "PC",
    role: "Planning Consultant",
    company: "Company details to be added",
    description:
      "Strategic planning advice for complex applications, appeals, policy matters and development opportunities.",
  },
  {
    initials: "ET",
    role: "Energy & Sustainability Consultant",
    company: "Company details to be added",
    description:
      "Energy assessment, SAP advice, overheating input and practical low-energy design support.",
  },
  {
    initials: "DE",
    role: "Drainage & Civil Engineer",
    company: "Company details to be added",
    description:
      "Drainage strategy, levels, flood-risk input and civil engineering coordination where required.",
  },
  {
    initials: "EA",
    role: "Ecology & Arboricultural Consultant",
    company: "Company details to be added",
    description:
      "Ecology, protected species, tree constraints and specialist site evidence for planning submissions.",
  },
  {
    initials: "ID",
    role: "Interior & Specialist Designer",
    company: "Company details to be added",
    description:
      "Interior planning, kitchens, finishes, lighting and specialist design input tailored to the project brief.",
  },
];

const values = [
  {
    number: "01",
    title: "Listen before drawing",
    text: "The brief begins with the client, the property and the reasons behind the project.",
  },
  {
    number: "02",
    title: "Resolve risk early",
    text: "Planning, access, technical constraints and consultant requirements are considered before avoidable work begins.",
  },
  {
    number: "03",
    title: "Design with purpose",
    text: "Space, light, circulation, privacy, value and buildability take priority over design gestures without a clear benefit.",
  },
  {
    number: "04",
    title: "Build the right team",
    text: "Independent specialists are brought into the process when their expertise adds genuine value.",
  },
];

const stages = [
  {
    number: "01",
    title: "Consultation and appraisal",
    text: "Understand the property, project brief, likely constraints, budget expectations and most appropriate next step.",
  },
  {
    number: "02",
    title: "Survey and feasibility",
    text: "Record the existing building and test realistic options before committing to a developed proposal.",
  },
  {
    number: "03",
    title: "Concept design",
    text: "Develop layout, form, appearance and key decisions around light, circulation, privacy and value.",
  },
  {
    number: "04",
    title: "Planning",
    text: "Prepare the architectural submission and coordinate the approval strategy and supporting information.",
  },
  {
    number: "05",
    title: "Technical design",
    text: "Develop coordinated drawings and information for Building Regulations and specialist consultant input.",
  },
  {
    number: "06",
    title: "Construction preparation",
    text: "Support a clearer handover into pricing and construction, with the scope agreed for each appointment.",
  },
];

const professionalStandards = [
  "ARB-registered architect",
  "RIBA Chartered Practice",
  "Professional indemnity insurance",
  "Clear written fee proposals",
  "Defined project stages and outputs",
  "Direct access to the founding director",
];

export default function AboutPage() {
  return (
    <>
      <section className="studio-v2-hero">
        <div className="shell studio-v2-hero-grid">
          <div className="studio-v2-hero-copy">
            <small className="eyebrow">The studio</small>
            <h1>A residential architecture practice built around direct expertise.</h1>
            <p className="lead">
              Hepburn Architects is a director-led studio working with homeowners,
              developers and property owners across Birmingham, the West Midlands,
              Teesside and the wider UK.
            </p>
            <p>
              We combine architectural design, planning strategy and technical
              coordination within one clear process. Where additional expertise is
              required, a trusted network of independent consultants is assembled
              around the needs of the project.
            </p>
            <div className="studio-v2-hero-actions">
              <a
                className="btn primary"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a consultation <ArrowRight size={18} />
              </a>
              <Link className="btn secondary" href="/projects">
                View selected work
              </Link>
            </div>
          </div>

          <div className="studio-v2-founder-visual">
            <Image
              src="https://www.hepburnarchitects.com/wp-content/uploads/2026/06/David-Hepburn.png"
              alt="David Hepburn, founding director of Hepburn Architects"
              fill
              priority
              sizes="(max-width: 950px) 100vw, 44vw"
            />
            <div className="studio-v2-founder-caption">
              <small>Founding Director</small>
              <strong>David Hepburn</strong>
              <span>Architect · ARB · RIBA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="studio-v2-practice-strip" aria-label="Practice overview">
        <div className="shell">
          <div>
            <strong>Director-led</strong>
            <span>One consistent architectural lead</span>
          </div>
          <div>
            <strong>Two studios</strong>
            <span>Birmingham and Nunthorpe</span>
          </div>
          <div>
            <strong>Residential focus</strong>
            <span>Homes, conversions and development</span>
          </div>
          <div>
            <strong>Collaborative delivery</strong>
            <span>Specialists selected around the brief</span>
          </div>
        </div>
      </section>

      <section className="section studio-v2-director-section">
        <div className="shell studio-v2-director-grid">
          <div>
            <small className="eyebrow">Meet the founding director</small>
            <h2>Personal architectural guidance without the handovers.</h2>
          </div>
          <div className="studio-v2-director-copy">
            <p className="lead">
              David Hepburn leads the architectural design, planning and technical
              coordination of every Hepburn Architects commission.
            </p>
            <p>
              His experience covers house extensions, loft conversions, new homes,
              HMOs, residential conversions and small development sites. The
              approach is deliberately practical: understand what the property can
              support, identify the strongest approval route and develop design
              decisions that improve value, light, usability and long-term
              performance.
            </p>
            <p>
              Clients retain direct access to the person responsible for the
              architectural work. Independent specialists are coordinated as part
              of the wider project team rather than replacing that direct
              relationship.
            </p>
            <div className="studio-v2-director-links">
              <a href={site.phoneHref}>Call {site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="studio-v2-strengths-section">
        <div className="shell studio-v2-section-heading">
          <div>
            <small className="eyebrow">Practice expertise</small>
            <h2>Design, approval strategy and technical thinking developed together.</h2>
          </div>
          <p>
            The studio provides a coordinated route from early appraisal to
            Building Regulations, with specialist input introduced where the
            project genuinely requires it.
          </p>
        </div>
        <div className="shell studio-v2-strengths-grid">
          {practiceStrengths.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <div>
                <span>0{index + 1}</span>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section studio-v2-collaborators-section">
        <div className="shell studio-v2-section-heading studio-v2-section-heading-light">
          <div>
            <small className="eyebrow">Collaborative team</small>
            <h2>A wider project team assembled around each commission.</h2>
          </div>
          <p>
            Hepburn Architects works alongside trusted independent practices and
            specialist consultants. The profiles below are placeholders ready to
            be replaced with real collaborators, company details, qualifications,
            photographs and links.
          </p>
        </div>

        <div className="shell studio-v2-collaborator-grid">
          {collaborators.map((person) => (
            <article className="studio-v2-collaborator-card" key={person.role}>
              <div className="studio-v2-collaborator-photo" aria-hidden="true">
                <UserRound />
                <span>{person.initials}</span>
              </div>
              <div className="studio-v2-collaborator-content">
                <small>Independent collaborator</small>
                <h3>{person.role}</h3>
                <strong>{person.company}</strong>
                <p>{person.description}</p>
                <span className="studio-v2-placeholder-link">
                  Profile details coming soon
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="shell studio-v2-team-note">
          <UsersRound />
          <div>
            <strong>A flexible team, not a one-size-fits-all appointment</strong>
            <p>
              Consultants remain independent businesses and are appointed or
              engaged according to the needs of each project. This gives clients
              access to the right expertise without carrying unnecessary
              consultant scope.
            </p>
          </div>
        </div>
      </section>

      <section className="section studio-v2-values-section">
        <div className="shell studio-v2-values-grid">
          <div className="studio-v2-values-intro">
            <small className="eyebrow">How we think</small>
            <h2>Clear thinking before unnecessary complexity.</h2>
            <p>
              Good residential architecture should be ambitious enough to improve
              the property and realistic enough to obtain approval, coordinate
              properly and move toward construction.
            </p>
          </div>
          <div className="studio-v2-value-list">
            {values.map((value) => (
              <article key={value.number}>
                <span>{value.number}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section studio-v2-process-section">
        <div className="shell studio-v2-section-heading">
          <div>
            <small className="eyebrow">How an appointment works</small>
            <h2>A clear route from first conversation to construction preparation.</h2>
          </div>
          <p>
            Services are agreed in defined stages, allowing the appointment to
            match the project rather than forcing every client into the same scope.
          </p>
        </div>

        <div className="shell studio-v2-process-grid">
          {stages.map((stage) => (
            <article key={stage.number}>
              <span>{stage.number}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="shell studio-v2-scope-note">
          <Workflow />
          <p>
            Hepburn Architects typically supports projects through survey,
            feasibility, planning and technical design. Construction-stage or
            site-support services are agreed separately where appropriate; the
            practice does not present routine day-to-day site management as part
            of every appointment.
          </p>
        </div>
      </section>

      <section className="studio-v2-standards-section">
        <div className="shell studio-v2-standards-grid">
          <div>
            <small className="eyebrow">Professional reassurance</small>
            <h2>Independent advice supported by recognised professional standards.</h2>
            <p>
              Clear appointments, defined outputs and professional accountability
              are central to how the studio works.
            </p>
          </div>
          <ul>
            {professionalStandards.map((standard) => (
              <li key={standard}>
                <BadgeCheck />
                <span>{standard}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section studio-v2-studios-section">
        <div className="shell studio-v2-section-heading">
          <div>
            <small className="eyebrow">Our studios</small>
            <h2>Regional knowledge with a wider project reach.</h2>
          </div>
          <p>
            The Birmingham studio leads work across Birmingham, Solihull and the
            West Midlands. The Nunthorpe studio supports Teesside and North East
            enquiries through the dedicated North East website.
          </p>
        </div>

        <div className="shell studio-v2-studio-cards">
          <article>
            <div className="studio-v2-studio-card-icon">
              <Building2 />
            </div>
            <small>West Midlands</small>
            <h3>{site.offices.birmingham.name}</h3>
            <address>
              {site.offices.birmingham.streetAddress}<br />
              {site.offices.birmingham.addressLocality}<br />
              {site.offices.birmingham.postalCode}
            </address>
            <div>
              <a
                href={site.offices.birmingham.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View map <ArrowUpRight size={17} />
              </a>
              <Link href="/locations/birmingham-architects">
                Birmingham architects <ArrowRight size={17} />
              </Link>
            </div>
          </article>

          <article>
            <div className="studio-v2-studio-card-icon">
              <MapPin />
            </div>
            <small>Teesside and North East</small>
            <h3>{site.offices.nunthorpe.name}</h3>
            <address>
              {site.offices.nunthorpe.streetAddress}<br />
              {site.offices.nunthorpe.addressLocality}<br />
              {site.offices.nunthorpe.postalTown}<br />
              {site.offices.nunthorpe.postalCode}
            </address>
            <div>
              <a
                href={site.offices.nunthorpe.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View map <ArrowUpRight size={17} />
              </a>
              <a
                href="https://www.hepburnarchitects.com/architects-middlesbrough"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit North East website <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell final-cta">
          <small className="eyebrow">Start with a clear conversation</small>
          <h2>Bring the right architectural and specialist team around your project.</h2>
          <p>
            Discuss the property, brief and likely approval route directly with
            David before committing to the next stage.
          </p>
          <div className="actions centered-actions">
            <a
              className="btn primary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a consultation
            </a>
            <Link className="btn light-btn" href="/contact">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
