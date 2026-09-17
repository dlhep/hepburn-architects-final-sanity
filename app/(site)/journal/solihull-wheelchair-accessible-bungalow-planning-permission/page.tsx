import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { buildArticleSchema, buildBreadcrumbSchema, buildGraph } from "@/lib/structured-data";
import { site } from "@/lib/site";
import styles from "../house-extension-planning-permission-birmingham-2026-guide/page.module.css";

const title = "Planning permission secured for an accessible bungalow in Solihull";
const description = "Hepburn Architects and planning consultant Joanne McCallion help secure permission for a wheelchair-accessible bungalow on a garage site in Solihull.";
const url = `${site.url}/journal/solihull-wheelchair-accessible-bungalow-planning-permission`;
const image = "/images/solihull-bungalow-comparison-enhanced.webp";
const date = "2026-09-14";

export const metadata: Metadata = {
  title: { absolute: "Accessible Bungalow Planning Success, Solihull | Hepburn" },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", publishedTime: date, modifiedTime: date, authors: [`${site.url}/about`], images: [{ url: `${site.url}${image}`, alt: "Existing garage site and proposed wheelchair-accessible bungalow CGI in Solihull" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${site.url}${image}`] },
};

export default function SolihullBungalowArticle() {
  const schema = buildGraph(
    buildArticleSchema({ url, headline: title, description, image: `${site.url}${image}`, datePublished: date, dateModified: date, section: "Project news", keywords: ["Solihull", "accessible bungalow", "planning permission", "garage site"], journal: true }),
    buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Journal", url: `${site.url}/journal` }, { name: "Accessible bungalow in Solihull", url }]),
  );
  return <>
    <StructuredData data={schema} />
    <article className={`section ${styles.article}`}>
      <div className="shell article-page">
        <nav aria-label="Breadcrumb" className="muted small-copy"><Link href="/">Home</Link> · <Link href="/journal">Journal</Link></nav>
        <small className="eyebrow"><Newspaper size={14} /> Project news · Solihull</small>
        <h1>{title}</h1>
        <p className="lead">From garage site to accessible home: planning approval marks the next step in our client’s wider vision for a property in Solihull.</p>
        <p className={styles.byline}>Published 14 September 2026 · By <Link href="/about">David Hepburn</Link></p>
        <div className={styles.body}>
          <p>We’re delighted to share planning approval for a wheelchair-accessible bungalow on an existing garage site in Solihull—a significant next step in our client’s wider vision for the property.</p>
          <p>Working alongside planning consultant Joanne McCallion, Hepburn Architects has helped secure permission to bring a new residential use to the site, creating an opportunity for a home designed around accessible, single-storey living.</p>
          <figure className={styles.hero}>
            <Image src={image} alt="Before and proposed comparison: existing garage site above and CGI of a brick bungalow with a pitched roof in Solihull below" width={1173} height={1341} unoptimized priority sizes="(max-width: 760px) 100vw, 820px" />
            <figcaption>Existing garage site (above) and proposed bungalow CGI (below), Solihull. The CGI illustrates the proposal; it is not a photograph of a completed building.</figcaption>
          </figure>
          <p>The proposed CGI illustrates a brick bungalow with a pitched roof and a clearly defined entrance, drawing on the character of the neighbouring houses. It shows how a modest garage site can accommodate a new home within an established residential setting.</p>
          <section><h2>Part of a wider vision</h2>
            <p>The bungalow forms the second phase of our client’s project, following the creation of a six-bedroom HMO for professional tenants within the main house.</p>
            <p>The client’s ambition for a third phase is to work with the neighbouring owner through a joint venture to explore an apartment development on the other side of the HMO. That remains a future proposal, subject to feasibility and the necessary planning approval.</p>
            <p>Together, these phases reflect a considered approach to exploring the potential of a property: looking at the existing building, the surrounding land and the opportunities that collaboration with neighbouring owners might offer.</p>
          </section>
          <section><h2>The architect’s eye: finding hidden value</h2>
            <p>For us, this project captures an important part of residential architecture—recognising opportunities in spaces that can easily be overlooked and shaping them into proposals with a clear purpose.</p>
            <p>Here, the planning approval opens the way for an existing garage site to become a wheelchair-accessible home, adding a different type of accommodation to the client’s wider development.</p>
            <p>A big thank you to our client for sharing the good news, and to Joanne McCallion for her work as planning consultant. We’re delighted to have played our part.</p>
          </section>
          <section><h2>Could your property offer more potential?</h2>
            <p>If you own a garage site, a side plot or land alongside an existing building, Hepburn Architects can help you explore its potential.</p>
            <p>Explore our <Link href="/locations/solihull-architects">architectural services in Solihull</Link>, <Link href="/services/new-build-homes">new-build home design</Link> and <Link href="/development-potential-appraisal">development potential appraisals</Link>.</p>
            <div className={styles.feeCta}><div><small>Discuss your site</small><h3>Find the potential in your property.</h3><p>Tell us about your site and what you would like to achieve.</p></div><Link href="/contact" className="btn">Arrange an initial consultation</Link></div>
          </section>
        </div>
      </div>
    </article>
  </>;
}
