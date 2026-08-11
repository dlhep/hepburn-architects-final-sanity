import type { Metadata } from "next";
import Link from "next/link";
import { PlanningTools } from "@/components/planning-tools/PlanningTools";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildGraph, buildWebPageSchema, breadcrumbId } from "@/lib/structured-data";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Free UK Planning Calculators & Site Tools",
  description: "Use 15 free planning tools for extensions, planning fees, flood risk, space standards, deadlines, heating carbon and site constraints.",
  alternates: { canonical: "/planning-tools" },
  openGraph: {
    title: "Free UK Planning Calculators & Site Tools",
    description: "Practical early-stage planning checks for homeowners, landowners and small developers.",
    url: "/planning-tools",
    type: "website",
    images: ["/images/social-sharing.jpg"],
  },
};

export default function PlanningToolsPage() {
  const url = `${site.url}/planning-tools`;
  const schema = buildGraph(
    buildWebPageSchema({ url, name: "Free UK Planning Calculators & Site Tools", description: metadata.description as string, breadcrumb: breadcrumbId(url), mainEntity: `${url}#tools` }),
    buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Planning tools", url }]),
    { "@type": "ItemList", "@id": `${url}#tools`, name: "Free planning tools", numberOfItems: 15, itemListElement: Array.from({ length: 15 }, (_, index) => ({ "@type": "ListItem", position: index + 1, url: `${url}#tool-${index + 1}` })) },
  );

  return <>
    <StructuredData data={schema} />
    <section className={styles.hero}>
      <div className="shell">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Planning tools</span></nav>
        <small className="eyebrow">Free early-stage checks</small>
        <h1>UK planning calculators and site tools.</h1>
        <p>Fifteen practical screening tools for homeowners, landowners and small developers. Check planning routes, development constraints, application costs and design considerations before commissioning detailed work.</p>
        <div className="actions"><a className="btn primary" href="#tools">Explore the tools</a><Link className="btn secondary" href="/contact">Discuss a project</Link></div>
      </div>
    </section>
    <section id="tools" className={styles.toolsSection}>
      <div className="shell"><PlanningTools /></div>
    </section>
    <section className={styles.disclaimer}>
      <div className="shell">
        <small className="eyebrow">Important</small>
        <h2>Screening results are a starting point.</h2>
        <p>These tools provide general information for projects in England. They do not confirm planning permission, legal rights, site boundaries or technical compliance. Local policy, Article 4 directions, listed status, site-specific evidence and later regulatory changes can alter the answer.</p>
        <Link className="btn primary" href="/services/planning-applications">Planning application support</Link>
      </div>
    </section>
  </>;
}
