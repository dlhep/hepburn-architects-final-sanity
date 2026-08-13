import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Download } from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";
import {
  getProjects,
  projectImageAlt,
  projectImageUrl,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildGraph, buildItemListSchema, breadcrumbId } from "@/lib/structured-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Architecture Knowledge Centre",
  description:
    "Practical residential architecture guidance covering planning permission, Building Regulations, house extensions, design, costs and project advice.",
  alternates: {
    canonical: "https://hepburnarchitects.co.uk/knowledge-centre",
  },
  openGraph: {
    title: "Residential Architecture Knowledge Centre | Hepburn Architects",
    description:
      "Practical residential architecture guidance covering planning permission, Building Regulations, house extensions, design, costs and project advice.",
    url: "/knowledge-centre",
    type: "website",
    images: ["/images/social-sharing.jpg"],
  },
};

const topicNavigation = [
  { label: "Planning Permission", href: "/knowledge-centre/planning-permission" },
  { label: "Building Regulations", href: "/knowledge-centre/building-regulations" },
  { label: "House Extension Services", href: "/services/house-extensions" },
  { label: "Loft Conversions", href: "/knowledge-centre/loft-conversions" },
  { label: "Journal", href: "/blog" },
  { label: "Fee Calculator", href: "/estimate" },
  { label: "Planning Tools", href: "/planning-tools" },
  { label: "Property Professionals", href: "/knowledge-centre/property-professional-architectural-support" },
] as const;

const questions = [
  {
    question: "Do I need planning permission for an extension?",
    href: "/knowledge-centre/extension-planning-permission",
  },
  {
    question:
      "What is the difference between planning permission and Building Regulations?",
    href: "/knowledge-centre/building-regulations#planning-versus-building-regulations",
  },
  {
    question: "Can an extension be built under permitted development?",
    href: "/knowledge-centre/extension-planning-permission",
  },
  {
    question: "Do I need Building Regulations approval?",
    href: "/knowledge-centre/building-regulations#when-they-apply",
  },
  {
    question: "How much does a house extension cost?",
    href: "/services/house-extensions#costs",
  },
  {
    question: "Do I need an architect?",
    href: "/knowledge-centre/loft-conversions",
  },
] as const;

const futureTopics = [
  "New Build Homes",
  "HMOs and Conversions",
  "Loft Conversions",
  "Small Residential Developments",
] as const;

const projectGroups = [
  ["extension"],
  ["new build", "new-build", "passive", "passivhaus"],
  ["replacement"],
  ["development", "housing", "infill", "backland"],
  ["conversion", "hmo", "remodelling"],
] as const;

