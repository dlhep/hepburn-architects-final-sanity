import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ExternalLink } from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Loft Conversion Guide",
  description: "A complete UK guide to loft conversions, including suitability, permitted development, planning permission, costs, stairs, structure and Building Regulations.",
  alternates: { canonical: "https://hepburnarchitects.co.uk/knowledge-centre/loft-conversions" },
  openGraph: {
    title: "The Complete Guide to Loft Conversions",
    description: "A practical homeowner guide to loft suitability, design, planning, costs and technical approval.",
    url: "/knowledge-centre/loft-conversions",
    type: "article",
    images: ["/images/social-sharing.jpg"],
  },
};

const reviewedDate = "27 July 2026";
const schemaDate = "2026-07-27";

const quickAnswers = [
  ["Is my loft likely to be suitable?", "A useful ridge height, workable stair position, sufficient plan area and an adaptable roof structure are positive signs. Only a measured appraisal can confirm the finished space."],
  ["Do I need planning permission?", "Some house loft conversions can use permitted development. Front roof enlargements, designated land, listed buildings, flats and homes with removed rights need particular care."],
  ["How much will it cost?", "A rooflight conversion is usually the least complex; dormer, hip-to-gable, L-shaped and mansard work generally cost progressively more. Reliable pricing needs coordinated drawings and current quotations."],
  ["How long will it take?", "Allow for survey, design, approvals, engineering, contractor selection and construction. Straightforward work can take several months overall; complex planning or party-wall matters add time."],
  ["Which type is best?", "The best form is the one that resolves useful headroom, stairs, external proportion, planning risk, structure and budget—not simply the largest dormer available."],
  ["Do I need an architect?", "Not legally in every case, but architectural input can test feasibility, coordinate stairs and roof form, and produce consistent planning and technical information."],
  ["What Building Regulations apply?", "A habitable conversion normally engages structure, fire safety, stairs, insulation, ventilation, sound, glazing, electrics and drainage where relevant."],
] as const;

const conversionTypes = [
  {
    title: "Rooflight conversion",
    suitable: "Roofs with strong existing height and volume",
    opportunity: "Retains the main roof form and can create calm, characterful rooms with limited external enlargement.",
    limits: "Usable area remains governed by existing slopes; rooflight position, overlooking and overheating need control.",
    route: "Often the simplest planning route, subject to Class C limits, local restrictions and listed-building considerations.",
    impact: "Lower visual and structural intervention",
    cost: "Lower relative cost",
  },
  {
    title: "Rear dormer conversion",
    suitable: "Terraces, semi-detached and detached houses",
    opportunity: "Creates full-height floor area and makes bedrooms, bathrooms and circulation easier to arrange.",
    limits: "Poorly proportioned dormers can dominate the roof; cheeks, windows, drainage and junctions need disciplined design.",
    route: "May fall within Class B on a qualifying house, but volume, position, eaves setback, materials and other conditions apply.",
    impact: "Moderate structural intervention",
    cost: "Medium relative cost",
  },
  {
    title: "Hip-to-gable conversion",
    suitable: "Hipped semi-detached or detached houses",
    opportunity: "Replaces the sloping hip with a gable, increasing width and usable volume near the side of the roof.",
    limits: "Changes the building silhouette and its relationship with adjoining or neighbouring roof forms.",
    route: "Can potentially use Class B rights outside restricted locations, with volume and all other criteria assessed cumulatively.",
    impact: "Significant roof-form change",
    cost: "Medium to higher relative cost",
  },
  {
    title: "Dormer plus hip-to-gable",
    suitable: "Hipped houses needing maximum practical floor area",
    opportunity: "Combines increased width with full-height space towards the rear.",
    limits: "The two additions share the Class B volume allowance and require coordinated structure and external proportion.",
    route: "Potentially permitted development where every condition is met; otherwise a planning application is required.",
    impact: "High structural intervention",
    cost: "Higher relative cost",
  },
  {
    title: "Mansard conversion",
    suitable: "Terraces and urban roofscapes where the form is locally acceptable",
    opportunity: "Rebuilds the roof slope to create a substantial, efficient upper floor.",
    limits: "Major alteration, detailed party-wall and waterproofing interfaces, and strong effect on roofscape.",
    route: "Planning permission is commonly required; conservation and design policy may be decisive.",
    impact: "Very high structural intervention",
    cost: "Higher relative cost",
  },
  {
    title: "L-shaped dormer",
    suitable: "Terraces with a rear outrigger",
    opportunity: "Extends accommodation across the main roof and outrigger, often enabling a bedroom and en-suite arrangement.",
    limits: "Complex junctions, drainage, cumulative volume, party walls and the relationship between dormer elements.",
    route: "May require planning permission depending on form, volume, location and local controls.",
    impact: "High structural complexity",
    cost: "Higher relative cost",
  },
  {
    title: "Modular or prefabricated approach",
    suitable: "Projects with suitable access, repeatable geometry and early manufacturer coordination",
    opportunity: "Off-site fabrication may reduce the period for which the roof is open and improve production control.",
    limits: "Cranage, access, tolerances, design flexibility and interfaces with the existing house can constrain viability.",
    route: "The same planning and Building Regulations tests apply; the construction method does not create an approval exemption.",
    impact: "Specialist coordination",
    cost: "Project-dependent",
  },
] as const;

