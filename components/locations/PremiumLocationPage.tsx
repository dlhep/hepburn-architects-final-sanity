import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/internal-links/Breadcrumbs";
import { ReviewQuote } from "@/components/reviews/RelevantReview";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { getReviewForLocation } from "@/lib/reviews";
import { serializeJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./premium-location.module.css";

export type PremiumLocationContent = {
  slug: string;
  eyebrow: string;
  name: string;
  h1: string;
  description: string;
  areaServed: string[];
  intro: string[];
  contextHeading: string;
  context: string[];
  planningHeading: string;
  planningAuthority: string;
  planningAuthorityUrl: string;
  planning: string[];
  extensionHeading: string;
  extensions: string[];
  newHomesHeading: string;
  newHomes: string[];
  technical: string[];
  projectExactTerms: string[];
  projectNearbyTerms: string[];
  projectIntro: string;
  nearby: Array<{ label: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  finalCopy: string;
  disclaimer: string;
  services: Array<{ title: string; href: string; description: string }>;
};

function normalise(value: string) {
  return value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9]+/g, " ").trim();
}

function projectScore(project: Project, content: PremiumLocationContent) {
  const location = normalise(project.location || "");
  const related = project.relatedLocations || [];
  if (content.projectExactTerms.some((term) => location.includes(normalise(term)))) return 400;
  if (related.includes(content.slug)) return 300;
  const nearbyIndex = content.projectNearbyTerms.findIndex((term) => location.includes(normalise(term)));
  if (nearbyIndex >= 0) return 200 - nearbyIndex;
  const residential = normalise(`${project.projectType} ${project.category} ${project.description}`);
  return /residential|extension|house|home|dwelling|remodelling/.test(residential) ? 100 : 0;
}

function selectProjects(projects: Project[], content: PremiumLocationContent) {
  return projects
    .map((project, index) => ({ project, index, score: projectScore(project, content) }))
    .filter(({ project, score }) => score > 0 && Boolean(project.slug) && Boolean(project.featuredImage))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map(({ project }) => project);
}

export async function PremiumLocationPage({ content }: { content: PremiumLocationContent }) {
  const canonical = `${site.url}/locations/${content.slug}`;
  const [allProjects, review] = await Promise.all([getProjects(), getReviewForLocation(content.slug)]);
  const projects = selectProjects(allProjects, content);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: content.h1, description: content.description, breadcrumb: { "@id": `${canonical}#breadcrumb` }, mainEntity: { "@id": `${canonical}#service` }, inLanguage: "en-GB" },
      { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: "Locations", item: `${site.url}/locations` }, { "@type": "ListItem", position: 3, name: content.name, item: canonical }] },
      { "@type": "Service", "@id": `${canonical}#service`, name: `Residential architectural services in ${content.name}`, serviceType: content.services.map((service) => service.title), areaServed: content.areaServed.map((name) => ({ "@type": "Place", name })), provider: { "@id": `${site.url}/#organization` }, url: canonical },
      { "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: content.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <section className={styles.hero}>
      <div className="shell">
        <small className="eyebrow"><MapPin size={14} /> {content.eyebrow}</small>
        <h1>{content.h1}</h1>
        <div className={styles.heroGrid}>
          <div className={styles.prose}>{content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <aside><strong>Director-led residential architecture</strong><p>Design, planning applications and Building Regulations information developed as a coordinated architectural service.</p></aside>
        </div>
        <div className="actions"><Link className="btn primary" href="/contact">Discuss Your Project <ArrowRight size={17} /></Link><Link className="btn secondary" href="/estimate">Get an Indicative Fee</Link></div>
      </div>
    </section>
    <div className="shell" style={{ paddingTop: "1.25rem" }}><Breadcrumbs items={[{ label: "Locations", href: "/locations" }, { label: content.name }]} /></div>

    <section className="section"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Local architectural context</small><h2>{content.contextHeading}</h2></div><div className={styles.prose}>{content.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

    <section className="section sand-section" id="services"><div className="shell"><div className={styles.sectionIntro}><small className="eyebrow">Services in {content.name}</small><h2>Residential design, approvals and technical information.</h2><p>Appointments are scoped around the property, the proposed work and the stage already reached. These core services can be commissioned individually or as a coordinated sequence.</p></div><div className={styles.serviceList}>{content.services.map((service, index) => <Link href={service.href} key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>

    <section className="section" id="planning"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Local planning context</small><h2>{content.planningHeading}</h2><div className={styles.authority}><span>Local planning authority</span><strong>{content.planningAuthority}</strong><a href={content.planningAuthorityUrl} target="_blank" rel="noopener noreferrer">Official planning information <ExternalLink size={14} /></a></div></div><div className={styles.prose}>{content.planning.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.disclaimer}>{content.disclaimer}</p></div></div></section>

    <section className="section dark-section"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Extensions and existing homes</small><h2>{content.extensionHeading}</h2></div><div className={styles.prose}>{content.extensions.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

    <section className="section"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Larger residential projects</small><h2>{content.newHomesHeading}</h2></div><div className={styles.prose}>{content.newHomes.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

    <section className="section sand-section" id="building-regulations"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Building Regulations</small><h2>From an approved concept to coordinated technical information.</h2></div><div className={styles.prose}>{content.technical.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

    {projects.length > 0 ? <section className="section dark-section" id="projects"><div className="shell"><div className={styles.sectionIntro}><small className="eyebrow">Published projects</small><h2>Relevant residential work.</h2><p>{content.projectIntro}</p></div><div className={styles.projectGrid}>{projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><Image src={projectImageUrl(project.featuredImage, 1000)} alt={projectImageAlt(project)} width={1000} height={680} sizes="(max-width: 720px) 100vw, 33vw" /><div><small>{project.location}</small><h3>{project.title}</h3><p>{project.description}</p><span>View project <ArrowRight size={15} /></span></div></Link>)}</div><div className="actions"><Link className="btn light-btn" href="/projects">View all projects</Link></div></div></section> : null}

    {review ? <ReviewQuote review={review} compact /> : null}

    <section className="section"><div className={`shell ${styles.faqGrid}`}><div><small className="eyebrow">Frequently asked questions</small><h2>Architectural and planning questions in {content.name}.</h2><p>These answers are general guidance. The position for a particular project depends on the property, proposal, planning history and current policy.</p></div><div className={styles.faqList}>{content.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="section dark-section"><div className={`shell ${styles.nearby}`}><div><small className="eyebrow">Nearby areas</small><h2>Residential architecture across the surrounding area.</h2></div><nav aria-label={`Locations near ${content.name}`}>{content.nearby.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowRight size={14} /></Link>)}</nav></div></section>

    <section className="section"><div className={`shell ${styles.cta}`}><small className="eyebrow">Start with the property</small><h2>Planning a project in {content.name}?</h2><p>{content.finalCopy}</p><div className="actions"><Link className="btn primary" href="/contact">Discuss Your Project <ArrowRight size={17} /></Link><Link className="btn secondary" href="/estimate">Get an Indicative Fee</Link></div></div></section>
  </>;
}
