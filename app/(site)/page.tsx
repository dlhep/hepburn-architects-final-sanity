import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Compass, DraftingCompass, Home, Ruler, ShieldCheck, Search, FileCheck2, Layers3, Instagram, MapPin } from "lucide-react";
import { services, locations, guides } from "@/lib/content";
import { site } from "@/lib/site";
import { getFeaturedProjects, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { GoogleReviewPanel } from "@/components/GoogleReviewPanel";

export const metadata: Metadata = {
  title: "Residential Architects Birmingham & Teesside | Hepburn Architects",
  description:
    "ARB-registered residential architects for house extensions, loft conversions, new homes, HMOs, planning and Building Regulations across Birmingham, the West Midlands and Teesside.",
  alternates: { canonical: "/" },
};

const photos=[
  {src:"/images/homepage-hero.png",alt:"Modern residential rear extension with large glazing and landscaped garden"},
  {src:"https://www.hepburnarchitects.com/wp-content/uploads/2024/09/Black-cladding-extension.png",alt:"Black-clad contemporary house extension designed by Hepburn Architects"},
  {src:"https://www.hepburnarchitects.com/wp-content/uploads/2023/11/MINGE-LANE-1.webp",alt:"Contemporary bungalow renovation at Upton upon Severn by Hepburn Architects"},
];

export default async function HomePage(){
 const projects = await getFeaturedProjects();
 return <>
  <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><small className="eyebrow">Residential architecture · planning · technical design</small><h1>Residential architects creating exceptional homes.</h1><p>Design, planning and Building Regulations expertise for extensions, loft conversions, new homes, HMOs and residential developments across Birmingham, the West Midlands, Teesside and the wider UK.</p><div className="actions"><Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={18}/></Link><a className="btn secondary" href={site.calendly}><CalendarDays size={18}/>Book a free consultation</a></div><div className="hero-trust"><span><ShieldCheck/>ARB registered</span><span><CheckCircle2/>RIBA Chartered Practice</span></div></div><div className="hero-visual photo-frame"><img src={photos[0].src} alt={photos[0].alt}/><div className="hero-note">Residential design with planning strategy built in</div></div></div></section>

  <section className="trust-proof">
    <div className="shell trust-proof-grid">
      <div><strong>ARB</strong><span>Registered architect</span></div>
      <div><strong>RIBA</strong><span>Chartered Practice</span></div>
      <div><strong>Director-led</strong><span>Speak directly with David</span></div>
      <a href={site.googleBusiness} target="_blank" rel="noopener noreferrer"><strong>Google</strong><span>View our business profile</span></a>
    </div>
  </section>

  <section className="section featured-projects-home">
    <div className="shell split-intro">
      <div><small className="eyebrow">Selected genuine work</small><h2>Residential projects by Hepburn Architects.</h2></div>
      <p>Explore sustainable new homes, extensions and whole-house transformations developed for real clients and sites.</p>
    </div>
    <div className="shell featured-project-grid">
      {projects.slice(0, 3).map((project) => (
        <Link href={`/projects/${project.slug}`} key={project.slug}>
          <img src={projectImageUrl(project.featuredImage, 1200)} alt={projectImageAlt(project)} loading="lazy"/>
          <small>{project.location}</small>
          <h3>{project.title}</h3>
        </Link>
      ))}
    </div>
  </section>

  <section className="section"><div className="shell split-intro"><div><small className="eyebrow">Before drawings begin</small><h2>Four answers create a clearer route forward.</h2></div><p>Every project is different. These four early decisions work for extensions, conversions, HMOs, remodelling, new homes and small developments.</p></div>
   <div className="shell answer-grid">
    <article><span>01</span><Home/><h3>What are you planning?</h3><p>Define the project type, spaces, occupancy and what success looks like.</p></article>
    <article><span>02</span><Search/><h3>What does the property allow?</h3><p>Review the building, site, planning history, access and physical constraints.</p></article>
    <article><span>03</span><FileCheck2/><h3>Which approval route applies?</h3><p>Permitted development, lawful development, full planning, prior approval or technical approval.</p></article>
    <article><span>04</span><Layers3/><h3>What information is needed next?</h3><p>Survey, design options, planning drawings, technical information or specialist reports.</p></article>
   </div>
  </section>

  <section className="image-band"><div className="shell image-band-grid"><img src={photos[1].src} alt={photos[1].alt}/><div><small className="eyebrow">Design that adds value</small><h2>Light, proportion and materials should work as hard as the floor plan.</h2><p>We look beyond simply adding area. The strongest residential projects improve circulation, outlook, daylight and the relationship between inside and outside.</p><Link className="btn primary" href="/projects">Explore projects <ArrowRight size={18}/></Link></div></div></section>

  <section className="section"><div className="shell split-intro"><div><small className="eyebrow">Services</small><h2>From first appraisal to construction-ready information.</h2></div><p>Choose a complete route or appoint only the stages you need.</p></div><div className="shell service-grid">{services.map((s,i)=>{const Icons=[Home,Ruler,Compass,DraftingCompass,ShieldCheck,CheckCircle2];const Icon=Icons[i%Icons.length];return <Link className="service-card" href={`/services/${s.slug}`} key={s.slug}><Icon/><small>0{i+1}</small><h3>{s.shortTitle}</h3><p>{s.description}</p><span>Explore service <ArrowRight size={16}/></span></Link>})}</div></section>

  <section className="section dark-section"><div className="shell package-intro"><small className="eyebrow">Clear service packages</small><h2>Defined stages. Clear outputs. Fewer surprises.</h2></div><div className="shell package-grid">
   <article><div className="package-number">01</div><small>Start</small><h3>Planning Foundation</h3><p>For clients who need the existing property recorded and a clear planning design prepared.</p><ul><li>Measured survey option</li><li>Design development</li><li>Planning drawings</li><li>Application submission</li></ul><Link href="/estimate">Estimate this package <ArrowRight/></Link></article>
   <article className="featured-package"><div className="package-number">02</div><small>Most popular</small><h3>Planning + Technical</h3><p>A coordinated route from initial design through planning and Building Regulations.</p><ul><li>Design and planning</li><li>Building Regulations drawings</li><li>Consultant coordination</li><li>Building Control support</li></ul><Link href="/estimate">Estimate this package <ArrowRight/></Link></article>
   <article><div className="package-number">03</div><small>Focused support</small><h3>Technical Design</h3><p>For clients who already hold planning approval and need the project developed technically.</p><ul><li>Construction information</li><li>Fire and thermal coordination</li><li>Drainage and ventilation</li><li>Building Control submission</li></ul><Link href="/estimate">Estimate this package <ArrowRight/></Link></article>
  </div></section>

  <section className="section sand-section"><div className="shell visual-project-grid"><div><small className="eyebrow">Selected residential work</small><h2>Built around real sites, real constraints and real lives.</h2><p>View extensions, new homes, Passivhaus projects and whole-house transformations from the Hepburn portfolio.</p><Link className="btn primary" href="/projects">View all projects <ArrowRight/></Link></div><img src={photos[2].src} alt={photos[2].alt}/></div></section>



  <section className="section before-after-promo">
    <div className="shell before-after-promo-grid">
      <div className="before-after-promo-images">
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=82" alt="Traditional house before architectural extension and remodelling"/>
        <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=88" alt="Modern glazed residential extension after architectural transformation"/>
      </div>
      <div>
        <small className="eyebrow">Before and after</small>
        <h2>See what thoughtful residential design can change.</h2>
        <p>Explore interactive transformation examples showing how extensions, remodelling and better material choices can unlock a property.</p>
        <Link className="btn primary" href="/before-after">View transformations <ArrowRight size={17}/></Link>
      </div>
    </div>
  </section>

  <section className="section founder-home-section">
    <div className="shell founder-home-grid">
      <div className="founder-home-photo">
        <img
          src="https://www.hepburnarchitects.com/wp-content/uploads/2026/06/David-Hepburn.png"
          alt="David Hepburn, founding director of Hepburn Architects"
        />
        <div className="founder-home-label"><small>Founding Director</small><strong>David Hepburn</strong><span>ARB · RIBA</span></div>
      </div>
      <div>
        <small className="eyebrow">A director-led practice</small>
        <h2>Clear advice from the first conversation.</h2>
        <p className="lead">David Hepburn is an ARB-registered architect with extensive residential experience across new homes, extensions, conversions and planning-led development.</p>
        <p>Hepburn Architects combines design ambition with practical advice about planning, technical compliance, budget and the information a project genuinely needs next.</p>
        <ul className="tick-list">
          <li><CheckCircle2/>More than twenty years in architecture</li>
          <li><CheckCircle2/>Residential design and planning specialist</li>
          <li><CheckCircle2/>Direct, straightforward communication</li>
          <li><CheckCircle2/>ARB registered and RIBA Chartered Practice</li>
        </ul>
        <div className="actions"><Link className="btn primary" href="/about">Meet the studio <ArrowRight/></Link><a className="btn secondary" href={site.calendly}>Book consultation</a></div>
      </div>
    </div>
  </section>

  <section className="section"><div className="shell split-intro"><div><small className="eyebrow">Local expertise</small><h2>Residential architects across two key regions.</h2></div><p>Focused guidance for Birmingham, Solihull, Teesside and surrounding areas.</p></div><div className="shell location-grid">{locations.map(l=><Link href={`/locations/${l.slug}`} key={l.slug}><span>{l.shortTitle}</span><ArrowRight/></Link>)}</div></section>

  <section className="section dark-section"><div className="shell split-intro light"><div><small className="eyebrow">Knowledge centre</small><h2>Planning and design guidance people actually search for.</h2></div><p>Practical articles covering extensions, lofts, conversions, HMOs, fees and technical approvals.</p></div><div className="shell guide-grid">{guides.slice(0,8).map(g=><Link className="guide-card" href={`/guides/${g.slug}`} key={g.slug}><small>Guide</small><h3>{g.shortTitle}</h3><p>{g.description}</p><span>Read guide <ArrowRight size={16}/></span></Link>)}</div><div className="shell centered-action"><Link className="btn light-btn" href="/guides">Browse all guides</Link></div></section>

  <section className="section"><div className="shell social-showcase"><div><Instagram/><small className="eyebrow">Follow the studio</small><h2>Projects, drawings and planning insights.</h2><p>See current work, before-and-after transformations and practical residential design advice.</p><a className="btn primary" href={site.instagram} target="_blank">Follow on Instagram</a></div><div className="social-photo-grid"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80" alt="Contemporary residential interior with large glazed doors"/><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80" alt="Modern residential extension with timber and glazing"/></div></div></section>
 </>;
}
