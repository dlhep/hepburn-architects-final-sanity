import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Project, ProjectDrawing, ProjectPortableText, SanityProjectImage } from "@/lib/projects";
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

export function ProjectDescription({ value }: { value?: TextBlock[] }) {
  if (!hasBlocks(value)) return null;
  return <section className={`section ${styles.description} project-description-longform`}><div className="shell"><div className={styles.caseStudyCopy}><PortableText value={value as any} components={portableTextComponents} /></div></div></section>;
}

export function ProjectCaseStudyDetails({ project }: { project: Project }) {
  const sections: Array<[string, ProjectPortableText | undefined]> = [
    ["Client brief", project.clientBrief], ["Existing property and constraints", project.existingConditions], ["Design response", project.designResponse],
    ["Planning strategy", project.planningStrategy], ["Technical design", project.technicalDesign], ["Materials and detailing", project.materialsAndDetailing],
    ["Sustainability and energy approach", project.sustainabilityApproach], ["Outcome", project.projectOutcome], ["Project insights", project.lessonsAndInsights],
  ];
  const populated = sections.filter(([, value]) => hasBlocks(value));
  const hasSupporting = Boolean(project.keyChallenges?.length || project.projectHighlights?.length || project.clientTestimonial?.quote || project.projectTeam?.length || project.projectStages?.length);
  if (!populated.length && !hasSupporting) return null;
  return <section className="section project-case-study-details"><div className="shell"><div className={styles.caseStudyCopy}><small className="eyebrow">Case study</small><h2>The project in detail</h2>{populated.map(([title, value]) => <div className="project-case-study-detail-block" key={title}><h3>{title}</h3><PortableText value={value as any} components={portableTextComponents} /></div>)}{project.keyChallenges?.length ? <div className="project-case-study-detail-block"><h3>Key challenges and responses</h3><ul>{project.keyChallenges.map((item, index) => <li key={`${item.challenge}-${index}`}><strong>{item.challenge}</strong><br />{item.response}{item.result ? <><br /><em>{item.result}</em></> : null}</li>)}</ul></div> : null}{project.projectHighlights?.length ? <div className="project-case-study-detail-block"><h3>Project highlights</h3><dl className="project-case-study-highlights">{project.projectHighlights.slice(0, 8).map((item) => <div key={`${item.label}-${item.value}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div> : null}{project.clientTestimonial?.quote ? <blockquote className="project-case-study-testimonial"><p>“{project.clientTestimonial.quote}”</p><footer>{[project.clientTestimonial.clientName, project.clientTestimonial.clientDescriptor, project.clientTestimonial.reviewSource].filter(Boolean).join(" · ")}</footer></blockquote> : null}{project.projectTeam?.length ? <div className="project-case-study-detail-block"><h3>Project team</h3><ul>{project.projectTeam.map((member, index) => <li key={`${member.role}-${index}`}>{member.role}{member.organisation ? ` — ${member.organisation}` : ""}</li>)}</ul></div> : null}{project.projectStages?.length ? <div className="project-case-study-detail-block"><h3>Project stages</h3><ol>{project.projectStages.map((stage, index) => <li key={`${stage.stage}-${index}`}><strong>{stage.stage}: {stage.title}</strong> — {stage.description} <em>({stage.status})</em></li>)}</ol><p className="project-case-study-note">Stages shown reflect the information recorded for this project and do not imply a full appointment.</p></div> : null}</div></div></section>;
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

export function ProjectServices({ services }: { services?: string[] }) {
  if (!services?.length) return null;
  return <section className="section project-services-section"><div className="shell"><small className="eyebrow">Services</small><h2>Architectural services provided.</h2><ul className="project-services-list">{services.map((service) => <li key={service}>{service}</li>)}</ul></div></section>;
}

export function ProjectGallery({ gallery, projectTitle }: { gallery?: SanityProjectImage[]; projectTitle: string }) {
  if (!gallery?.length) return null;
  const compatiblePair = gallery.length > 3 && [gallery[2], gallery[3]].every((image) => image.asset?.metadata?.dimensions?.width && image.asset?.metadata?.dimensions?.height)
    ? Math.abs((gallery[2].asset!.metadata!.dimensions!.width! / gallery[2].asset!.metadata!.dimensions!.height!) - (gallery[3].asset!.metadata!.dimensions!.width! / gallery[3].asset!.metadata!.dimensions!.height!)) < 0.28
    : false;
  const renderImage = (image: SanityProjectImage, index: number) => {
    const width = image.asset?.metadata?.dimensions?.width || 3;
    const height = image.asset?.metadata?.dimensions?.height || 2;
    const ratio = width / height;
    return <figure key={image.asset?._id || index}><div className="project-portfolio-gallery-media" style={{ aspectRatio: `${width} / ${height}` }}><Image src={imageSrc(image, 1800)} alt={image.alt || `${projectTitle} project image ${index + 1}`} fill sizes="(max-width: 900px) 100vw, 90vw" style={{ objectFit: ratio < 0.85 ? "contain" : "cover" }} /></div>{image.caption ? <figcaption>{image.caption}</figcaption> : null}</figure>;
  };
  const rows: Array<{ images: SanityProjectImage[]; paired: boolean; start: number }> = [];
  if (gallery[0]) rows.push({ images: [gallery[0]], paired: false, start: 0 });
  if (gallery[1]) rows.push({ images: [gallery[1]], paired: false, start: 1 });
  if (compatiblePair) rows.push({ images: [gallery[2], gallery[3]], paired: true, start: 2 });
  gallery.slice(compatiblePair ? 4 : 2).forEach((image, index) => rows.push({ images: [image], paired: false, start: (compatiblePair ? 4 : 2) + index }));
  return <section className="section project-gallery-section"><div className="shell project-portfolio-gallery">{rows.map((row) => <div className={`project-portfolio-gallery-row${row.paired ? " is-paired" : ""}`} key={row.start}>{row.images.map((image, index) => renderImage(image, row.start + index))}</div>)}</div></section>;
}
