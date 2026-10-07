import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./location-landing.module.css";

type LocationProject = Project & { isTestExample?: boolean };
type Service = { title: string; description: string; href: string };

export function selectLocationWork(projects: LocationProject[], terms: string[]) {
  return projects.filter((project) => !project.isTestExample && project.featuredImage && project.slug)
    .map((project, index) => ({ project, index, score: (terms.some((term) => project.location.toLowerCase().includes(term.toLowerCase())) ? 10 : 0) + (project.isConcept ? 0 : 3) + (/extension|house|home|dwelling|loft|renovation/i.test(`${project.projectType} ${project.title}`) ? 2 : 0) }))
    .sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 3).map(({ project }) => project);
}

export function LocationHero({ name, title, intro, project, fallbackImage, studio, enquiryId = "project-enquiry" }: {
  name: string; title: string; intro: string; project?: LocationProject; fallbackImage: string; studio: string; enquiryId?: string;
}) {
  return <>
    <section className={styles.hero} aria-label={`Architectural services in ${name}`}>
      <Image className={styles.heroImage} src={project ? projectImageUrl(project.featuredImage, 2200) : fallbackImage} alt={project ? projectImageAlt(project) : "Residential design by Hepburn Architects"} fill priority sizes="100vw" />
      <div className={styles.shade} />
      <div className={`shell ${styles.heroContent}`}>
        <small className={styles.eyebrow}>HEPBURN ARCHITECTS · {name}</small>
        <h1>{title}</h1><p>{intro}</p>
        <div className={styles.actions}><a className={styles.primary} href={`#${enquiryId}`}>Discuss your project <ArrowRight size={17} /></a><Link className={styles.secondary} href="/estimate">Get an indicative fee</Link></div>
        <div className={styles.heroFoot}><span>Work directly with David Hepburn<br /><small>{studio}</small></span>{project ? <Link href={`/projects/${project.slug}`}>{project.location} · {project.isConcept ? project.conceptLabel || "Concept design" : project.projectType || "Residential project"}<ArrowUpRight size={18} /></Link> : <Link href="/projects">Explore our residential work <ArrowUpRight size={18} /></Link>}</div>
      </div>
    </section>
    <div className={styles.introBar}><div className="shell"><span>Thoughtful design. A clear way forward.</span><a href={site.phoneHref}><Phone size={15} />{site.phone}</a><a href={`mailto:${site.email}`}><Mail size={15} />Email David</a></div></div>
  </>;
}

export function LocationServices({ name, services }: { name: string; services: Service[] }) {
  return <section className={styles.services} id="location-services"><div className="shell"><div className={styles.heading}><div><small className={styles.eyebrow}>DESIGNED AROUND YOUR HOME</small><h2>Architectural services<br />in {name}.</h2></div><p>From the first idea to planning and technical drawings, choose the support your project needs. Each stage has a clear scope and fee.</p></div><div className={styles.serviceGrid}>{services.map((service, index) => <Link key={`${service.href}-${service.title}`} href={service.href}><span className={styles.number}>{String(index + 1).padStart(2, "0")}<ArrowUpRight size={20} /></span><h3>{service.title}</h3><p>{service.description}</p><span className={styles.readMore}>Explore this service <ArrowRight size={15} /></span></Link>)}</div></div></section>;
}

export function LocationWork({ projects }: { projects: LocationProject[] }) {
  if (!projects.length) return null;
  return <section className={styles.work} id="location-work"><div className="shell"><div className={styles.heading}><div><small className={styles.eyebrow}>A FEEL FOR OUR WORK</small><h2>Ideas brought into focus.</h2></div><p>Selected projects and design studies from the practice. Explore the brief, design and thinking behind each proposal.</p></div><div className={styles.projectGrid}>{projects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`}><div className={styles.projectImage}><Image src={projectImageUrl(project.featuredImage, 1000)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />{project.isConcept ? <span>{project.conceptLabel || "Concept design"}</span> : null}</div><small>{project.location}</small><h3>{project.title}<ArrowUpRight size={20} /></h3><p>{project.description}</p></Link>)}</div><Link className={styles.textLink} href="/projects">Explore all projects <ArrowRight size={16} /></Link></div></section>;
}

export function LocationContactDetails({ studio }: { studio: string }) {
  return <div className={styles.contactDetails}><a href={site.phoneHref}><Phone size={18} /><span>{site.phone}</span></a><a href={`mailto:${site.email}`}><Mail size={18} /><span>{site.email}</span></a><p>{studio}<br />Site visits and meetings by arrangement.</p></div>;
}

export function LocationContact({ name, studio, id = "project-enquiry" }: { name: string; studio: string; id?: string }) {
  return <section className={styles.contact} id={id}><div className={`shell ${styles.contactGrid}`}><div><small className={styles.eyebrow}>LET’S TALK ABOUT YOUR HOME</small><h2>A good project starts<br />with a conversation.</h2><p>Tell David about your property in {name}, what you want to change and what matters most. We will help you identify a useful first step.</p><LocationContactDetails studio={studio} /><Link className={styles.textLink} href="/estimate">Get an indicative architectural fee <ArrowRight size={16} /></Link></div><div className={styles.form}><ContactForm source={`Location landing page: ${name}`} /></div></div></section>;
}

export function LocationFeedback({ href }: { href: string }) {
  return <section className={styles.feedback}><div className="shell"><div><small className={styles.eyebrow}>INDEPENDENT CLIENT FEEDBACK</small><h2>Get to know the practice.</h2><p>Read clients’ own accounts of working with Hepburn Architects.</p></div><a className={styles.primary} href={href} target="_blank" rel="noopener noreferrer">Read client reviews <ArrowUpRight size={17} /></a></div></section>;
}
