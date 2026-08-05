import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  CalendarDays,
  Compass,
  DraftingCompass,
  Home,
  MapPin,
} from "lucide-react";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";
import {
  getFeaturedCaseStudy,
  getFeaturedProjects,
  getProjects,
  projectImageAlt,
  projectImageUrl,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";
import { ROOT_TITLE } from "@/lib/seo";
import { getHomepageReviews } from "@/lib/reviews";
import { ReviewQuote } from "@/components/reviews/RelevantReview";
import { StructuredData } from "@/components/StructuredData";
import { buildArchitectSchema, buildBusinessLocationSchema, buildGraph, buildOrganisationSchema, buildWebPageSchema, buildWebSiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: ROOT_TITLE },
  description:
    "Director-led residential architects for extensions, lofts, new homes, HMOs, planning and Building Regulations across Birmingham and Solihull.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Residential Architects Birmingham & West Midlands | Hepburn Architects",
    description:
      "Director-led residential architecture, planning and technical design across Birmingham, Solihull and the West Midlands.",
    url: "/",
    images: [
      {
        url: "/images/social-sharing.jpg",
        width: 1200,
        height: 630,
        alt: "Contemporary residential design by Hepburn Architects",
      },
    ],
  },
};

const servicePathways = [
  {
    icon: Home,
    number: "01",
    title: "Homes and extensions",
    body: "Design-led support for improving an existing home or creating a new one, from early feasibility through planning.",
    links: [
      { label: "House extensions", href: "/services/house-extensions" },
      { label: "Loft conversions", href: "/services/loft-conversions" },
      { label: "New-build homes", href: "/services/new-build-homes" },
    ],
  },
  {
    icon: Compass,
    number: "02",
    title: "Planning and development",
    body: "Clear planning strategy for residential proposals, HMOs, changes of use and development opportunities.",
    links: [
      { label: "Planning applications", href: "/services/planning-applications" },
      { label: "HMO conversions", href: "/services/hmo-conversions" },
      { label: "Local planning expertise", href: "/locations" },
    ],
  },
  {
    icon: DraftingCompass,
    number: "03",
    title: "Technical design",
    body: "Coordinated information for Building Regulations, consultant input and a more buildable route forward.",
    links: [
      { label: "Building Regulations", href: "/services/building-regulations" },
      { label: "Fee calculator", href: "/estimate" },
      { label: "Discuss your project", href: "/contact" },
    ],
  },
];

const featuredGuides = [
  {
    number: "01",
    title: "Planning a House Extension",
    description:
      "A practical homeowner’s guide to planning, design, budgets, Building Regulations and the main project stages.",
    href: "/house-extension-guide",
  },
  {
    number: "02",
    title: "Planning Permission Explained",
    description:
      "Understand when permission may be needed and how permitted development fits into the process.",
    href: "/guides/planning-permission-house-extension",
  },
  {
    number: "03",
    title: "Building Regulations Guidance",
    description:
      "A clear introduction to technical drawings, compliance and the path to Building Control approval.",
    href: "/guides/building-regulations-drawings",
  },
];

const locationLinks = [
  ["Birmingham", "/locations/birmingham-architects"],
  ["Solihull", "/locations/solihull-architects"],
  ["Moseley", "/locations/moseley-architects"],
  ["Harborne", "/locations/harborne-architects"],
  ["Edgbaston", "/locations/edgbaston-architects"],
  ["Sutton Coldfield", "/locations/sutton-coldfield-architects"],
] as const;

function uniqueProjects(projects: Project[]) {
  return projects.filter(
    (project, index, allProjects) =>
      allProjects.findIndex((item) => item.slug === project.slug) === index,
  );
}