const buildingRegulations = [
  ["Structure", "A new floor, beams, bearings, roof alterations, dormer framing and stair trimming need a verified load path into suitable supporting construction."],
  ["Fire safety", "The design may need a protected escape route, fire-resisting construction, coordinated doors and smoke detection. Existing open-plan layouts can materially affect the strategy."],
  ["Stairs and guarding", "Pitch, rise, going, headroom, width, landings, handrails and guarding must be resolved within the actual geometry."],
  ["Thermal performance", "Roof, wall and dormer build-ups must coordinate insulation, airtightness, ventilation paths and thermal bridges without consuming unplanned headroom."],
  ["Ventilation and glazing", "Background and extract ventilation, purge ventilation, safety glazing, rooflight operation and overheating risk need a joined-up approach."],
  ["Sound and services", "Floor and wall build-ups, plumbing, drainage and electrical work must address applicable requirements and avoid undermining fire or acoustic construction."],
] as const;

const process = [
  ["Measured survey", "Record roof geometry, levels, structure, chimney breasts, services and the house below."],
  ["Feasibility", "Test headroom, stairs, useful floor area, planning constraints and a proportionate budget."],
  ["Concept design", "Develop the roof form, room arrangement, daylight, storage and external appearance together."],
  ["Planning or certificate", "Prepare a planning application or proposed Lawful Development Certificate where appropriate."],
  ["Technical design", "Coordinate build-ups, fire strategy, stairs, drainage, ventilation and construction information."],
  ["Structural engineering", "Design beams, floor members, trimmers, bearings and roof alterations from verified assumptions."],
  ["Building Regulations", "Submit through the appropriate building-control route and respond to plan review."],
  ["Party-wall process", "Serve notices and allow the statutory process where the proposed work engages the Act."],
  ["Contractor pricing", "Issue consistent information, compare scope and exclusions, and check programme and access."],
  ["Construction", "Sequence protection, opening-up, structure, weathering, services, finishes and inspections."],
  ["Completion", "Close defects and collect Building Control, electrical and other relevant certificates and records."],
] as const;

const scenarios = [
  {
    title: "Victorian or Edwardian terrace with a rear outrigger",
    opportunity: "A rear dormer or L-shaped arrangement may create a bedroom with an en-suite or flexible workspace.",
    constraint: "Narrow plan, party walls, chimney breasts, stair arrival and complex junctions over the outrigger.",
    type: "Rear dormer or L-shaped dormer, subject to measured feasibility.",
    planning: "40m³ cumulative Class B allowance for a terrace; front roof-slope and designated-land controls remain important.",
    stair: "Often best explored above the existing stair, while protecting first-floor room sizes and the escape route.",
    complexity: "Medium to high, especially with an outrigger bathroom.",
    alternative: "Reconfigure the first floor or combine a smaller rooflight conversion with ground-floor improvements.",
  },
  {
    title: "1930s semi-detached house with a hipped roof",
    opportunity: "A hip-to-gable conversion can release width otherwise lost beneath the side slope.",
    constraint: "The changed silhouette, relationship with the attached neighbour, cumulative volume and structural support.",
    type: "Hip-to-gable, often combined with a rear dormer.",
    planning: "Potential 50m³ cumulative allowance on a qualifying semi-detached house, subject to every Class B condition.",
    stair: "The existing landing may offer a logical continuation, but ridge and flight headroom must be modelled.",
    complexity: "Medium to high because the roof form and internal structure change materially.",
    alternative: "A smaller rear dormer or an extension where the roof volume cannot create balanced rooms.",
  },
  {
    title: "Detached house with strong existing ridge height",
    opportunity: "Good volume may support a restrained rooflight conversion with minimal change to the external form.",
    constraint: "Long sloping zones can make apparent floor area misleading; overheating and privacy need attention.",
    type: "Rooflight conversion, potentially with modest localised enlargement.",
    planning: "Class C roof alterations may be available; any enlargement must be tested separately under Class B.",
    stair: "A central stair can preserve useful edge zones for storage, but its effect on the floor below remains decisive.",
    complexity: "Lower to medium where the structure is adaptable and no bathroom is proposed.",
    alternative: "Use the loft for non-habitable storage if escape, stairs or useful area do not justify conversion.",
  },
  {
    title: "Shallow roof with limited ridge height",
    opportunity: "A feasibility study can identify whether lowering ceilings or a larger roof reconstruction is proportionate.",
    constraint: "Finished floor and insulated roof build-ups may leave inadequate headroom and poor usable area.",
    type: "A conventional dormer may not solve the ridge-height constraint; a mansard or roof replacement is much more invasive.",
    planning: "Major roof alteration is more likely to need planning permission and may not suit the local roofscape.",
    stair: "A compliant flight can consume valuable first-floor space without producing a worthwhile room above.",
    complexity: "High, with cost and disruption potentially disproportionate to the gain.",
    alternative: "Rear or side extension, internal reconfiguration, garden studio or moving home.",
  },
] as const;

