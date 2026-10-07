import { LocationHero, LocationServices, LocationWork, LocationContact, LocationContactDetails, LocationFeedback, selectLocationWork } from "@/components/locations/LocationLandingSections";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/internal-links/Breadcrumbs";
import { ReviewQuote } from "@/components/reviews/RelevantReview";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { getReviewForLocation } from "@/lib/reviews";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildFaqSchema, buildGraph, buildPlaceSchema, buildServiceSchema, buildWebPageSchema, breadcrumbId, serviceId } from "@/lib/structured-data";
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
  const schema = buildGraph(
    buildWebPageSchema({ url: canonical, name: content.h1, description: content.description, breadcrumb: breadcrumbId(canonical), mainEntity: serviceId(canonical) }),
    buildServiceSchema({ url: canonical, name: `Residential architectural services in ${content.name}`, description: content.description, serviceType: content.services.map((service) => service.title).join(", "), areas: content.areaServed.map((name) => ({ name })), studio: "birmingham" }),
    buildPlaceSchema(canonical, content.name),
    buildBreadcrumbSchema(canonical, [{ name: "Home", url: `${site.url}/` }, { name: "Locations", url: `${site.url}/locations` }, { name: content.name, url: canonical }]),
    buildFaqSchema(canonical, content.faqs),
  );

  return <>
    <StructuredData data={schema} />
    <LocationHero name={content.name} title={content.h1} intro={content.intro[0]} project={projects[0]} fallbackImage="/images/homepage-birmingham-brick-residence.webp" studio="Birmingham studio · Izabella House, Regent Place" />
    <LocationServices name={content.name} services={content.services} />
    <LocationWork projects={projects} />
    {content.intro.slice(1).map((paragraph) => <div className="shell" key={paragraph}><p className="lead">{paragraph}</p></div>)}
    <div className="shell" style={{ paddingTop: "1.25rem" }}><Breadcrumbs items={[{ label: "Locations", href: "/locations" }, { label: content.name }]} /></div>

    <section className="section"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Local architectural context</small><h2>{content.contextHeading}</h2></div><div className={styles.prose}>{content.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>



    <section className="section" id="planning"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Local planning context</small><h2>{content.planningHeading}</h2><div className={styles.authority}><span>Local planning authority</span><strong>{content.planningAuthority}</strong><a href={content.planningAuthorityUrl} target="_blank" rel="noopener noreferrer">Official planning information <ExternalLink size={14} /></a></div></div><div className={styles.prose}>{content.planning.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.disclaimer}>{content.disclaimer}</p></div></div></section>

    <section className="section dark-section"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Extensions and existing homes</small><h2>{content.extensionHeading}</h2></div><div className={styles.prose}>{content.extensions.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

    <section className="section"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Larger residential projects</small><h2>{content.newHomesHeading}</h2></div><div className={styles.prose}>{content.newHomes.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

    <section className="section sand-section" id="building-regulations"><div className={`shell ${styles.split}`}><div><small className="eyebrow">Building Regulations</small><h2>From an approved concept to coordinated technical information.</h2></div><div className={styles.prose}>{content.technical.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>



    {review ? <ReviewQuote review={review} compact /> : <LocationFeedback href={site.googleBusiness} />}

    <section className="section"><div className={`shell ${styles.faqGrid}`}><div><small className="eyebrow">Frequently asked questions</small><h2>Architectural and planning questions in {content.name}.</h2><p>These answers are general guidance. The position for a particular project depends on the property, proposal, planning history and current policy.</p></div><div className={styles.faqList}>{content.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="section dark-section"><div className={`shell ${styles.nearby}`}><div><small className="eyebrow">Nearby areas</small><h2>Residential architecture across the surrounding area.</h2></div><nav aria-label={`Locations near ${content.name}`}>{content.nearby.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowRight size={14} /></Link>)}</nav></div></section>

    <LocationContact name={content.name} studio="Birmingham studio · Izabella House, Regent Place" />
  </>;
}
