import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  CalendarDays,
  Check,
  FileText,
  FolderKanban,
} from "lucide-react";
import { articleImageUrl, getBlogPosts, type Article } from "@/lib/articles";
import {
  getProjects,
  projectImageAlt,
  projectImageUrl,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Residential Architecture Knowledge Centre",
  description:
    "Practical guidance on house extensions, planning permission, Building Regulations, new homes, HMOs and residential development from Hepburn Architects.",
  alternates: {
    canonical: "https://www.hepburnarchitects.net/knowledge-centre",
  },
  openGraph: {
    title: "Residential Architecture Knowledge Centre | Hepburn Architects",
    description:
      "Practical guidance on house extensions, planning permission, Building Regulations, new homes, HMOs and residential development from Hepburn Architects.",
    url: "/knowledge-centre",
    type: "website",
    images: [
      {
        url: "/images/house-extension-guide-cover.png",
        width: 1200,
        height: 1500,
        alt: "Planning a House Extension practical guide by Hepburn Architects",
      },
    ],
  },
};

const topics = [
  {
    title: "House Extensions",
    description:
      "Planning, design, permitted development, costs and the full extension process.",
    href: "/knowledge-centre/house-extensions",
  },
  {
    title: "Planning Permission",
    description:
      "Understand planning applications, permitted development, lawful development certificates and common planning constraints.",
    href: "/knowledge-centre/planning-permission",
  },
  {
    title: "Building Regulations",
    description:
      "Guidance on technical design, structure, insulation, fire safety, ventilation and compliance.",
    href: "/knowledge-centre/building-regulations",
  },
  {
    title: "New Build Homes",
    description:
      "Advice on feasibility, planning, design development and technical delivery for new homes and replacement dwellings.",
    href: "/services/new-build-homes",
  },
  {
    title: "HMOs and Conversions",
    description:
      "Planning, layout, fire safety and technical considerations for HMOs and residential conversions.",
    href: "/services/hmo-conversions",
  },
  {
    title: "Small Residential Developments",
    description:
      "Feasibility, planning strategy and design for backland sites, infill plots and small housing schemes.",
    href: "/services/new-build-homes",
  },
  {
    title: "Costs, Fees and Calculators",
    description:
      "Tools and guidance to help clients understand likely professional fees, project budgets and early-stage costs.",
    href: "/estimate",
  },
  {
    title: "Loft Conversions",
    description:
      "Planning, permitted development, headroom, stairs, structure and Building Regulations for loft projects.",
    href: "/services/loft-conversions",
  },
  {
    title: "Rural and Barn Conversions",
    description:
      "Guidance for barn conversions, rural buildings and countryside development opportunities.",
    href: "/projects",
  },
] as const;

const topicLinks = [
  { label: "Planning Permission", href: "/knowledge-centre/planning-permission" },
  { label: "House Extensions", href: "/knowledge-centre/house-extensions" },
  { label: "New Homes", href: "/services/new-build-homes" },
  { label: "HMOs", href: "/services/hmo-conversions" },
  { label: "Building Regulations", href: "/knowledge-centre/building-regulations" },
  { label: "Property Development", href: "/services/new-build-homes" },
] as const;

const featuredGuides = [
  {
    title: "Planning Permission Explained",
    description:
      "A comprehensive guide to planning applications, permitted development, lawful development certificates and common residential constraints.",
    href: "/knowledge-centre/planning-permission",
    label: "Read the planning guide",
  },
  {
    title: "Building Regulations Explained",
    description:
      "A comprehensive guide to approvals, technical drawings, structure, fire safety, energy, ventilation and drainage.",
    href: "/knowledge-centre/building-regulations",
    label: "Read the regulations guide",
  },
  {
    title: "House Extension Costs and Architect Fees",
    description:
      "Understand the factors shaping construction budgets, professional fees and early cost planning.",
    href: "/guides/house-extension-cost-uk",
    label: "Read the cost guide",
  },
] as const;

const tools = [
  {
    icon: Calculator,
    title: "Architectural fee calculator",
    description: "Get an early indication of likely professional fees.",
    href: "/estimate",
    label: "Use the calculator",
  },
  {
    icon: BookOpen,
    title: "House extension guide",
    description: "Plan the main stages of an extension with greater clarity.",
    href: "/house-extension-guide",
    label: "Download the guide",
  },
  {
    icon: FileText,
    title: "Planning guides",
    description: "Explore practical guidance on permissions and applications.",
    href: "/guides",
    label: "Browse planning guidance",
  },
  {
    icon: FolderKanban,
    title: "Project library",
    description: "Filter completed and developing work by residential project type.",
    href: "/projects",
    label: "Explore projects",
  },
] as const;

const journey = [
  "Read practical guidance",
  "Explore relevant projects",
  "Review the matching service",
  "Download a guide or use a calculator",
  "Book a consultation",
] as const;

const projectGroups = [
  ["extension"],
  ["new build", "new-build", "passive", "passivhaus", "replacement"],
  ["hmo", "conversion", "remodelling"],
  ["development", "housing", "infill", "backland"],
  ["barn", "rural", "countryside"],
] as const;

const guidanceTerms = [
  "planning",
  "extension",
  "building regulations",
  "new home",
  "new build",
  "hmo",
  "development",
  "permission",
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
    if (selected.length >= 5) break;
    if (!selected.some((item) => item.slug === project.slug)) selected.push(project);
  }

  return selected;
}

