import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { site } from "@/lib/site";
import { GuideActions } from "./GuideActions";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Your House Extension Guide Is Ready | Hepburn Architects" },
  description: "Download your free house extension guide and arrange a consultation with Hepburn Architects.",
  alternates: { canonical: `${site.url}/house-extension-guide/thank-you` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Your House Extension Guide Is Ready",
    description: "Download your free house extension guide from Hepburn Architects.",
    url: `${site.url}/house-extension-guide/thank-you`,
    siteName: site.name,
    type: "website",
  },
};

export default async function ThankYouPage() {
  const projects = await getProjects();
  const project = projects.find((item) => item.category.toLowerCase().includes("extension")) ?? projects[0];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={`shell ${styles.headerInner}`}>
          <Link href="/" aria-label="Hepburn Architects home">
            <Image src="/hepburn-logo.svg" alt="Hepburn Architects" width={581} height={155} priority />
          </Link>
          <a className="btn primary small-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">
            Book a consultation
          </a>
        </div>
      </header>

      <section className={styles.thankHero}>
        <div className={`shell ${styles.thankGrid}`}>
          <div>
            <small className="eyebrow">Thank you</small>
            <h1>Your House Extension Guide Is Ready</h1>
            <p className="lead">
              Use the guide to start shaping your plans. If you would like to discuss your
              property, David can help you understand the likely planning route and sensible next steps.
            </p>
            <GuideActions />
            <div className={styles.contactLinks}>
              <a href={site.phoneHref}><Phone size={18} aria-hidden="true" /> {site.phone}</a>
              <a href={`mailto:${site.email}`}><Mail size={18} aria-hidden="true" /> {site.email}</a>
            </div>
          </div>
          <Image
            className={styles.thankCover}
            src="/images/house-extension-guide-cover.svg"
            alt="The Complete House Extension Guide by Hepburn Architects"
            width={900}
            height={1200}
            priority
            sizes="(max-width: 850px) 65vw, 330px"
          />
        </div>
      </section>

      {project && (
        <section className={`section dark-section ${styles.thankProject}`}>
          <div className={`shell ${styles.project}`}>
            <Image
              src={projectImageUrl(project)}
              alt={projectImageAlt(project)}
              width={1200}
              height={760}
              sizes="(max-width: 850px) 100vw, 55vw"
            />
            <div>
              <small className="eyebrow">Extension inspiration</small>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <Link href={`/projects/${project.slug}`}>
                View project <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