function projectSearchText(project: Project) {
  return [
    project.title,
    project.category,
    project.projectType,
    project.description,
    project.services?.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function selectVariedProjects(projects: Project[]) {
  const selected: Project[] = [];

  projectGroups.forEach((terms) => {
    const match = projects.find(
      (project) =>
        !selected.some((item) => item.slug === project.slug) &&
        terms.some((term) => projectSearchText(project).includes(term)),
    );
    if (match) selected.push(match);
  });

  for (const project of projects) {
    if (selected.length >= 6) break;
    if (!selected.some((item) => item.slug === project.slug)) selected.push(project);
  }

  return selected.slice(0, 6);
}

function ProjectImage({
  project,
  sizes,
  width = 900,
}: {
  project: Project;
  sizes: string;
  width?: number;
}) {
  return (
    <Image
      src={projectImageUrl(project.featuredImage, width)}
      alt={projectImageAlt(project)}
      fill
      sizes={sizes}
    />
  );
}

export default async function KnowledgeCentrePage() {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);
  const selectedProjects = selectVariedProjects(projects);
  const extensionProject =
    selectedProjects.find((project) =>
      projectSearchText(project).includes("extension"),
    ) ?? selectedProjects[0];
  const secondaryImages = selectedProjects.filter(
    (project) => project.slug !== extensionProject?.slug,
  );
  const latestPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  const url = `${site.url}/knowledge-centre`;
  const breadcrumbSchema = buildGraph(buildCollectionPageSchema({ url, name: "Architecture Knowledge Centre", description: metadata.description as string, breadcrumb: breadcrumbId(url) }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Knowledge Centre", url }]), buildItemListSchema(url, "Knowledge Centre resources", topicNavigation.map((item) => ({ name: item.label, url: `${site.url}${item.href}` }))));

  return (
    <>
      <StructuredData data={breadcrumbSchema} />

      <section className={`${styles.hero} knowledge-index-hero`}>
        {extensionProject ? (
          <div className="knowledge-index-hero-visual" aria-hidden="true">
            <ProjectImage
              project={extensionProject}
              sizes="(max-width: 700px) 100vw, 1px"
              width={1200}
            />
          </div>
        ) : null}
        <div className={`shell ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Knowledge Centre</span>
          </nav>
          <small className="eyebrow">Residential Architecture Guidance</small>
          <h1>Residential Architecture Knowledge Centre</h1>
          <div className={styles.heroBottom}>
            <p>
              Clear, practical guidance for homeowners, property investors and small
              developers navigating design, planning permission, Building
              Regulations, house extensions and residential development.
            </p>
            <div className={`actions ${styles.heroActions}`}>
              <a className="btn primary" href="#featured-guides">
                Explore Featured Guides <ArrowRight size={17} />
              </a>
              <a
                className="btn secondary"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.topicStrip} aria-label="Knowledge Centre topics">
        <div className="shell">
          {topicNavigation.map((topic) => (
            <Link href={topic.href} key={topic.label}>
              {topic.label}
            </Link>
          ))}
        </div>
      </nav>

      <section id="featured-guides" className={styles.featuredSection}>
        <div className="shell">
          <header className={styles.sectionHeader}>
            <small className="eyebrow">Start here</small>
            <h2>Featured Guides</h2>
          </header>

          <article className={styles.leadFeature}>
            {extensionProject ? (
              <Link
                className={styles.leadImage}
                href="/services/house-extensions"
                aria-label="Explore House Extension Architectural Services"
              >
                <ProjectImage
                  project={extensionProject}
                  sizes="(max-width: 800px) 100vw, 62vw"
                  width={1400}
                />
              </Link>
            ) : null}
            <div className={styles.leadCopy}>
              <span>01 / House extension architectural services</span>
              <h3>House Extension Design and Planning Services</h3>
              <p>
                A clear route from feasibility and concept design through planning,
                Building Regulations and the complete project process.
              </p>
              <Link
                className={styles.arrowLink}
                href="/services/house-extensions"
              >
                Explore House Extension Services <ArrowRight size={17} />
              </Link>
            </div>
          </article>

          <div className={styles.secondaryGuides}>
            {[
              {
                number: "02",
                title: "Planning Permission Explained",
                summary:
                  "Understand the principal planning routes, permitted development and how residential proposals are assessed.",
                href: "/knowledge-centre/planning-permission",
              },
              {
                number: "03",
                title: "Building Regulations Explained",
                summary:
                  "An introduction to technical approval, compliant design information and the responsibilities behind a safe build.",
                href: "/knowledge-centre/building-regulations",
              },
            ].map((guide, index) => (
              <article className={styles.secondaryGuide} key={guide.title}>
                {secondaryImages[index] ? (
                  <Link
                    href={guide.href}
                    className={styles.secondaryImage}
                    aria-label={`Read ${guide.title}`}
                  >
                    <ProjectImage
                      project={secondaryImages[index]}
                      sizes="(max-width: 700px) 100vw, 48vw"
                      width={1200}
                    />
                  </Link>
                ) : null}
                <div>
                  <span>{guide.number} / Essential reading</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.summary}</p>
                  <Link className={styles.arrowLink} href={guide.href}>
                    Read {guide.title} <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.guidanceSection}>
        <div className={`shell ${styles.splitIntro}`}>
          <header className={styles.sectionHeader}>
            <small className="eyebrow">Understand the approvals</small>
            <h2>Planning and Technical Guidance</h2>
          </header>
          <p>
            The guides explain the systems and questions likely to shape a project.
            The service pages explain how Hepburn Architects can prepare, coordinate
            and submit the professional work required for a specific property.
          </p>
        </div>
        <div className={`shell ${styles.editorialLinks}`}>
          <div>
            <span>Guides</span>
            <Link href="/knowledge-centre/planning-permission">
              Planning Permission Explained <ArrowRight size={16} />
            </Link>
            <Link href="/knowledge-centre/building-regulations">
              Building Regulations Explained <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <span>Professional services</span>
            <Link href="/services/planning-applications">
              Planning application architect <ArrowRight size={16} />
            </Link>
            <Link href="/services/building-regulations">
              Building Regulations drawings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.improvementSection}>
        <div className="shell">
          <header className={styles.sectionHeader}>
            <small className="eyebrow">From first idea to delivery</small>
            <h2>Improving and Extending Your Home</h2>
          </header>
          <div className={styles.improvementGrid}>
            {extensionProject ? (
              <Link
                href={`/projects/${extensionProject.slug}`}
                className={styles.improvementImage}
                aria-label={`View extension project: ${extensionProject.title}`}
              >
                <ProjectImage
                  project={extensionProject}
                  sizes="(max-width: 850px) 100vw, 66vw"
                  width={1400}
                />
                <span>{extensionProject.title}</span>
              </Link>
            ) : null}
            <div className={styles.improvementCopy}>
              <p>
                Use the complete guide for an editorial overview, then move into the
                practical resource or service that fits the stage your project has
                reached.
              </p>
              <Link href="/services/house-extensions">
                House Extension Architectural Services <ArrowRight size={16} />
              </Link>
              <Link href="/knowledge-centre/house-extension-costs">
                House Extension Costs in 2026 <ArrowRight size={16} />
              </Link>
              <Link href="/knowledge-centre/house-extension-timeline">
                House Extension Timeline <ArrowRight size={16} />
              </Link>
              <Link href="/knowledge-centre/house-extension-ideas">
                House Extension Design Ideas <ArrowRight size={16} />
              </Link>
              <Link href="/house-extension-guide">
                Downloadable House Extension Guide <ArrowRight size={16} />
              </Link>
              <Link href="/estimate">
                Estimate architectural fees <ArrowRight size={16} />
              </Link>
              <Link href="/projects">
                Browse extension projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.downloadSection}>
        <div className={`shell ${styles.downloadInner}`}>
          <div className={styles.guideCover}>
            <Image
              src="/images/house-extension-guide-cover.png"
              alt="Cover of the Hepburn Architects house extension guide"
              width={1055}
              height={1491}
              sizes="(max-width: 700px) 58vw, 330px"
            />
          </div>
          <div className={styles.downloadCopy}>
            <small className="eyebrow">Free homeowner resource</small>
            <h2>Download the House Extension Guide</h2>
            <p>
              A practical companion covering planning permission, budgeting, design
              decisions, the extension process and common mistakes to avoid.
            </p>
            <Link className="btn primary" href="/house-extension-guide">
              Get the Free Guide <Download size={17} />
            </Link>
          </div>
        </div>
      </section>

      {selectedProjects.length > 0 ? (
        <section className={styles.projectsSection}>
          <div className="shell">
            <div className={styles.headingRow}>
              <header className={styles.sectionHeader}>
                <small className="eyebrow">Selected residential work</small>
                <h2>Architecture in Practice</h2>
              </header>
              <Link className={styles.arrowLink} href="/projects">
                View All Projects <ArrowRight size={17} />
              </Link>
            </div>
            <div className={styles.projectGrid}>
              {selectedProjects.map((project) => (
                <Link
                  className={styles.projectCard}
                  href={`/projects/${project.slug}`}
                  key={project.slug}
                >
                  <div className={styles.projectImage}>
                    <ProjectImage
                      project={project}
                      sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 34vw"
                    />
                  </div>
                  <div>
                    <small>{project.projectType || project.category}</small>
                    <h3>{project.title}</h3>
                    <p>{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.journalSection}>
        <div className="shell">
          <div className={styles.headingRow}>
            <header className={styles.sectionHeader}>
              <small className="eyebrow">Journal</small>
              <h2>Latest from the Studio</h2>
            </header>
            <Link className={styles.arrowLink} href="/blog">
              View the Journal <ArrowRight size={17} />
            </Link>
          </div>
          {latestPosts.length ? (
            <div className={styles.journalGrid}>
              {latestPosts.map((post) => {
                const image = articleImageUrl(post.featuredImage, 1000);
                return (
                  <article className={styles.journalCard} key={post._id}>
                    {image ? (
                      <Link
                        className={styles.journalImage}
                        href={`/blog/${post.slug}`}
                        aria-label={`Read ${post.title}`}
                      >
                        <Image
                          src={image}
                          alt={post.featuredImage?.alt || post.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 33vw"
                        />
                      </Link>
                    ) : null}
                    <div>
                      <time dateTime={post.publishedAt}>
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(post.publishedAt))}
                      </time>
                      <h3>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p>{post.excerpt}</p>
                      <Link className={styles.arrowLink} href={`/blog/${post.slug}`}>
                        Read article <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className={styles.emptyState}>
              New studio stories are in preparation. In the meantime, explore the
              complete guidance library.
            </p>
          )}
        </div>
      </section>

      <section className={styles.questionsSection}>
        <div className={`shell ${styles.questionsGrid}`}>
          <header className={styles.sectionHeader}>
            <small className="eyebrow">Quick answers</small>
            <h2>Popular Questions</h2>
          </header>
          <ol className={styles.questionList}>
            {questions.map((item, index) => (
              <li key={item.question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Link href={item.href}>
                  {item.question} <ArrowUpRight size={17} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.topicIndexSection}>
        <div className="shell">
          <header className={styles.sectionHeader}>
            <small className="eyebrow">Browse the library</small>
            <h2>Explore Residential Architecture Topics</h2>
          </header>
          <div className={styles.topicIndex}>
            {topicNavigation.map((topic) => (
              <Link href={topic.href} key={topic.label}>
                {topic.label} <ArrowUpRight size={16} />
              </Link>
            ))}
            {futureTopics.map((topic) => (
              <div key={topic}>
                <span>{topic}</span>
                <small>Coming soon</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`shell ${styles.finalCtaInner}`}>
          <div>
            <small className="eyebrow">Project-specific guidance</small>
            <h2>Need advice for a specific property?</h2>
          </div>
          <div>
            <p>
              General guidance is useful, but the correct design, planning and
              technical approach depends on the property, planning history, site
              constraints and proposed work.
            </p>
            <a
              className="btn primary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarDays size={17} /> Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
