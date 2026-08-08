import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Landmark,
  Quote,
  Ruler,
  TriangleAlert,
} from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { site } from "@/lib/site";
import { GuideForm } from "./GuideForm";
import styles from "./page.module.css";
import { StructuredData } from "@/components/StructuredData";
import { buildArticleSchema, buildBreadcrumbSchema, buildGraph, buildWebPageSchema, breadcrumbId } from "@/lib/structured-data";

const title = "Free House Extension Guide";
const description =
  "Download Hepburn Architects' free house extension guide covering planning permission, permitted development, budgets, timescales and common design mistakes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/house-extension-guide` },
  openGraph: {
    title,
    description,
    url: `${site.url}/house-extension-guide`,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    images: [{
      url: "/images/house-extension-guide-cover.png",
      width: 1055,
      height: 1491,
      alt: "Planning a House Extension — A Practical Homeowner's Guide by Hepburn Architects",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/house-extension-guide-cover.png"],
  },
};

const learnCards = [
  { icon: Landmark, title: "Planning permission explained clearly" },
  { icon: FileCheck2, title: "Permitted development and what may be possible" },
  { icon: CalendarClock, title: "Realistic project budgets and timescales" },
  { icon: TriangleAlert, title: "Extension mistakes that cause delays and unnecessary costs" },
  { icon: CheckCircle2, title: "Preparing properly before appointing builders" },
  { icon: Ruler, title: "Professional advice from a residential architect" },
];

const reviews = [
  {
    quote: "Great service! David was on time with the plans, and his advice has been invaluable throughout the process.",
    attribution: "Avtar, Birmingham",
    source: "MyBuilder",
    href: "https://www.mybuilder.com/profile/hepburn_architects/reviews",
  },
  {
    quote: "David was a pleasure to deal with throughout. He was easy to talk to and nothing was too much.",
    attribution: "Verified homeowner",
    source: "Checkatrade",
    href: "https://www.checkatrade.com/trades/hepburndaoudiarchitects",
  },
];

export default async function HouseExtensionGuidePage() {
  const projects = await getProjects();
  const project = projects.find((item) => item.category.toLowerCase().includes("extension")) ?? projects[0];
  const url = `${site.url}/house-extension-guide`;

  return (
    <main id="main-content" className={styles.page} tabIndex={-1}>
      <a className="skip-link" href="#guide-content">Skip to guide content</a>
      <StructuredData data={buildGraph(buildWebPageSchema({ url, name: title, description, breadcrumb: breadcrumbId(url), mainEntity: `${url}#article`, primaryImage: `${site.url}/images/house-extension-guide-cover.png` }), buildArticleSchema({ url, headline: "Planning a House Extension — A Practical Homeowner's Guide", description, image: `${site.url}/images/house-extension-guide-cover.png`, section: "House extensions" }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "House Extension Guide", url }]))} />
      <header className={styles.header}>
        <div className={`shell ${styles.headerInner}`}>
          <Link href="/" aria-label="Hepburn Architects home">
            <Image src="/hepburn-logo.svg" alt="Hepburn Architects" width={581} height={155} sizes="(max-width: 700px) 190px, 240px" />
          </Link>
          <a className="btn primary small-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">
            Book a consultation
          </a>
        </div>
      </header>

      <section className={styles.hero} id="guide-content" tabIndex={-1}>
        <div className={`shell ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <small className="eyebrow">Free guide for homeowners</small>
            <h1>Planning a House Extension?<br />Start With the Right Advice.</h1>
            <p className={styles.intro}>Planning an extension can feel complicated.</p>
            <p>
              Download Hepburn Architects&apos; free Complete House Extension Guide to understand
              planning permission, permitted development, realistic budgets, likely timescales
              and the mistakes worth avoiding before you appoint builders.
            </p>
            <div className={styles.heroTrust}>
              <span><BadgeCheck /> ARB Registered</span>
              <span><Building2 /> RIBA Chartered Practice</span>
            </div>
          </div>

          <div className={styles.capture}>
            <div className={styles.coverWrap}>
              <Image
                src="/images/house-extension-guide-cover.png"
                alt="Planning a House Extension — A Practical Homeowner's Guide by Hepburn Architects"
                width={1055}
                height={1491}
                priority
                sizes="(max-width: 700px) 70vw, (max-width: 1050px) 38vw, 270px"
              />
            </div>
            <GuideForm />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className={styles.sectionIntro}>
            <small className="eyebrow">Practical guidance</small>
            <h2>What You&apos;ll Learn</h2>
            <p>Clear, useful advice to help you make better decisions from the outset.</p>
          </div>
          <div className={styles.learnGrid}>
            {learnCards.map(({ icon: Icon, title: cardTitle }, index) => (
              <article key={cardTitle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <h3>{cardTitle}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section dark-section ${styles.trust}`}>
        <div className="shell">
          <div className={styles.sectionIntro}>
            <small className="eyebrow">Residential expertise</small>
            <h2>Advice grounded in real extension projects.</h2>
          </div>
          <div className={styles.credentials} aria-label="Practice credentials">
            <span><strong>ARB</strong> Registered</span>
            <span><strong>RIBA</strong> Chartered Practice</span>
            <span><strong>Residential</strong> extension specialists</span>
            <span><strong>Director-led</strong> service with David Hepburn</span>
            <span><strong>Birmingham</strong> Studio</span>
            <span><strong>West Midlands</strong> Local expertise</span>
          </div>

          {project && (
            <article className={styles.project}>
              <Image
                src={projectImageUrl(project)}
                alt={projectImageAlt(project)}
                width={1200}
                height={760}
                sizes="(max-width: 850px) 100vw, 55vw"
              />
              <div>
                <small className="eyebrow">Selected extension project</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link href={`/projects/${project.slug}`}>
                  View project <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className={`section ${styles.reviews}`}>
        <div className="shell">
          <div className={styles.sectionIntro}>
            <small className="eyebrow">Independent client feedback</small>
            <h2>Clear advice. Dependable communication.</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.source}>
                <Quote aria-hidden="true" />
                <blockquote>{review.quote}</blockquote>
                <strong>{review.attribution}</strong>
                <a href={review.href} target="_blank" rel="noopener noreferrer">
                  View on {review.source} <ExternalLink size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.finalCta}`}>
        <div className="shell final-cta">
          <small className="eyebrow">Your project starts here</small>
          <h2>Start Planning Your Extension With Confidence</h2>
          <p>Get the essential planning, design, budget and timescale advice before making costly commitments.</p>
          <a
            className={`btn primary ${styles.largeButton}`}
            href="/downloads/Complete-House-Extension-Guide-Hepburn-Architects.pdf"
            download="Planning-a-House-Extension-Hepburn-Architects.pdf"
          >
            Download the Free Guide <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
