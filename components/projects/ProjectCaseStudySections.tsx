import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Project, ProjectChallenge, ProjectDrawing, ProjectHighlight, ProjectStage, ProjectTeamMember, ProjectTestimonial, SanityProjectImage } from "@/lib/projects";
import { projectImageUrl } from "@/lib/projects";
import styles from "./ProjectCaseStudy.module.css";

type TextBlock = { children?: Array<{ text?: string }> };
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h3>{children}</h3>,
    h3: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
};

function hasBlocks(value?: TextBlock[]) { return Boolean(value?.length); }

export function ProjectOverview({ project }: { project: Project }) {
  return <section className={`section project-overview ${styles.overview}`}><div className="shell"><div className={styles.overviewGrid}><div><small className="eyebrow">Project</small><h2>Project Description</h2><p className="lead">{project.description}</p></div><ProjectFacts project={project} /></div></div></section>;
}

export function ProjectFacts({ project }: { project: Project }) {
  const facts: Array<[string, string | number | undefined]> = [
    ["Project", project.title], ["Location", project.location], ["Project type", project.projectType], ["Property type", project.propertyType],
    ["Local authority", project.localAuthority], ["Application", project.applicationType], ["Planning reference", project.planningReference],
    ["Project status", project.projectStatus], ["Completion", project.completion], ["Project year", project.projectYear], ["Approximate floor area", project.floorArea], ["Indicative value", project.contractValue],
  ];
  const visible = facts.filter(([, value]) => value !== undefined && value !== null && String(value).trim());
  return <dl className={styles.facts}>{visible.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export function ProjectCaseStudySection({ title, value, sectionName }: { title: string; value?: TextBlock[]; sectionName: string }) {
  if (!hasBlocks(value)) return null;
  return <section className={`section ${styles.caseStudySection}`} data-track-section={sectionName}><div className="shell"><div className={styles.caseStudyCopy}><small className="eyebrow">Case study</small><h2>{title}</h2><PortableText value={value as any} components={portableTextComponents} /></div></div></section>;
}

export function ProjectDescription({ value }: { value?: TextBlock[] }) {
  if (!hasBlocks(value)) return null;
  return <section className={`section ${styles.description}`}><div className="shell"><div className={styles.caseStudyCopy}><small className="eyebrow">Project description</small><h2>The project in detail.</h2><PortableText value={value as any} components={portableTextComponents} /></div></div></section>;
}

export function ProjectChallenges({ challenges }: { challenges?: ProjectChallenge[] }) {
  if (!challenges?.length) return null;
  return <section className={`section ${styles.challenges}`}><div className="shell"><div className={styles.sectionHeading}><small className="eyebrow">Evidence-led design</small><h2>Key challenges and responses.</h2></div><div className={styles.challengeList}>{challenges.map((item, index) => <article key={`${item.challenge}-${index}`}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.challenge}</h3><p><strong>Response</strong> {item.response}</p>{item.result ? <p><strong>Result</strong> {item.result}</p> : null}</div></article>)}</div></div></section>;
}

export function ProjectHighlights({ highlights }: { highlights?: ProjectHighlight[] }) {
  if (!highlights?.length) return null;
  return <section className={`section ${styles.highlights}`}><div className="shell"><small className="eyebrow">At a glance</small><h2>Project highlights.</h2><dl className={styles.highlightGrid}>{highlights.slice(0, 8).map((item) => <div key={`${item.label}-${item.value}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div></section>;
}

function imageSrc(image: SanityProjectImage, width: number) { return image.asset ? projectImageUrl(image, width) : "/images/social-sharing.jpg"; }

export function ProjectBeforeAfter({ intro, beforeImages, afterImages, projectTitle }: { intro?: string; beforeImages?: SanityProjectImage[]; afterImages?: SanityProjectImage[]; projectTitle: string }) {
  if (!beforeImages?.length || !afterImages?.length) return null;
  const count = Math.min(beforeImages.length, afterImages.length);
  return <section className={`section ${styles.beforeAfter}`}><div className="shell"><div className={styles.sectionHeading}><small className="eyebrow">Before and after</small><h2>Understanding the change.</h2>{intro ? <p className="lead">{intro}</p> : null}</div><div className={styles.beforeAfterGrid}>{Array.from({ length: count }).map((_, index) => <div className={styles.beforeAfterPair} key={index}><figure><Image src={imageSrc(beforeImages[index], 1200)} alt={beforeImages[index].alt || `${projectTitle} before image ${index + 1}`} width={1200} height={800} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>Before{beforeImages[index].caption ? ` — ${beforeImages[index].caption}` : ""}</figcaption></figure><figure><Image src={imageSrc(afterImages[index], 1200)} alt={afterImages[index].alt || `${projectTitle} after image ${index + 1}`} width={1200} height={800} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>After{afterImages[index].caption ? ` — ${afterImages[index].caption}` : ""}</figcaption></figure></div>)}</div></div></section>;
}

export function ProjectDrawings({ drawings, projectTitle }: { drawings?: ProjectDrawing[]; projectTitle: string }) {
  if (!drawings?.length) return null;
  return <section className={`section ${styles.drawings}`}><div className="shell"><div className={styles.sectionHeading}><small className="eyebrow">Drawings and process</small><h2>From concept to coordinated information.</h2></div><div className={styles.drawingGrid}>{drawings.map((drawing, index) => <figure key={drawing.asset?._id || index}><div className={styles.drawingFrame}><Image src={imageSrc(drawing, 1400)} alt={drawing.alt || `${projectTitle} drawing ${index + 1}`} width={1400} height={1000} sizes="(max-width: 700px) 100vw, 50vw" /></div>{drawing.drawingType ? <strong>{drawing.drawingType}</strong> : null}{drawing.caption ? <figcaption>{drawing.caption}</figcaption> : null}</figure>)}</div></div></section>;
}

export function ProjectTestimonial({ testimonial }: { testimonial?: ProjectTestimonial }) {
  if (!testimonial?.quote) return null;
  return <section className={`section ${styles.testimonial}`}><div className="shell"><blockquote><p>“{testimonial.quote}”</p><footer>{testimonial.clientName || testimonial.clientDescriptor ? <strong>{[testimonial.clientName, testimonial.clientDescriptor].filter(Boolean).join(" · ")}</strong> : null}{testimonial.reviewSource ? <span>{testimonial.reviewUrl ? <Link href={testimonial.reviewUrl} target="_blank" rel="noopener noreferrer">{testimonial.reviewSource} <ExternalLink size={14} /></Link> : testimonial.reviewSource}</span> : null}</footer></blockquote></div></section>;
}

export function ProjectTeam({ team }: { team?: ProjectTeamMember[] }) {
  if (!team?.length) return null;
  return <section className={`section ${styles.team}`}><div className="shell"><small className="eyebrow">Project team</small><h2>Consultants and collaborators.</h2><div className={styles.teamList}>{team.map((member, index) => <div key={`${member.role}-${index}`}><strong>{member.role}</strong>{member.organisation ? <span>{member.website ? <Link href={member.website} target="_blank" rel="noopener noreferrer">{member.organisation} <ExternalLink size={13} /></Link> : member.organisation}</span> : null}</div>)}</div></div></section>;
}

export function ProjectStages({ stages }: { stages?: ProjectStage[] }) {
  if (!stages?.length) return null;
  return <section className={`section ${styles.stages}`}><div className="shell"><small className="eyebrow">Project journey</small><h2>Known stages of the work.</h2><div className={styles.stageList}>{stages.map((stage, index) => <article key={`${stage.stage}-${index}`}><span className={styles.stageStatus}>{stage.status}</span><div><small>{stage.stage}</small><h3>{stage.title}</h3><p>{stage.description}</p></div></article>)}</div><p className={styles.disclaimer}>Stages shown reflect the information recorded for this project and do not imply that Hepburn Architects was appointed for every stage.</p></div></section>;
}

export function ProjectServices({ services }: { services?: string[] }) {
  if (!services?.length) return null;
  return <section className={`section ${styles.services}`}><div className="shell"><small className="eyebrow">Services</small><h2>Architectural services provided.</h2><ul className="project-services-list">{services.map((service) => <li key={service}>{service}</li>)}</ul></div></section>;
}

export function ProjectGallery({ gallery, projectTitle }: { gallery?: SanityProjectImage[]; projectTitle: string }) {
  if (!gallery?.length) return null;
  return <section className="section project-gallery-section"><div className="shell project-gallery"><div className="project-case-study-gallery-grid">{gallery.map((image, index) => <figure key={image.asset?._id || index}><div className="project-gallery-media"><Image src={imageSrc(image, 1400)} alt={image.alt || `${projectTitle} project image ${index + 1}`} fill sizes={gallery.length === 1 ? "(max-width: 950px) 100vw, 1100px" : "(max-width: 950px) 100vw, 50vw"} /></div>{image.caption ? <figcaption>{image.caption}</figcaption> : null}</figure>)}</div></div></section>;
}

export function ProjectOutcome({ value }: { value?: TextBlock[] }) {
  return <ProjectCaseStudySection title="Outcome" value={value} sectionName="project_outcome" />;
}