const faqs = [
  ["Is my loft high enough to convert?", "There is no single measurement that proves suitability. Measure from the top of the existing ceiling joists to the underside of the ridge, then allow for the new floor, insulation and finishes while testing stair and circulation headroom."],
  ["Do I need planning permission for a loft conversion?", "Not always. Qualifying houses may use permitted-development rights, but volume, position, height, materials, windows, designated land, previous additions and removed rights must all be checked."],
  ["What is the cheapest type of loft conversion?", "A rooflight conversion is often the least structurally and externally complex where the existing roof already has good volume. The cheapest viable option still needs a compliant floor, stair, fire strategy and insulation."],
  ["How long does a loft conversion take?", "The construction period is only part of the programme. Survey, design, planning or certification, technical design, engineering, Building Regulations, party-wall matters and contractor selection can make the overall process several months."],
  ["Can every loft be converted?", "No. Very shallow roofs, unworkable stairs, structural constraints, heritage sensitivity or disproportionate cost can make a conventional conversion impractical."],
  ["Where should the new staircase go?", "Continuing above the existing staircase is often efficient for circulation and fire protection, but the best position depends on ridge height, first-floor rooms, landings and the intended loft layout."],
  ["Can I add a bathroom in the loft?", "Often, subject to drainage, water pressure, hot-water capacity, ventilation, waterproofing, structure and usable clearances beneath sloping ceilings."],
  ["Do I need a structural engineer?", "Most habitable loft conversions require structural design because existing ceiling joists are not normally intended as a floor and the roof or openings may be altered."],
  ["Do I need a Party Wall Agreement?", "Not every project requires an award, but work such as inserting beams into a party wall or altering shared structures may engage the Party Wall etc. Act. Obtain project-specific advice before work starts."],
  ["Can I convert the loft in a conservation area?", "Potentially, but roof enlargements are more restricted on designated land and visible roof changes may need careful planning justification. Article 4 Directions and listed status must also be checked."],
  ["Does a loft conversion add value?", "It can add useful accommodation and market appeal, but value depends on location, room quality, access, approvals, workmanship and whether the conversion compromises the existing house."],
  ["Can I live in the house during the work?", "Often, but expect noise, dust, temporary loss of weather protection, scaffold access and periods when stairs or services are affected. The contractor should explain sequencing and protection."],
  ["Is a dormer better than rooflights?", "A dormer creates more full-height area; rooflights preserve the roof form and can cost less. The better choice depends on existing volume, planning context, design quality and budget."],
  ["Do loft conversions overheat?", "They can. Roof spaces receive strong solar exposure, and large unshaded rooflights can increase heat gain. Orientation, glazing area, solar control, insulation and ventilation should be assessed together."],
  ["What documents should I receive at completion?", "Keep approved or accepted drawings, structural calculations, the Building Control completion certificate, electrical and other installation certificates, product information, warranties and any planning or Lawful Development Certificate decision."],
] as const;

