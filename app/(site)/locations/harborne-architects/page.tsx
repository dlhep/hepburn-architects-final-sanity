import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/internal-links/Breadcrumbs";
import { ReviewQuote } from "@/components/reviews/RelevantReview";
import { StructuredData } from "@/components/StructuredData";
import { getReviewForService } from "@/lib/reviews";
import { site } from "@/lib/site";
import {
  breadcrumbId,
  buildBreadcrumbSchema,
  buildBusinessLocationSchema,
  buildFaqSchema,
  buildGraph,
  buildServiceSchema,
  buildWebPageSchema,
  serviceId,
} from "@/lib/structured-data";
import styles from "./page.module.css";

const path = "/locations/harborne-architects";
const canonical = `${site.url}${path}`;
const description =
  "RIBA Chartered residential architects in Harborne, Birmingham for house extensions, loft conversions, remodelling, planning and Building Regulations.";

export const metadata: Metadata = {
  title: "Residential Architects Harborne, Birmingham",
  description,
  alternates: { canonical },
  openGraph: {
    title: "Residential Architects in Harborne, Birmingham | Hepburn Architects",
    description,
    url: canonical,
    siteName: site.name,
    type: "website",
    images: [{ url: "/images/selected-work-2.webp", width: 1448, height: 1086, alt: "Contemporary house extension in Harborne" }],
  },
  twitter: { card: "summary_large_image", title: "Residential Architects in Harborne, Birmingham", description, images: ["/images/selected-work-2.webp"] },
};

const services = [
  {
    number: "01",
    title: "Improve your home",
    body: "Extensions, loft conversions and whole-house remodelling designed around daylight, daily life and the character of the original property.",
    links: [
      ["House extensions", "/services/house-extensions"],
      ["Loft conversions", "/services/loft-conversions"],
    ],
  },
  {
    number: "02",
    title: "Secure the right approval",
    body: "A planning-led design process that checks property history, conservation constraints, neighbour amenity and the most proportionate application route.",
    links: [
      ["Planning applications", "/services/planning-applications"],
      ["Planning guidance", "/knowledge-centre/planning-permission"],
    ],
  },
  {
    number: "03",
    title: "Prepare to build",
    body: "Coordinated technical drawings for Building Regulations, structural input and a clearer conversation with Building Control and contractors.",
    links: [
      ["Building Regulations", "/services/building-regulations"],
      ["Get an indicative fee", "/estimate"],
    ],
  },
] as const;

const process = [
  ["01", "Tell us about the property", "Share the address, what is not working and what you hope the project will achieve."],
  ["02", "Review the opportunities", "We check the property, planning history, likely constraints and the services proportionate to the brief."],
  ["03", "Design with clarity", "Options are tested for space, appearance, approval risk, technical implications and realistic priorities."],
  ["04", "Move through approvals", "We prepare the agreed planning and technical information and coordinate the specialist input the project needs."],
] as const;

const planningPoints = [
  ["Harborne conservation areas", "Harborne Old Village, Greenfield Road and Moor Pool each have a distinct architectural and landscape character. Materials, roof form, boundaries, trees and the visibility of alterations can all matter."],
  ["Article 4 and original features", "Greenfield Road and Moor Pool are subject to Article 4 controls. Work that might normally be permitted development can require planning permission, so the exact address should be checked before design decisions are fixed."],
  ["Extensions and neighbours", "Birmingham City Council will consider scale, daylight, privacy, outlook and how an addition relates to the original house and adjoining properties. A larger footprint is not automatically a better result."],
] as const;

const faqs = [
  ["Do I need planning permission for an extension in Harborne?", "Not always. Some house extensions may use permitted development rights, but the dimensions, position, original property, previous additions, planning conditions, conservation status and any Article 4 Direction must be checked first."],
  ["Which parts of Harborne have additional heritage controls?", "Harborne Old Village, Greenfield Road and Moor Pool are conservation areas. Greenfield Road and Moor Pool also have Article 4 controls that can require permission for certain external alterations."],
  ["Can you design a contemporary extension to a period home?", "Yes. Contemporary design can work well where its scale, materials, proportions and junctions respond carefully to the existing house. The aim is a confident addition that improves the home without competing with its character."],
  ["Can a Harborne loft conversion use permitted development?", "Many loft conversions can use permitted development rights, but roof-volume limits, dormer position, designated land, the original roof and previous additions must be checked. Planning feasibility and technical feasibility should be considered together."],
  ["Can Hepburn Architects handle planning and Building Regulations?", "Yes. An appointment can cover measured survey, feasibility, design, planning drawings and submission, followed by a coordinated Building Regulations package and relevant consultant input."],
  ["How much does an architect cost in Harborne?", "Fees depend on the property, project type, floor area, planning risk and services required. The online calculator provides an early indication, followed by a written project-specific proposal confirming scope, fees and exclusions."],
  ["Will I work directly with an architect?", "Yes. David Hepburn remains directly involved in the brief, design and key project decisions, providing continuity without the work being handed between different junior team members."],
] as const;