function cleanExcerpt(excerpt?: string) {
  return (excerpt || "")
    .replace(/^summary\s*/i, "")
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function HomePage() {
  const [posts, featuredProjects, allProjects, signatureProject, homepageReviews] = await Promise.all([
    getBlogPosts(),
    getFeaturedProjects(),
    getProjects(),
    getFeaturedCaseStudy(),
    getHomepageReviews(),
  ]);

  const projectPool = uniqueProjects([...featuredProjects, ...allProjects]);
  const selectedProjects = projectPool.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const featurePost = latestPosts[0];
  const supportingPosts = latestPosts.slice(1);

  return (
    <>
      <StructuredData data={buildGraph(buildWebSiteSchema(), buildWebPageSchema({ url: `${site.url}/`, name: "Hepburn Architects", description: site.description }), buildOrganisationSchema(), buildBusinessLocationSchema("birmingham"), buildBusinessLocationSchema("nunthorpe"), buildArchitectSchema())} />
      <section className="hero home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <small className="eyebrow">
              Residential architecture · planning · technical design
            </small>
            <h1>Residential architects creating exceptional homes.</h1>
            <p>
              Design, planning and Building Regulations expertise for extensions,
              loft conversions, new homes, HMOs and residential developments across
              Birmingham, Solihull and the wider West Midlands.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">
                Get an indicative fee <ArrowRight size={18} />
              </Link>
              <a
                className="btn secondary"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarDays size={18} /> Book a free consultation
              </a>
            </div>
          </div>

          <div className="hero-visual photo-frame">
            <Image
              src="/images/homepage-hero.webp"
              alt="Contemporary residential home designed by Hepburn Architects"
              fill
              priority
              sizes="(max-width: 950px) 100vw, 45vw"
              className="hero-image"
            />
            <div className="hero-note">
              Residential design with planning strategy built in
            </div>
          </div>
        </div>
      </section>

      <section className="trust-proof home-trust-strip" aria-label="Practice credentials">
        <div className="shell trust-proof-grid">
          <div>
            <strong>ARB</strong>
            <span>Registered architect</span>
          </div>
          <div>
            <strong>RIBA</strong>
            <span>Chartered Practice</span>
          </div>
          <div>
            <strong>Director-led</strong>
            <span>Speak directly with David</span>
          </div>
          <Link href="/reviews">
            <strong>Client reviews</strong>
            <span>Read verified client experiences</span>
          </Link>
        </div>
      </section>

      <section className="home-project-section">
        <div className="shell home-section-heading">
          <div>
            <small className="eyebrow">Selected residential work</small>
            <h2>Architecture shaped around real homes and real lives.</h2>
          </div>
          <Link className="home-text-link" href="/projects">
            View all projects <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="shell home-project-grid">
          {selectedProjects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              className={`home-project-card ${index === 0 ? "home-project-main" : "home-project-small"}`}
              key={project.slug}
            >
              <div className="home-project-image">
                <Image
                  src={projectImageUrl(project.featuredImage, index === 0 ? 1600 : 900)}
                  alt={projectImageAlt(project)}
                  fill
                  sizes={index === 0 ? "(max-width: 950px) 100vw, 66vw" : "(max-width: 950px) 100vw, 33vw"}
                />
              </div>
              <div className="home-project-overlay">
                <span>{project.location} · {project.projectType}</span>
                <strong>{project.title}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {signatureProject && (
        <section className="home-case-study-section">
          <div className="shell home-case-study-grid">
            <div className="home-case-study-image">
              <Image
                src={projectImageUrl(signatureProject.featuredImage, 1600)}
                alt={projectImageAlt(signatureProject)}
                fill
                sizes="(max-width: 950px) 100vw, 62vw"
              />
            </div>
            <div className="home-case-study-copy">
              <small className="eyebrow">Featured case study</small>
              <h2>{signatureProject.title}</h2>
              <p className="lead">{signatureProject.description}</p>
              <dl className="home-case-study-facts">
                <div>
                  <dt>Location</dt>
                  <dd><MapPin size={15} /> {signatureProject.location}</dd>
                </div>
                <div>
                  <dt>Project type</dt>
                  <dd>{signatureProject.projectType}</dd>
                </div>
              </dl>
              <Link className="btn light-btn" href={`/projects/${signatureProject.slug}`}>
                Read the case study <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section home-studio-section">
        <div className="shell home-studio-grid">
          <div className="home-studio-photo">
            <Image
              src="/images/david-hepburn-studio.jpg"
              alt="David Hepburn, founding director of Hepburn Architects"
              fill
              sizes="(max-width: 950px) 100vw, 42vw"
            />
            <div className="home-studio-caption">
              <small>Founding Director</small>
              <strong>David Hepburn</strong>
              <span>ARB · RIBA</span>
            </div>
          </div>

          <div className="home-studio-copy">
            <small className="eyebrow">Why Hepburn Architects</small>
            <h2>Clear, personal guidance from first appraisal to technical design.</h2>
            <p className="lead">
              Work directly with David throughout the design, planning and Building
              Regulations stages of your residential project.
            </p>
            <div className="home-studio-points">
              <div>
                <span>01</span>
                <div>
                  <h3>Director-led throughout</h3>
                  <p>No handover to a junior team after the first meeting.</p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Planning-aware design</h3>
                  <p>Architecture and approval strategy developed together.</p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>Design and technical continuity</h3>
                  <p>The concept is carried through into coordinated technical information.</p>
                </div>
              </div>
              <div>
                <span>04</span>
                <div>
                  <h3>Advice proportionate to the project</h3>
                  <p>Clear stages and outputs without unnecessary complexity.</p>
                </div>
              </div>
            </div>
            <div className="actions">
              <Link className="btn primary" href="/about">
                Meet the studio <ArrowRight size={18} />
              </Link>
              <Link className="btn secondary" href="/contact">
                Discuss your project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-services-section">
        <div className="shell home-section-heading home-section-heading-light">
          <div>
            <small className="eyebrow">How we can help</small>
            <h2>Three clear routes through a residential project.</h2>
          </div>
          <p>
            Appoint Hepburn Architects for planning, technical design, or a coordinated
            route through both stages.
          </p>
        </div>

        <div className="shell home-service-pathways">
          {servicePathways.map((pathway) => {
            const Icon = pathway.icon;
            return (
              <article className="home-service-pathway" key={pathway.title}>
                <div className="home-service-pathway-topline">
                  <span>{pathway.number}</span>
                  <Icon />
                </div>
                <h3>{pathway.title}</h3>
                <p>{pathway.body}</p>
                <div className="home-service-links">
                  {pathway.links.map((link) => (
                    <Link href={link.href} key={link.href}>
                      {link.label} <ArrowUpRight size={17} />
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-fee-section">
        <div className="shell home-fee-callout">
          <div className="home-fee-icon"><Calculator /></div>
          <div>
            <small className="eyebrow">Start with clearer costs</small>
            <h2>Get an early indication of likely architectural fees.</h2>
            <p>
              Choose the project type, approximate size and services required to see an
              indicative appointment before arranging a consultation.
            </p>
          </div>
          <Link className="btn light-btn" href="/estimate">
            Use the fee calculator <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="section home-knowledge-section">
        <div className="shell home-section-heading home-section-heading-light">
          <div>
            <small className="eyebrow">Advice before you begin</small>
            <h2>Practical guidance for a clearer route forward.</h2>
          </div>
          <Link className="home-text-link home-text-link-light" href="/knowledge-centre">
            Explore the Knowledge Centre <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="shell home-knowledge-grid">
          <Link className="home-guide-feature" href={featuredGuides[0].href}>
            <div>
              <BookOpen />
              <span>{featuredGuides[0].number}</span>
            </div>
            <h3>{featuredGuides[0].title}</h3>
            <p>{featuredGuides[0].description}</p>
            <strong>Download the free guide <ArrowRight size={18} /></strong>
          </Link>

          <div className="home-guide-supporting">
            {featuredGuides.slice(1).map((guide) => (
              <Link href={guide.href} key={guide.href}>
                <span>{guide.number}</span>
                <div>
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                </div>
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featurePost && (
        <section className="section home-journal-section">
          <div className="shell home-section-heading">
            <div>
              <small className="eyebrow">Latest journal</small>
              <h2>Projects, planning updates and studio news.</h2>
            </div>
            <Link className="home-text-link" href="/blog">
              View the journal <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="shell home-journal-grid">
            <article className="home-journal-feature">
              <div className="home-journal-feature-image">
                <Image
                  src={articleImageUrl(featurePost.featuredImage, 1400) || "/images/og.svg"}
                  alt={featurePost.featuredImage?.alt || featurePost.title}
                  fill
                  sizes="(max-width: 950px) 100vw, 62vw"
                />
              </div>
              <div>
                <small>{featurePost.category || "Journal"}</small>
                <h3>{featurePost.title}</h3>
                <p>{cleanExcerpt(featurePost.excerpt)}</p>
                <Link href={`/blog/${featurePost.slug}`}>
                  Read article <ArrowRight size={17} />
                </Link>
              </div>
            </article>

            <div className="home-journal-supporting">
              {supportingPosts.map((post) => (
                <article key={post._id}>
                  <div className="home-journal-small-image">
                    <Image
                      src={articleImageUrl(post.featuredImage, 900) || "/images/og.svg"}
                      alt={post.featuredImage?.alt || post.title}
                      fill
                      sizes="(max-width: 950px) 100vw, 26vw"
                    />
                  </div>
                  <div>
                    <small>{post.category || "Journal"}</small>
                    <h3>{post.title}</h3>
                    <Link href={`/blog/${post.slug}`}>
                      Read article <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="home-location-strip">
        <div className="shell">
          <div>
            <small className="eyebrow">Local expertise</small>
            <strong>Residential architects across Birmingham and the West Midlands.</strong>
          </div>
          <nav aria-label="Local architecture pages">
            {locationLinks.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </nav>
        </div>
      </section>

      {homepageReviews[0] ? <ReviewQuote review={homepageReviews[0]} compact /> : null}

      <section className="section dark-section">
        <div className="shell final-cta">
          <small className="eyebrow">Start with a clear next step</small>
          <h2>Discuss your residential project directly with David.</h2>
          <p>
            Book a consultation, call the studio or use the fee calculator for an early
            indication of the likely architectural appointment.
          </p>
          <div className="actions centered-actions">
            <a
              className="btn primary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book consultation
            </a>
            <Link className="btn light-btn" href="/estimate">
              Get an indicative fee
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