const sources = [
  ["GOV.UK — Permitted development rights for householders: technical guidance", "https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance/permitted-development-rights-for-householders-technical-guidance"],
  ["Planning Portal — Loft conversion planning permission", "https://www.planningportal.co.uk/permission/common-projects/loft-conversion/planning-permission"],
  ["GOV.UK — Building Regulations Approved Documents", "https://www.gov.uk/government/collections/approved-documents"],
  ["GOV.UK — Party walls and building work", "https://www.gov.uk/party-walls-building-works"],
] as const;

function projectText(project: Project) {
  return [project.title, project.category, project.projectType, project.description, ...(project.services || [])].filter(Boolean).join(" ").toLowerCase();
}

function selectLoftProjects(projects: Project[]) {
  return projects.filter((project) => ["loft", "dormer", "hip-to-gable", "mansard", "roof conversion"].some((term) => projectText(project).includes(term))).slice(0, 6);
}

export default async function LoftConversionsPage() {
  const projects = selectLoftProjects(await getProjects());
  const heroProject = projects[0];
  const canonical = `${site.url}/knowledge-centre/loft-conversions`;
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Knowledge Centre", item: `${site.url}/knowledge-centre` },
      { "@type": "ListItem", position: 3, name: "Loft Conversions", item: canonical },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "The Complete Guide to Loft Conversions", description: metadata.description,
    datePublished: schemaDate, dateModified: schemaDate,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: canonical,
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <>
      <StructuredData data={buildGraph(breadcrumbSchema, articleSchema, faqSchema)} />
      <header className={styles.hero}><div className="shell">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/knowledge-centre">Knowledge Centre</Link><span>/</span><span aria-current="page">Loft Conversions</span></nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><small className="eyebrow">Loft Conversion Guide</small><h1>The Complete Guide to Loft Conversions</h1><p className={styles.standfirst}>A loft conversion can create valuable additional space without extending the building footprint, but its success depends on headroom, structure, stairs, fire safety, planning constraints and thoughtful design.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Loft Conversion</a><Link className="btn secondary" href="/estimate">Estimate Professional Fees</Link></div></div>
          <div className={styles.heroImage}><Image src={heroProject ? projectImageUrl(heroProject.featuredImage, 1500) : "/images/homepage-hero.webp"} alt={heroProject ? projectImageAlt(heroProject) : "Contemporary residential architecture by Hepburn Architects"} fill priority sizes="(max-width: 900px) 100vw, 45vw" />{heroProject && <Link href={`/projects/${heroProject.slug}`}>{heroProject.title}<ArrowUpRight size={15} /></Link>}</div>
        </div>
      </div></header>

      <main>
        <section className={styles.quick}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">At a glance</small><h2>Loft Conversion Quick Answers</h2></div><p>A useful first screen before commissioning property-specific survey, planning and technical advice.</p></div><dl>{quickAnswers.map(([question, answer]) => <div key={question}><dt>{question}</dt><dd>{answer}</dd></div>)}</dl></div></section>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Start with evidence</small><h2>Is Your Loft Suitable for Conversion?</h2></div><div><p className={styles.lead}>A large-looking loft is not automatically a useful room. Finished headroom, stairs and circulation determine the habitable area.</p><p>Assessment should record the roof pitch and structure, ridge height, available plan area, water tanks and services, chimney breasts, possible stair and landing positions, access, external roof form and any conservation or listed-building constraints.</p><p>Traditional cut roofs and modern trussed-rafter roofs present different structural opportunities. Neither should be altered on assumption. The arrangement below the loft matters too: load-bearing walls, foundations, ceiling levels and the protected escape route can all influence feasibility.</p><div className={styles.note}><strong>Practical distinction</strong><p>Floor area beneath low slopes may be valuable for storage but unsuitable for standing, circulation or furniture. Report usable zones separately from the apparent loft footprint.</p></div></div></div></section>

        <section className={`${styles.section} ${styles.cream}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Measure the finished space</small><h2>How to Assess Existing Headroom</h2></div><div><p className={styles.lead}>Measure vertically from the top of the existing ceiling joists to the underside of the ridge as an initial datum—not from the loft boards.</p><p>The new structural floor, levelling, finishes and insulated roof build-up reduce the finished dimension. Staircase headroom follows its own geometric route, and sloping ceilings create zones suited to beds or storage rather than primary circulation.</p><p>No single ridge measurement is a universal guarantee. Roof pitch, width, structure and the ability to locate a compliant stair matter just as much. A measured survey and feasibility study are often worthwhile before detailed design or contractor pricing.</p></div></div></section>

        <section className={styles.section}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Seven established approaches</small><h2>Main Types of Loft Conversion</h2></div><p>Each form trades external change, usable volume, structural intervention, planning risk and cost differently.</p></div><div className={styles.typeGrid}>{conversionTypes.map((type, index) => <article key={type.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{type.title}</h3><dl><div><dt>Often suits</dt><dd>{type.suitable}</dd></div><div><dt>Opportunity</dt><dd>{type.opportunity}</dd></div><div><dt>Limitations</dt><dd>{type.limits}</dd></div><div><dt>Likely route</dt><dd>{type.route}</dd></div></dl><footer><strong>{type.impact}</strong><strong>{type.cost}</strong></footer></article>)}</div></div></section>

        <section className={`${styles.section} ${styles.dark}`}><div className="shell"><div className={styles.featureRows}>
          <article><div><small className="eyebrow">Minimal enlargement</small><h2>Rooflight Loft Conversions</h2></div><div><p>A rooflight scheme can preserve the main roof form where existing volume is already generous. Placement should follow the room layout, views and external roof composition rather than a generic grid.</p><p>Privacy, summer solar gain, glare and access for opening or cleaning need attention. Internally, lower slopes can hold beds and storage while the ridge zone supports circulation.</p><p>The restrained exterior does not remove the need for a structural floor, a compliant stair, fire precautions, insulation, ventilation and Building Regulations design.</p></div></article>
          <article id="dormer-loft-conversions"><div><small className="eyebrow">More full-height area</small><h2>Dormer Loft Conversions</h2></div><div><p>Dormers extend from a roof slope to increase headroom and usable floor area. Rear dormers may have a more straightforward planning route than front dormers, but permitted development is never established by orientation alone.</p><p>Scale, cheek width, cladding, fascia depth and window alignment should relate to the house. Breaking a large form into better-proportioned elements, controlling junctions and coordinating rainwater can avoid a crude box-like result.</p><p>Front dormers commonly need planning permission. All dormers require robust drainage, roof junctions and structural coordination. See the <a href="#planning">planning section</a> below.</p></div></article>
          <article><div><small className="eyebrow">Changing a hipped roof</small><h2>Hip-to-Gable Conversions</h2></div><div><p>On a suitable semi-detached or detached house, replacing a hip with a gable can release useful width and volume. The change should be considered against the neighbouring roof, street rhythm and original architecture.</p><p>A hip-to-gable addition may potentially fall within Class B, but its volume contributes to the same cumulative allowance as a rear dormer. New gable structure, roof support, bearings and the interface with the existing house require engineering.</p></div></article>
          <article><div><small className="eyebrow">Major roof reconstruction</small><h2>Mansard Conversions</h2></div><div><p>A mansard typically replaces a roof slope with a steep face and a flatter upper section, often incorporating dormer windows. It can create substantial, efficient floor area in terraces and dense urban settings.</p><p>Planning permission is more likely because of the degree of roof alteration. Party-wall interfaces, temporary weathering, structure, drainage and conservation context make it one of the more complex and costly approaches.</p></div></article>
        </div></div></section>

        <section id="planning" className={styles.section}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Class B and Class C</small><h2>Planning Permission and Permitted Development</h2></div><p>The detailed permitted-development rules below apply in England. Wales, Scotland and Northern Ireland have different planning systems. In every nation, status depends on the property, location, planning history and complete roof design.</p></div><div className={styles.planningGrid}><div><h3>Roof enlargements</h3><p>Class B can permit qualifying roof enlargements up to a cumulative 40m³ for a terraced house and 50m³ for a detached or semi-detached house. Earlier roof additions count. The enlargement must not exceed the existing roof’s highest point or project beyond the plane of the principal-elevation roof slope fronting a highway.</p><p>Materials must be similar in appearance. Except for hip-to-gable work, the enlargement normally needs a 20cm setback from the original eaves measured along the roof plane. Side-facing windows require obscure glazing and restrictions on opening below 1.7 metres above the floor.</p></div><div><h3>Restrictions and separate classes</h3><p>Raised platforms, balconies and verandas are not authorised by Class B. Rooflights are generally assessed under Class C and have separate projection and window conditions. Flats and maisonettes do not benefit from ordinary householder rights.</p><p>Class B roof enlargements are not permitted development on article 2(3) land, including conservation areas, National Landscapes, National Parks, the Broads and World Heritage Sites. Article 4 Directions, listed-building controls and planning conditions can impose further restrictions.</p></div></div><div className={styles.links}><Link href="/knowledge-centre/planning-permission">Planning Permission Explained <ArrowRight size={16} /></Link><Link href="/guides/loft-conversion-planning-permission">Detailed Loft Planning Guide <ArrowRight size={16} /></Link><Link href="/knowledge-centre/extension-planning-permission">How Permitted Development Is Assessed <ArrowRight size={16} /></Link><Link href="/services/planning-applications">Planning Application Service <ArrowRight size={16} /></Link></div></div></section>

        <section className={`${styles.section} ${styles.orange}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Formal planning evidence</small><h2>Lawful Development Certificates</h2></div><div><p className={styles.lead}>A proposed Lawful Development Certificate can formally confirm that the accurately drawn loft works would be lawful for planning purposes.</p><p>It is not planning permission and is decided against legal criteria rather than planning merit. Accurate plans, sections, elevations, volume calculations and evidence of the existing roof and planning history help demonstrate compliance.</p><p>A certificate can answer future buyer, solicitor or lender questions and provide greater certainty before construction, while leaving Building Regulations and other consents separate.</p></div></div></section>

        <section id="building-regulations" className={styles.section}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">A separate legal system</small><h2>Building Regulations for Loft Conversions</h2></div><p>Planning controls whether development is acceptable or nationally permitted. Building Regulations control how the work is designed and built.</p></div><div className={styles.regGrid}>{buildingRegulations.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><Link className={styles.textLink} href="/knowledge-centre/building-regulations">Read Building Regulations Explained <ArrowRight size={16} /></Link></div></section>

        <section className={`${styles.section} ${styles.cream}`}><div className="shell"><div className={styles.topicRows}>
          <article id="fire-safety"><div><small className="eyebrow">Whole-house strategy</small><h2>Fire Safety and Escape</h2></div><div><p>Creating another storey can change the escape strategy for the whole dwelling. Many conversions require a protected route from the loft to a final exit, supported by fire-resisting construction, suitable doors and interlinked smoke detection.</p><p>An open-plan ground floor can interrupt that route and may require a more developed solution. Escape windows do not replace every other precaution. Property height, stair enclosure, room arrangement and existing construction all matter, so universal specifications are unsafe.</p></div></article>
          <article id="loft-conversion-stairs"><div><small className="eyebrow">The controlling move</small><h2>Staircase Design</h2></div><div><p>The stair often determines whether the conversion works. Continuing above the existing flight can support clear circulation and fire protection, but it must align with useful roof height and protect the first-floor plan.</p><p>Pitch, width, headroom, landings, guarding and handrails need to be resolved alongside the loss of bedroom area, natural light and arrival into the loft. A stair squeezed in after the rooms are planned usually compromises both floors.</p></div></article>
          <article id="loft-conversion-structure"><div><small className="eyebrow">Verified load paths</small><h2>Structural Design</h2></div><div><p>Existing ceiling joists are normally intended to support ceilings and limited maintenance loads, not a habitable floor. New joists or floor cassettes may span between steel or engineered-timber beams supported by verified walls, bearings and foundations.</p><p>Roof alterations, stair trimming, dormer framing and chimney-breast work change load paths. A structural engineer should design from reliable survey information rather than assume every wall is load-bearing or every foundation adequate.</p></div></article>
          <article id="insulation-ventilation"><div><small className="eyebrow">Comfort and durability</small><h2>Insulation, Ventilation and Overheating</h2></div><div><p>Warm-roof and cold-roof principles describe where insulation and ventilation sit relative to the structure. The chosen build-up must maintain required ventilation paths where applicable, control condensation, limit thermal bridges and coordinate airtightness.</p><p>Rooflights can produce intense summer gain, particularly on exposed orientations. Glazing area, blinds or external solar control, purge and background ventilation, and mechanical bathroom extract should be considered with whole-house airflow.</p></div></article>
        </div></div></section>

        <section className={styles.section}><div className="shell"><div className={styles.designGrid}>
          <article><small className="eyebrow">Services and clearances</small><h2>Loft Bathrooms and En-suites</h2><p>Locate bathrooms with drainage falls, soil-pipe routes, water pressure and hot-water capacity in mind, but do not let the easiest pipe route dictate an unusable room. Sloping ceilings must leave practical clearance around sanitaryware.</p><p>Mechanical extract, waterproofing, privacy, structural loads and acoustic separation all require coordination. Compact rooms benefit from accurate product dimensions rather than generic symbols.</p></article>
          <article><small className="eyebrow">Rooms shaped by the roof</small><h2>Bedroom and Living-Space Design</h2><p>Place beds, desks, window seats and low joinery beneath slopes while preserving the highest zone for circulation. Built-in wardrobes can absorb irregular edges and make the central room feel calmer.</p><p>Daylight, outward views, privacy and acoustic separation should be balanced. Flexible power, lighting and storage can help a bedroom become a study or retreat later.</p></article>
          <article><small className="eyebrow">Use every edge carefully</small><h2>Storage Design</h2><p>Eaves cupboards, drawers and fitted wardrobes can turn low zones into useful capacity. Avoid creating very deep voids that are inaccessible in daily use.</p><p>Access panels, plant, insulation continuity, structure and fire-stopping need to remain serviceable. Storage linings must not casually breach fire-resisting or airtight layers.</p></article>
        </div></div></section>

        <section className={`${styles.section} ${styles.dark}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Separate statutory procedure</small><h2>Party Wall Matters</h2></div><div><p className={styles.lead}>Loft work may involve inserting beams into party walls, raising or altering shared walls, chimney-breast work or construction near neighbouring structures.</p><p>These operations can require notices under the Party Wall etc. Act 1996. The procedure is separate from planning permission and Building Regulations; approval under one does not remove obligations under another.</p><p>This is general information, not legal advice. A party-wall surveyor should review the proposed structure and ownership circumstances where the Act may apply.</p></div></div></section>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Sensitive roofscapes</small><h2>Conservation Areas and Listed Buildings</h2></div><div><p className={styles.lead}>Roof form, materials and visibility from public places receive greater scrutiny where heritage significance is involved.</p><p>Rooflight type and position, dormer scale, cheek materials and long views should respond to the conservation-area appraisal and local guidance. A rear roof is not necessarily invisible.</p><p>Listed-building consent is separate and may cover internal fabric as well as external change. Stair openings, historic roof structure and partitions can contribute to significance. Early heritage advice can identify a proportionate design and justification before work becomes fixed.</p></div></div></section>

        <section id="loft-conversion-costs" className={`${styles.section} ${styles.cream}`}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Price the actual design</small><h2>Loft Conversion Costs</h2></div><p>Broad labels are useful for comparison, but they are not quotations. A current contractor price based on coordinated information is required for reliable budgeting.</p></div><div className={styles.costLayout}><div><p className={styles.lead}>Rooflight work is generally the lower-cost route; rear dormers add enclosure and structure; hip-to-gable, L-shaped and mansard schemes bring progressively more roof reconstruction and interface risk.</p><p>Location, scaffold and access, roof condition, stair alteration, bathrooms, glazing, finishes, fire-safety upgrades and work to the existing house can outweigh simple floor-area comparisons.</p></div><ul>{["Structural complexity and temporary works","Scaffold, access and weather protection","Stair and first-floor alterations","Bathroom drainage and services","Windows, rooflights and solar control","Fire doors, alarms and escape-route work","Insulation, ventilation and finishes","Professional and statutory fees","A realistic contingency for existing-building risk"].map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div><div className="actions"><Link className="btn primary" href="/estimate">Estimate Professional Fees</Link><Link className="btn secondary" href="/knowledge-centre/house-extension-costs">Understand Residential Build-Cost Drivers</Link></div></div></section>

        <section id="loft-conversion-timeline" className={styles.section}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">From survey to certificates</small><h2>Loft Conversion Timeline</h2></div><p>Some design, engineering and approval tasks can overlap, but progressing technical work before planning certainty carries redesign risk.</p></div><ol className={styles.process}>{process.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol><p className={styles.caveat}>Planning validation, structural investigation, party-wall procedures, specialist lead times, contractor availability and discoveries during opening-up can all delay the programme. No fixed overall duration is guaranteed.</p></div></section>

        <section className={`${styles.section} ${styles.orange}`}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Resolve the controlling issues early</small><h2>Common Loft Conversion Mistakes</h2></div><p>Avoiding a late stair, fire or structural redesign is usually more valuable than optimising one room in isolation.</p></div><div className={styles.mistakes}>{[
          ["Suitability", "Assuming the loft works without measurement, or forgetting that floor and roof build-ups reduce headroom."],
          ["Stairs", "Designing rooms before resolving stair position, landing, pitch and headroom on both affected floors."],
          ["External design", "Using an oversized dormer, weak window proportions or materials that ignore the original roof and street."],
          ["Technical coordination", "Leaving fire safety, structure, drainage, insulation or ventilation until after planning drawings are fixed."],
          ["Comfort and use", "Providing too little storage, awkward sanitaryware clearances or excessive roof glazing that causes overheating."],
          ["Delivery", "Pricing from planning drawings, overlooking disruption and failing to retain inspection and completion documents."],
        ].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

        <section className={styles.section}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Illustrative property types</small><h2>Four Worked Loft Scenarios</h2></div><p>These are design hypotheses, not real Hepburn Architects projects or guaranteed approval routes.</p></div><div className={styles.scenarios}>{scenarios.map((scenario, index) => <article key={scenario.title}><span>Scenario {index + 1}</span><h3>{scenario.title}</h3><dl>{Object.entries(scenario).filter(([key]) => key !== "title").map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></article>)}</div></div></section>

        <section className={`${styles.section} ${styles.cream}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">A balanced feasibility decision</small><h2>Alternatives When a Loft Conversion Does Not Work</h2></div><div><p className={styles.lead}>Not every roof should be forced into becoming a room. Compare the cost, disruption and quality of the result with other ways of meeting the brief.</p><ul className={styles.simpleList}>{["Rear or side extension","First-floor extension","Internal reconfiguration","Outbuilding or garden studio","Relocating plant or storage","Roof replacement within a wider project","Moving to a home that already provides the required space"].map((item) => <li key={item}>{item}</li>)}</ul><p>Our <Link href="/services/house-extensions">house extension architectural services</Link> provide a useful comparison where ground-floor or multi-storey expansion may be stronger.</p></div></div></section>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Coordinated professional input</small><h2>Do You Need an Architect?</h2></div><div><p className={styles.lead}>An architect is not legally mandatory for every loft conversion, but early design input can establish whether the project is worth pursuing.</p><p>Architectural work can coordinate feasibility, stair planning, room quality, external proportions, permitted-development assessment or a planning application, Building Regulations drawings, structural and specialist information, and a consistent package for contractor pricing.</p><p>Resolving those relationships before construction reduces the risk of late changes. Explore our verified <Link href="/services/loft-conversions">loft-conversion architectural service</Link>.</p></div></div></section>

        {projects.length > 0 && <section className={`${styles.section} ${styles.projects}`}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Verified project metadata</small><h2>Loft Conversions and Residential Alterations in Practice</h2></div><p>Projects are shown only where their recorded description explicitly identifies loft, dormer or roof-conversion work.</p></div><div className={styles.projectGrid}>{projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><div><Image src={projectImageUrl(project.featuredImage, 900)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><small>{project.projectType || project.category}</small><h3>{project.title}</h3><p>{project.location}</p></Link>)}</div></div></section>}

        <nav className={styles.related} aria-label="Related Knowledge Centre guides"><div className="shell"><small className="eyebrow">Continue your research</small><h2>Related Guides</h2><div>{[
          ["Planning Permission", "/knowledge-centre/planning-permission"],
          ["Building Regulations", "/knowledge-centre/building-regulations"],
          ["House Extensions", "/services/house-extensions"],
          ["House Extension Costs", "/knowledge-centre/house-extension-costs"],
          ["House Extension Timeline", "/knowledge-centre/house-extension-timeline"],
          ["Extension Planning Permission", "/knowledge-centre/extension-planning-permission"],
          ["House Extension Ideas", "/knowledge-centre/house-extension-ideas"],
        ].map(([label, href]) => <Link href={href} key={href}>{label}<ArrowRight size={15} /></Link>)}</div></div></nav>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Common questions</small><h2>Loft Conversion FAQs</h2></div><div className={styles.faqs}>{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></section>

        <section className={styles.sources}><div className="shell"><small className="eyebrow">Further reading</small><h2>Official Sources and Scope</h2><ul>{sources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink size={16} /></a></li>)}</ul><p>Last reviewed: {reviewedDate}. This guide provides general homeowner information, principally for England. Planning and Building Regulations systems differ across the UK, and each property requires project-specific professional and statutory assessment.</p></div></section>

        <section className={`${styles.section} ${styles.finalCta}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Early feasibility</small><h2>Planning a Loft Conversion?</h2></div><div><p>Early feasibility can establish whether the available roof space, staircase position, planning route and budget are likely to produce a worthwhile result before the project progresses too far.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">Discuss Your Loft Conversion</a><Link className="btn secondary" href="/estimate">Estimate Professional Fees</Link></div></div></div></section>
      </main>
    </>
  );
}
