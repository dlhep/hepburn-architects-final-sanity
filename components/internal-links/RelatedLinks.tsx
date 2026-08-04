import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { InternalLink } from "@/lib/internal-links";
import styles from "./internal-links.module.css";

export function RelatedLinks({ heading, links, group, ariaLabel }: { heading: string; links: InternalLink[]; group: string; ariaLabel?: string }) {
  const unique = links.filter((link, index, list) => Boolean(link.href) && list.findIndex((item) => item.href === link.href) === index);
  if (!unique.length) return null;
  return <section className={styles.section} aria-labelledby={`${group}-heading`}>
    <div className={styles.heading}><small className="eyebrow">Continue your research</small><h2 id={`${group}-heading`}>{heading}</h2></div>
    <nav aria-label={ariaLabel || heading} className={styles.grid}>
      {unique.map((link) => <Link href={link.href} key={link.href} className={styles.link} data-track-internal="true" data-track-group={group} data-track-event={group.startsWith("project-") || group === "related-projects" ? "project_case_study_engagement" : undefined}>
        <span><strong>{link.label}</strong>{link.description ? <small>{link.description}</small> : null}</span><ArrowRight aria-hidden="true" size={17} />
      </Link>)}
    </nav>
  </section>;
}