function articleSearchText(article: Article) {
  return [article.title, article.excerpt, article.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function selectRelevantPosts(posts: Article[]) {
  const relevant = posts.filter((post) =>
    guidanceTerms.some((term) => articleSearchText(post).includes(term)),
  );
  return (relevant.length >= 3 ? relevant : posts).slice(0, 3);
}

export default async function KnowledgeCentrePage() {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);
  const selectedProjects = selectVariedProjects(projects);
  const latestGuidance = selectRelevantPosts(posts);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Knowledge Centre",
        item: `${site.url}/knowledge-centre`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={styles.hero}>
        <div className={`shell ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Knowledge Centre</span>
          </nav>
          <small className="eyebrow">Knowledge Centre</small>
          <h1>Residential Architecture Knowledge Centre</h1>
          <div className={styles.heroCopy}>
            <p>
              Practical guidance on planning permission, house extensions, new
              homes, HMOs and residential development from Hepburn Architects.
            </p>
          </div>
          <nav className={styles.topicLinks} aria-label="Knowledge Centre topics">
            {topicLinks.map((topic) => (
              <Link href={topic.href} key={topic.label}>
                {topic.label}
              </Link>
            ))}
          </nav>
          <div className={`actions ${styles.heroActions}`}>
            <a className="btn primary" href="#knowledge-topics">
              Explore the Knowledge Centre <ArrowRight size={18} />
            </a>
            <a
              className="btn secondary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarDays size={18} /> Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      <section className={styles.featuredGuides}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <small className="eyebrow">Editor’s selection</small>
            <h2>Featured Guides</h2>
          </div>
          <div className={styles.featuredLayout}>
            <Link className={styles.leadGuide} href="/knowledge-centre/house-extensions">
              <div className={styles.cover}>
                <Image
                  src="/images/house-extension-guide-cover.png"
                  alt="Cover of Planning a House Extension, a practical homeowner’s guide"
                  fill
                  sizes="(max-width: 700px) 76vw, (max-width: 1000px) 38vw, 360px"
                />
              </div>
              <div className={styles.leadGuideCopy}>
                <small>Featured authority guide</small>
                <h3>The Complete Guide to House Extensions</h3>
                <p>
                  An in-depth guide to extension types, planning permission, design,
                  budgets, Building Regulations and the complete project process.
                </p>
                <strong>
                  Read the complete guide <ArrowRight size={18} />
                </strong>
              </div>
            </Link>
            <div className={styles.featuredList}>
              {featuredGuides.map((guide, index) => (
                <Link href={guide.href} key={guide.title}>
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <div>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <strong>
                      {guide.label} <ArrowUpRight size={17} />
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="knowledge-topics" className={styles.topicsSection}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <small className="eyebrow">Browse by subject</small>
            <h2>Explore residential architecture guidance</h2>
          </div>
          <div className={styles.topicGrid}>
            {topics.map((topic, index) => (
              <Link className={styles.topicCard} href={topic.href} key={topic.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
                <strong aria-hidden="true">
                  View topic <ArrowUpRight size={18} />
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.toolsSection}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <small className="eyebrow">Practical resources</small>
            <h2>Useful tools before you begin</h2>
          </div>
          <div className={styles.toolsGrid}>
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link href={tool.href} className={styles.toolCard} key={tool.title}>
                  <Icon aria-hidden="true" />
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <strong>
                    {tool.label} <ArrowRight size={17} />
                  </strong>
                </Link>
              );
            })}
          </div>
          <div className={styles.consultationRow}>
            <div>
              <small>Not sure where to start?</small>
              <p>Discuss the property and the most useful first step with an architect.</p>
            </div>
            <a
              className="btn light-btn"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {selectedProjects.length > 0 && (
        <section className={styles.projectsSection}>
          <div className="shell">
            <div className={styles.headingRow}>
              <div className={styles.sectionHeading}>
                <small className="eyebrow">Selected work</small>
                <h2>Residential projects and case studies</h2>
              </div>
              <Link href="/projects" className={styles.textLink}>
                View all projects <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className={styles.projectGrid}>
              {selectedProjects.map((project) => (
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.projectCard}
                  key={project.slug}
                >
                  <div className={styles.projectImage}>
                    <Image
                      src={projectImageUrl(project.featuredImage, 1200)}
                      alt={projectImageAlt(project)}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <small>
                      {project.location} · {project.projectType}
                    </small>
                    <h3>{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {latestGuidance.length > 0 && (
        <section className={styles.journalSection}>
          <div className="shell">
            <div className={styles.headingRow}>
              <div className={styles.sectionHeading}>
                <small className="eyebrow">From the Journal</small>
                <h2>Latest guidance and practice insights</h2>
              </div>
              <Link href="/blog" className={styles.textLink}>
                View the Journal <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className={styles.journalGrid}>
              {latestGuidance.map((post) => {
                const image = articleImageUrl(post.featuredImage, 1000);
                return (
                  <article className={styles.journalCard} key={post._id}>
                    {image && (
                      <div className={styles.journalImage}>
                        <Image
                          src={image}
                          alt={post.featuredImage?.alt || post.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div>
                      <small>{post.category || "Journal"}</small>
                      <h3>{post.title}</h3>
                      <Link href={`/blog/${post.slug}`}>
                        Read article <ArrowRight size={17} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={styles.journeySection}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <small className="eyebrow">A connected route</small>
            <h2>From early research to a completed design</h2>
          </div>
          <ol className={styles.journey}>
            {journey.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Check aria-hidden="true" />
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`shell ${styles.finalCtaInner}`}>
          <small className="eyebrow">Discuss your next step</small>
          <h2>Need advice about a property or project?</h2>
          <p>
            Book a free 30-minute consultation to discuss your property, planning
            position and the most sensible next steps.
          </p>
          <a
            className="btn primary"
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDays size={18} /> Book a Free Consultation
          </a>
        </div>
      </section>
    </>
  );
}