const schema = buildGraph(
  buildWebPageSchema({ url: canonical, name: "Residential Architects in Harborne, Birmingham", description, breadcrumb: breadcrumbId(canonical), mainEntity: serviceId(canonical), primaryImage: `${site.url}/images/selected-work-2.webp` }),
  buildServiceSchema({ url: canonical, name: "Residential architectural services in Harborne", description, serviceType: "House extensions, loft conversions, planning applications and Building Regulations", areas: [{ name: "Harborne" }, { name: "Birmingham" }, { name: "West Midlands" }], studio: "birmingham", image: `${site.url}/images/selected-work-2.webp` }),
  buildBusinessLocationSchema("birmingham"),
  buildBreadcrumbSchema(canonical, [{ name: "Home", url: `${site.url}/` }, { name: "Locations", url: `${site.url}/locations` }, { name: "Harborne", url: canonical }]),
  buildFaqSchema(canonical, faqs.map(([question, answer]) => ({ question, answer }))),
);

export default async function HarborneArchitectsPage() {
  const review = await getReviewForService("house-extensions", "harborne-architects");

  return (
    <>
      <StructuredData data={schema} />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/selected-work-2.webp"
          alt="Contemporary extension to a period family home in Harborne"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={`shell ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <small className="eyebrow"><MapPin size={14} /> Harborne residential architecture</small>
            <h1>Residential Architects in Harborne, Birmingham.</h1>
            <p>Thoughtful design, planning and Building Regulations expertise for extensions, loft conversions and homes that need to work better.</p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={18} /></Link>
              <a className={`btn ${styles.heroSecondary}`} href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} /> Book a free consultation</a>
            </div>
            <p className={styles.heroNote}><CheckCircle2 size={16} /> Share your postcode and project idea—David will advise on the most useful next step.</p>
          </div>
          <Link className={styles.projectBadge} href="/projects/house-extension-in-harborne-birmingham">
            <span>Featured local project</span>
            <strong>House extension in Harborne</strong>
            <span>View the case study <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      <section className={styles.trust} aria-label="Practice credentials">
        <div className="shell">
          <div><BadgeCheck aria-hidden="true" /><strong>ARB Registered architect</strong></div>
          <div><ShieldCheck aria-hidden="true" /><strong>RIBA Chartered Practice</strong></div>
          <div><UserRoundCheck aria-hidden="true" /><strong>Work directly with David</strong></div>
          <div><Building2 aria-hidden="true" /><strong>Planning-aware design</strong></div>
          <div><ClipboardCheck aria-hidden="true" /><strong>Technical expertise</strong></div>
        </div>
      </section>

      <div className={`shell ${styles.breadcrumb}`}><Breadcrumbs items={[{ label: "Locations", href: "/locations" }, { label: "Harborne" }]} /></div>

      <section className="section">
        <div className={`shell ${styles.introGrid}`}>
          <div>
            <small className="eyebrow">Make more of your home</small>
            <h2>More space is useful. A better home is the real goal.</h2>
          </div>
          <div className={styles.prose}>
            <p className="lead">The best residential projects do more than add square metres. They make everyday life calmer, bring light deeper into the plan and create a natural connection between the existing house and the garden.</p>
            <p>Harborne&apos;s terraces, period villas, inter-war houses and mature garden suburbs each need a different response. We start with the way the property is built, the way you want to live and the planning context that will shape a realistic proposal.</p>
            <p>Hepburn Architects combines creative residential design with planning strategy and technical coordination. That means the proposal is considered as a home, an application and a buildable project—not as three disconnected stages.</p>
            <div className={styles.inlineActions}><Link href="/estimate">See likely architectural fees <ArrowRight size={16} /></Link><a href="#project-enquiry">Tell us about your property <ArrowRight size={16} /></a></div>
          </div>
        </div>
      </section>

      <section className={styles.featureProject}>
        <div className={`shell ${styles.featureGrid}`}>
          <Link className={styles.featureImage} href="/projects/house-extension-in-harborne-birmingham">
            <Image src="/images/selected-work-2.webp" alt="Contemporary rear extension to a period house in Harborne" fill sizes="(max-width: 900px) 100vw, 62vw" />
          </Link>
          <div className={styles.featureCopy}>
            <small className="eyebrow">Harborne project experience</small>
            <h2>A contemporary addition that lets the original house remain legible.</h2>
            <p>The dark, precise extension creates generous glazing and a stronger relationship with the garden while the masonry form of the existing home remains visually dominant.</p>
            <dl>
              <div><dt>Location</dt><dd>Harborne, Birmingham</dd></div>
              <div><dt>Project</dt><dd>House extension and renovation</dd></div>
            </dl>
            <Link className="btn secondary" href="/projects/house-extension-in-harborne-birmingham">Explore the full project <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell">
          <div className={styles.sectionHeading}><small className="eyebrow">How we can help</small><h2>Three clear routes through your project.</h2><p>Choose the stage you need now, or appoint us for a coordinated route from the initial property review through planning and technical design.</p></div>
          <div className={styles.services}>
            {services.map((service) => (
              <article key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <nav aria-label={`${service.title} links`}>
                  {service.links.map(([label, href]) => <Link href={href} key={href}>{label} <ArrowRight size={15} /></Link>)}
                </nav>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`shell ${styles.directorGrid}`}>
          <div className={styles.directorImage}><Image src="/images/david-hepburn-studio.jpg" alt="David Hepburn, founding director of Hepburn Architects" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
          <div className={styles.directorCopy}>
            <small className="eyebrow">A director-led practice</small>
            <h2>Work directly with the architect responsible for your project.</h2>
            <p className="lead">David remains involved from the first conversation through design, planning and technical decisions.</p>
            <p>You are not passed between departments or left explaining the brief again to someone new. The continuity matters: the early priorities, compromises and opportunities remain visible as the project becomes more detailed.</p>
            <ul><li><CheckCircle2 /> Direct and practical communication</li><li><CheckCircle2 /> Residential design and planning experience</li><li><CheckCircle2 /> Clear, stage-based written fee proposals</li></ul>
            <div className="actions"><Link className="btn primary" href="/about">Meet David</Link><a className="btn secondary" href="#project-enquiry">Discuss your home</a></div>
          </div>
        </div>
      </section>

      <section className={`section dark-section ${styles.planning}`}>
        <div className="shell">
          <div className={styles.sectionHeading}><small className="eyebrow">Planning in Harborne</small><h2>Local knowledge built into the design from the start.</h2><p>Early checks are particularly important around Harborne&apos;s conservation areas, Article 4 controls, mature trees and established residential character.</p></div>
          <div className={styles.planningGrid}>{planningPoints.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className={styles.planningLinks}><a href="https://www.birmingham.gov.uk/info/20055/conservation_areas/13/birminghams_conservation_areas/2" target="_blank" rel="noopener noreferrer">Birmingham conservation areas <ArrowRight size={15} /></a><Link href="/journal/house-extension-planning-permission-birmingham-2026-guide">Birmingham extension planning guide <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className={styles.sectionHeading}><small className="eyebrow">A straightforward process</small><h2>Know what happens next.</h2><p>A residential project can feel complicated when design, planning and technical decisions overlap. We organise the work into clear stages with decisions made at sensible points.</p></div>
          <div className={styles.process}>{process.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className={styles.processCta}><div><strong>Want an early indication before we speak?</strong><p>Use the fee calculator to select your project type and the services you are considering.</p></div><Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      {review ? <ReviewQuote review={review} serviceSlug="house-extensions" /> : null}

      <section className="section sand-section">
        <div className={`shell ${styles.faqGrid}`}>
          <div><small className="eyebrow">Common questions</small><h2>Planning a residential project in Harborne.</h2><p>These answers are general guidance. The exact property, planning history and proposal can change the correct route.</p></div>
          <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={`section dark-section ${styles.enquiry}`} id="project-enquiry">
        <div className={`shell ${styles.enquiryGrid}`}>
          <div>
            <small className="eyebrow">Start with your property</small>
            <h2>Tell us what you would like your Harborne home to become.</h2>
            <p className="lead">Share the address, your ideas and anything you already know about the property. David will review the enquiry and recommend a proportionate next step.</p>
            <ul><li><CheckCircle2 /> No obligation to appoint</li><li><CheckCircle2 /> Direct response from the practice</li><li><CheckCircle2 /> Clear advice on the likely service and approval route</li></ul>
            <div className="actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><a className="btn light-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a></div>
          </div>
          <div className={styles.formPanel}><ContactForm source="Harborne residential architect landing page" /></div>
        </div>
      </section>

      <section className="section">
        <div className={`shell ${styles.localFooter}`}>
          <div><small className="eyebrow">Birmingham studio</small><h2>Local residential expertise across west Birmingham.</h2><p>Hepburn Architects supports projects in Harborne, Edgbaston, Quinton, Selly Oak, Moseley, Bournville and surrounding neighbourhoods from its Birmingham studio.</p></div>
          <div className={styles.areaLinks}><Link href="/locations/birmingham-architects">Birmingham</Link><Link href="/locations/edgbaston-architects">Edgbaston</Link><Link href="/locations/moseley-architects">Moseley</Link><Link href="/locations/bournville-architects">Bournville</Link><Link href="/locations/selly-oak-architects">Selly Oak</Link></div>
        </div>
      </section>
    </>
  );
}
