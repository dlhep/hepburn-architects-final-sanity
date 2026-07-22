import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Compass, DraftingCompass, Home, Ruler, ShieldCheck, Search, FileCheck2, Layers3, Instagram } from "lucide-react";
import { services, locations, guides } from "@/lib/content";
import { site } from "@/lib/site";
import { articleImageUrl, getBlogPosts } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Residential Architects Birmingham & West Midlands | Hepburn Architects",
  description:
    "ARB-registered residential architects for house extensions, loft conversions, new homes, HMOs, planning and Building Regulations across Birmingham, Solihull and the West Midlands.",
  alternates: { canonical: "/" },
};

const photos = [
  { src: "/images/homepage-hero.png", alt: "Modern residential rear extension with large glazing and landscaped garden" },
  { src: "/images/selected-work-2.png", alt: "Contemporary dark-clad extension to a traditional house" },
];

export default async function HomePage() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <small className="eyebrow">Residential architecture · planning · technical design</small>
            <h1>Residential architects creating exceptional homes.</h1>
            <p>Design, planning and Building Regulations expertise for extensions, loft conversions, new homes, HMOs and residential developments across Birmingham, Solihull and the wider West Midlands.</p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={18} /></Link>
              <a className="btn secondary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} />Book a free consultation</a>
            </div>
            <div className="hero-trust"><span><ShieldCheck />ARB registered</span><span><CheckCircle2 />RIBA Chartered Practice</span></div>
          </div>
          <div className="hero-visual photo-frame">
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              priority
              sizes="(max-width: 950px) 100vw, 45vw"
              className="hero-image"
            />
            <div className="hero-note">Residential design with planning strategy built in</div>
          </div>
        </div>
      </section>

      <section className="trust-proof">
        <div className="shell trust-proof-grid">
          <div><strong>ARB</strong><span>Registered architect</span></div>
          <div><strong>RIBA</strong><span>Chartered Practice</span></div>
          <div><strong>Director-led</strong><span>Speak directly with David</span></div>
          <a href={site.googleBusiness} target="_blank" rel="noopener noreferrer"><strong>Google</strong><span>View our business profile</span></a>
        </div>
      </section>

      <section className="section sand-section selected-work-section">
        <div className="shell">
          <div className="selected-work-heading"><small className="eyebrow">Selected residential work</small><h2>Architecture shaped around real homes and real lives.</h2></div>
          <div className="selected-work-grid">
            <Link href="/projects" className="selected-work-main" aria-label="View selected new home projects">
              <Image src="/images/selected-work-1.png" alt="Contemporary rendered home with timber cladding and glazed gable" width={1400} height={1000} sizes="(max-width: 950px) 100vw, 66vw" />
              <div className="selected-work-overlay"><span>New homes</span><strong>Contemporary residential design</strong></div>
            </Link>
            <Link href="/projects" className="selected-work-small" aria-label="View residential extension projects">
              <Image src="/images/selected-work-2.png" alt="Contemporary dark-clad extension to a traditional stone house" width={1000} height={700} sizes="(max-width: 950px) 100vw, 33vw" />
              <div className="selected-work-overlay"><span>Extensions</span><strong>Old and new in balance</strong></div>
            </Link>
            <Link href="/projects" className="selected-work-small" aria-label="View residential conversion projects">
              <Image src="/images/selected-work-3.png" alt="Stone barn conversion with landscaped terrace" width={1000} height={700} sizes="(max-width: 950px) 100vw, 33vw" />
              <div className="selected-work-overlay"><span>Conversions</span><strong>Character retained, space transformed</strong></div>
            </Link>
          </div>
          <div className="selected-work-action"><Link className="btn primary" href="/projects">View all projects <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-intro"><div><small className="eyebrow">Before drawings begin</small><h2>Four answers create a clearer route forward.</h2></div><p>Every project is different. These early decisions work for extensions, conversions, HMOs, remodelling, new homes and small developments.</p></div>
        <div className="shell answer-grid">
          <article><span>01</span><Home /><h3>What are you planning?</h3><p>Define the project type, spaces, occupancy and what success looks like.</p></article>
          <article><span>02</span><Search /><h3>What does the property allow?</h3><p>Review the building, site, planning history, access and physical constraints.</p></article>
          <article><span>03</span><FileCheck2 /><h3>Which approval route applies?</h3><p>Permitted development, lawful development, full planning, prior approval or technical approval.</p></article>
          <article><span>04</span><Layers3 /><h3>What information is needed next?</h3><p>Survey, design options, planning drawings, technical information or specialist reports.</p></article>
        </div>
      </section>

      <section className="image-band">
        <div className="shell image-band-grid">
          <Image src={photos[1].src} alt={photos[1].alt} width={1400} height={1000} sizes="(max-width: 950px) 100vw, 55vw" />
          <div><small className="eyebrow">Design that adds value</small><h2>Light, proportion and materials should work as hard as the floor plan.</h2><p>We look beyond simply adding area. The strongest residential projects improve circulation, outlook, daylight and the relationship between inside and outside.</p><Link className="btn primary" href="/projects">Explore projects <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section why-hepburn-section">
        <div className="shell why-hepburn-grid">
          <div className="why-hepburn-image"><Image src="/images/architectural-expertise-home.webp" alt="Contemporary new build home with brick, render and full-height glazing" width={1200} height={1000} sizes="(max-width: 950px) 100vw, 48vw" /></div>
          <div className="why-hepburn-content">
            <small className="eyebrow">Why Hepburn Architects</small>
            <h2>Architectural expertise with clear, personal guidance.</h2>
            <p>Work directly with a Chartered Architect throughout the design, planning and technical stages of your residential project.</p>
            <ul className="why-hepburn-list"><li><span>✓</span> ARB Registered Architect</li><li><span>✓</span> RIBA Chartered Practice</li><li><span>✓</span> Direct involvement from David</li><li><span>✓</span> Residential planning and technical expertise</li><li><span>✓</span> Clear advice without unnecessary jargon</li><li><span>✓</span> Design focused on value, light and usability</li></ul>
            <Link className="btn primary" href="/contact">Book a consultation <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-intro"><div><small className="eyebrow">Services</small><h2>From first appraisal to construction-ready information.</h2></div><p>Choose a complete route or appoint only the stages you need.</p></div>
        <div className="shell service-grid">{services.map((service, index) => { const Icons = [Home, Ruler, Compass, DraftingCompass, ShieldCheck, CheckCircle2]; const Icon = Icons[index % Icons.length]; return <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}><Icon /><small>0{index + 1}</small><h3>{service.shortTitle}</h3><p>{service.description}</p><span>Explore service <ArrowRight size={16} /></span></Link>; })}</div>
      </section>

      <section className="section dark-section">
        <div className="shell package-intro"><small className="eyebrow">Clear service packages</small><h2>Defined stages. Clear outputs. Fewer surprises.</h2></div>
        <div className="shell package-grid">
          <article><div className="package-number">01</div><small>Start</small><h3>Planning Foundation</h3><p>For clients who need the existing property recorded and a clear planning design prepared.</p><ul><li>Measured survey option</li><li>Design development</li><li>Planning drawings</li><li>Application submission</li></ul><Link href="/estimate">Estimate this package <ArrowRight /></Link></article>
          <article className="featured-package"><div className="package-number">02</div><small>Most popular</small><h3>Planning + Technical</h3><p>A coordinated route from initial design through planning and Building Regulations.</p><ul><li>Design and planning</li><li>Building Regulations drawings</li><li>Consultant coordination</li><li>Building Control support</li></ul><Link href="/estimate">Estimate this package <ArrowRight /></Link></article>
          <article><div className="package-number">03</div><small>Focused support</small><h3>Technical Design</h3><p>For clients who already hold planning approval and need the project developed technically.</p><ul><li>Construction information</li><li>Fire and thermal coordination</li><li>Drainage and ventilation</li><li>Building Control submission</li></ul><Link href="/estimate">Estimate this package <ArrowRight /></Link></article>
        </div>
      </section>

      <section className="section founder-home-section">
        <div className="shell founder-home-grid">
          <div className="founder-home-photo">
            <Image src="https://www.hepburnarchitects.com/wp-content/uploads/2026/06/David-Hepburn.png" alt="David Hepburn, founding director of Hepburn Architects" width={1000} height={1200} sizes="(max-width: 950px) 100vw, 42vw" />
            <div className="founder-home-label"><small>Founding Director</small><strong>David Hepburn</strong><span>ARB · RIBA</span></div>
          </div>
          <div><small className="eyebrow">A director-led practice</small><h2>Clear advice from the first conversation.</h2><p className="lead">David Hepburn is an ARB-registered architect with extensive residential experience across new homes, extensions, conversions and planning-led development.</p><p>Hepburn Architects combines design ambition with practical advice about planning, technical compliance, budget and the information a project genuinely needs next.</p><ul className="tick-list"><li><CheckCircle2 />More than twenty years in architecture</li><li><CheckCircle2 />Residential design and planning specialist</li><li><CheckCircle2 />Direct, straightforward communication</li><li><CheckCircle2 />ARB registered and RIBA Chartered Practice</li></ul><div className="actions"><Link className="btn primary" href="/about">Meet the studio <ArrowRight /></Link><a className="btn secondary" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a></div></div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-intro"><div><small className="eyebrow">Local expertise</small><h2>Residential architects across Birmingham and the West Midlands.</h2></div><p>Focused guidance for Birmingham, Solihull and established residential areas across the region.</p></div>
        <div className="shell location-grid">{locations.map((location) => <Link href={`/locations/${location.slug}`} key={location.slug}><span>{location.shortTitle}</span><ArrowRight /></Link>)}</div>
      </section>

      <section className="section dark-section">
        <div className="shell split-intro light"><div><small className="eyebrow">Knowledge centre</small><h2>Planning and design guidance people actually search for.</h2></div><p>Practical articles covering extensions, lofts, conversions, HMOs, fees and technical approvals.</p></div>
        <div className="shell guide-grid">{guides.slice(0, 8).map((guide) => <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}><small>Guide</small><h3>{guide.shortTitle}</h3><p>{guide.description}</p><span>Read guide <ArrowRight size={16} /></span></Link>)}</div>
        <div className="shell centered-action"><Link className="btn light-btn" href="/guides">Browse all guides</Link></div>
      </section>

      {latestPosts.length > 0 && (
        <section className="section sand-section">
          <div className="shell split-intro"><div><small className="eyebrow">Latest journal</small><h2>Projects, planning updates and studio news.</h2></div><p>Current work and useful observations from a residential architecture practice.</p></div>
          <div className="shell projects-grid">
            {latestPosts.map((post) => {
              const image = articleImageUrl(post.featuredImage, 1000);
              return <article key={post._id}>{image ? <Image src={image} alt={post.featuredImage?.alt || post.title} width={1000} height={650} sizes="(max-width: 650px) 100vw, 50vw" /> : null}<div><small>{post.category || "Journal"}</small><h2>{post.title}</h2><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`}>Read article <ArrowRight size={16} /></Link></div></article>;
            })}
          </div>
          <div className="shell centered-action"><Link className="btn primary" href="/blog">View the journal</Link></div>
        </section>
      )}

      <section className="section">
        <div className="shell social-showcase">
          <div><Instagram /><small className="eyebrow">Follow the studio</small><h2>Projects, drawings and planning insights.</h2><p>See current work and practical residential design advice.</p><a className="btn primary" href={site.instagram} target="_blank" rel="noopener noreferrer">Follow on Instagram</a></div>
          <div className="social-photo-grid"><Image src="/images/selected-work-1.png" alt="Contemporary residential design project" width={900} height={900} sizes="(max-width: 650px) 100vw, 30vw" /><Image src="/images/selected-work-3.png" alt="Residential barn conversion project" width={900} height={900} sizes="(max-width: 650px) 100vw, 30vw" /></div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell final-cta">
          <small className="eyebrow">Start with a clear next step</small>
          <h2>Discuss your residential project directly with David.</h2>
          <p>Book a consultation, call the studio or use the fee calculator for an early indication of the likely architectural appointment.</p>
          <div className="actions centered-actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a><Link className="btn light-btn" href="/estimate">Get an indicative fee</Link></div>
        </div>
      </section>
    </>
  );
}
