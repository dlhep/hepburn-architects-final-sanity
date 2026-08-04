import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCommercialLinksForArticle } from "@/lib/internal-links";
import styles from "./internal-links.module.css";

export function CommercialNextStep({ slug, title, serviceHref, serviceLabel }: { slug?: string; title?: string; serviceHref?: string; serviceLabel?: string }) {
  const links = getCommercialLinksForArticle(slug, title);
  const primary = serviceHref ? { href: serviceHref, label: serviceLabel || links.primary.label } : links.primary;
  return <section className={styles.nextStep} aria-labelledby="commercial-next-step-heading">
    <small className="eyebrow">Next steps</small><h2 id="commercial-next-step-heading">Planning your project?</h2>
    <p>Hepburn Architects can help with feasibility, planning drawings and Building Regulations information for residential projects across Birmingham and the West Midlands.</p>
    <div className="actions"><Link className="btn primary" href={primary.href} data-track-internal="true" data-track-group="commercial-next-step">{primary.label} <ArrowRight size={17} /></Link><Link className="btn secondary" href="/estimate" data-track-internal="true" data-track-group="commercial-next-step">Get an indicative fee</Link><Link className="btn secondary" href="/contact" data-track-internal="true" data-track-group="commercial-next-step">Discuss your project</Link></div>
  </section>;
}
