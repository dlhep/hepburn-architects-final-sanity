import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Check } from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "House Extension Design Ideas",
  description: "Explore practical house extension ideas for better light, space, storage and garden connection, with design advice from residential architects.",
  alternates: { canonical: "https://hepburnarchitects.co.uk/knowledge-centre/house-extension-ideas" },
  openGraph: {
    title: "House Extension Ideas for Better Light, Space and Everyday Living",
    description: "Practical architectural ideas for light, circulation, storage, flexibility and garden connection.",
    url: "/knowledge-centre/house-extension-ideas",
    type: "article",
  },
};

const publishedDate = "2026-07-27";

const ideas = [
  {
    title: "Create a Better Kitchen-Dining Space",
    body: "A generous kitchen extension still needs distinct places to cook, eat, talk and retreat. Test the work triangle, island position and dining-table clearances before fixing walls. Keep primary routes out of the cooking zone, align everyday views with the garden and consider a quieter sitting area rather than making the whole floor one undifferentiated room.",
    detail: "A pantry wall or well-positioned utility can absorb tall storage and noisy appliances. Acoustic separation, lighting zones and partial screens help a shared room support several activities at once.",
  },
  {
    title: "Bring Light Into the Centre of the House",
    body: "More glass at the rear does not automatically brighten the darker middle of a deep plan. Rooflights, clerestory glazing, glazed doors, internal windows and borrowed light can place daylight where it is needed. A small courtyard or light well may preserve light to an existing room more effectively than building across the full width.",
    detail: "Partial wall removal can direct light while retaining useful enclosure, structure and storage. The aim is a balanced sequence of rooms, not simply the largest possible opening.",
  },
  {
    title: "Improve the Connection to the Garden",
    body: "A good garden connection starts with views and movement rather than a door catalogue. Frame the most useful outlook, align the patio with everyday seating and resolve internal and external levels carefully. Sliding doors offer a wide opening; hinged or folding arrangements may provide better everyday ventilation and access on another site.",
    detail: "Corner glazing, window seats and sheltered terraces can make the boundary feel inhabited. Shading, orientation and planting should be considered with the glass to control glare and overheating.",
  },
  {
    title: "Use the Side Return Intelligently",
    body: "On Victorian and Edwardian houses, a side return can release an awkward strip and improve the relationship between front and rear rooms. The risk is replacing a narrow plan with one long, dark room. Rooflights, side glazing where privacy permits and a clear circulation line are usually more important than gaining every last square metre.",
    detail: "Utilities and storage can occupy less daylit edges, but drainage, boundaries and Party Wall matters need early review.",
    link: ["/knowledge-centre/extension-planning-permission", "Check planning permission for an extension"],
  },
  {
    title: "Add a Separate Utility or Boot Room",
    body: "A compact utility can improve the whole ground floor by removing laundry, coats, shoes and household clutter from the kitchen. Garden access, a secondary sink, drying space, dog-washing facilities and tall storage can be combined in a small, hard-working room.",
    detail: "Plan plant, ventilation and services from the outset. A closable door gives useful acoustic separation from washing machines and heat-pump equipment.",
  },
  {
    title: "Create Flexible Rooms",
    body: "A room beside the main living space might serve as a home office now, a playroom later and eventually a guest or accessible bedroom. Door positions, built-in storage, lighting circuits, privacy and service routes determine whether that flexibility is real.",
    detail: "A well-proportioned room with an independent entrance from the hall adapts more easily than a leftover area that can only be reached through the kitchen.",
  },
  {
    title: "Retain a Separate Snug or Quiet Room",
    body: "Fully open-plan living is not ideal for every household. Television noise, home working, different bedtimes and winter heating all support retaining a smaller enclosed room. Pocket doors or glazed partitions can preserve light and connection while allowing privacy when needed.",
    detail: "The strongest plans offer degrees of openness, so children and adults can use the home differently without competing for one acoustic environment.",
  },
  {
    title: "Use Built-in Storage as Architecture",
    body: "Full-height cabinetry, window seats, pantry walls, concealed utility cupboards, media walls and hallway storage can shape a room rather than merely fill it. Alcoves and niches can also conceal structural depth or make thickened walls feel intentional.",
    detail: "Storage must be designed while the plan is fluid. Adding it after doors, windows and furniture have been fixed usually compromises circulation or reduces the useful wall area.",
  },
  {
    title: "Make Circulation Work Harder",
    body: "Movement space can also provide daylight, views, seating and storage. A route beside a courtyard might become a gallery; a wider landing could form a desk or reading place. Transitions between old and new should reveal the garden and help people understand the plan.",
    detail: "Avoid oversized corridors and routes that cut through sofa, dining or island zones. Every square metre should support the way the home is used.",
  },
  {
    title: "Consider a Courtyard or Pocket Garden",
    body: "Extending across the full width can remove daylight and ventilation from existing rear rooms. A small courtyard can create visual depth, privacy and a second orientation while separating kitchen, work or sitting zones.",
    detail: "Courtyards require careful drainage, weathering and maintenance, and additional external wall and glazing can increase cost. Their value depends on what they unlock in the whole plan.",
  },
  {
    title: "Use Roof Form to Improve Space",
    body: "Flat roofs can produce crisp junctions and controlled rooflight positions. Mono- or dual-pitched roofs can create height, respond to context and bring light deeper into the plan. Vaulted ceilings, lanterns and expressed structure change the character and volume as much as the external form.",
    detail: "Planning context, drainage, maintenance, insulation thickness and cost should guide the choice. A complicated roof is not automatically a more architectural one.",
  },
  {
    title: "Design Around Orientation",
    body: "North-facing gardens often benefit from carefully placed rooflights and openings that capture side light. South-facing rooms need considered shading; east-facing spaces receive morning sun, while west-facing glazing can create strong afternoon heat and glare.",
    detail: "Neighbouring buildings, trees, privacy and room use matter as much as the compass. No orientation is universally best, and glazing should be designed with ventilation, materials and seasonal solar gain.",
  },
  {
    title: "Frame Views Rather Than Glazing Everything",
    body: "A picture window, low sill, corner opening or precisely placed rooflight can make a view feel deliberate. Selective openings may protect privacy, retain useful walls and reduce heat loss, solar gain and structural complexity.",
    detail: "An entire glazed wall can be appropriate, but more glass is not a substitute for composition. Framed views often create a stronger relationship between interior, garden and landscape.",
  },
  {
    title: "Use Materials to Connect Old and New",
    body: "An extension can match existing brickwork, use complementary tones or express a clear contrast through timber, render, zinc or other metal. Whatever the approach, window proportions, brick detailing, roof edges and junctions should relate to the character of the house.",
    detail: "Contrast works when it is deliberate and carefully detailed. Matching works when colour, texture, bond and weathering are understood rather than approximated.",
  },
  {
    title: "Consider Ceiling Height and Volume",
    body: "Standard ceilings can feel calm and efficient; vaulted or stepped ceilings can mark a principal room and admit high-level light. Exposed beams may give structure a visual role rather than concealing it.",
    detail: "Extra volume affects heating, acoustics, cleaning and construction cost. Use height where it changes the experience of the space, not as an automatic gesture throughout.",
  },
  {
    title: "Plan the Extension Around Furniture",
    body: "Plans should show realistic sofas, dining tables, islands, desks, televisions and storage, together with circulation clearances and door swings. Test more than one furniture arrangement so a room can adapt as the household changes.",
    detail: "Square metres alone do not prove that a room works. A smaller space with useful wall lengths and clear routes can outperform a larger but awkwardly shaped room.",
  },
  {
    title: "Integrate Energy Performance Early",
    body: "Insulation, airtightness, glazing performance, solar gain, shading, ventilation and thermal bridges are design matters as well as technical ones. Heating zones, underfloor heating and heat pumps where appropriate need coordinated space and controls.",
    detail: "Consider proportionate upgrades to the existing house so the extension does not become one efficient room attached to a persistently uncomfortable home.",
    link: ["/knowledge-centre/building-regulations", "Read the Building Regulations guide"],
  },
  {
    title: "Design for Future Accessibility",
    body: "Level thresholds, wider doorways, step-free routes and a ground-floor shower room can make everyday life easier now and support future ageing or family change. A study sized and serviced to become a bedroom adds useful resilience.",
    detail: "Accessible design need not feel clinical. Clear circulation, convenient controls and generous natural light improve the home for visitors, young children and temporary injury as well as long-term needs.",
  },
  {
    title: "Think About the Whole House",
    body: "The best extension often includes modest changes beyond its footprint: relocating doors, improving hallway storage, opening a view, reworking stairs or removing redundant circulation. Existing rooms should gain a clearer role rather than becoming spaces people only pass through.",
    detail: "Internal remodelling affects structure, services, finishes and temporary living arrangements, so it must be included in the budget from the beginning.",
    link: ["/knowledge-centre/house-extension-costs", "Understand extension and remodelling costs"],
  },
  {
    title: "Keep the Structure Simple Where Possible",
    body: "Efficient spans, rational column positions, clear load paths and coordinated drainage make a design easier to explain, price and build. Avoid unnecessary corners, excessive cantilevers and roof junctions unless they produce a proportionate spatial benefit.",
    detail: "Good architecture and cost control can reinforce each other. A disciplined structure can create calm proportions, stronger details and more money for the parts of the home people touch every day.",
  },
] as const;

const principles = ["Proportion", "Daylight", "Circulation", "Clear zoning", "Visual connection", "Privacy", "Storage", "Adaptability", "Material coherence", "Relationship to the garden"] as const;

const mistakes = [
  ["Extending without fixing the existing layout", "Added area can leave dark or redundant rooms behind it. Test the complete ground floor."],
  ["Making everything open plan", "Retain choices for quiet, privacy, heating and simultaneous activities."],
  ["Using excessive glazing", "Balance views with shade, privacy, wall space, performance and structure."],
  ["Ignoring furniture and storage", "Real layouts need clearances, useful walls and somewhere for everyday belongings."],
  ["Leaving the centre dark", "Place daylight within the depth of the plan, not only at the new rear elevation."],
  ["Over-sizing the island", "An island should support cooking and circulation rather than dominate both."],
  ["Creating awkward doors and routes", "Open doors, chairs and people should not compete for the same space."],
  ["Disconnecting the garden", "Resolve views, thresholds, terraces, levels and planting as one composition."],
  ["Adding too many roof junctions", "Complexity increases weathering, coordination and cost risks."],
  ["Designing only to permitted-development limits", "The maximum envelope is not necessarily the best plan or appearance."],
  ["Choosing finishes before resolving the plan", "Materials cannot rescue poor light, proportion or circulation."],
] as const;

const scenarios = [
  {
    title: "A narrow Victorian terrace with side-return potential",
    problem: "A dark middle room, narrow kitchen and an underused strip beside the rear outrigger.",
    approach: "Retain a readable front room, use the side return selectively and bring rooflight into the centre.",
    move: "A bright circulation and dining zone links old and new without making one long tunnel.",
    planning: "Permitted development may be possible, but side and wraparound forms require project-specific assessment.",
    cost: "Drainage, Party Wall matters, restricted access, glazing and structural openings can be significant.",
    benefit: "Better daylight and a useful family room while retaining separation at the front.",
  },
  {
    title: "A 1930s semi-detached house needing a family kitchen",
    problem: "A small rear kitchen, disconnected dining room and poor garden access.",
    approach: "Create a kitchen-dining addition with a retained snug and a compact utility beside the service core.",
    move: "A simple structural opening frames the new room and preserves a quieter retreat.",
    planning: "A proportionate rear addition may be permitted development or require a householder application.",
    cost: "Kitchen specification, steelwork, glazing and internal finishes may dominate more than floor area.",
    benefit: "A sociable centre with practical storage and rooms that can be used simultaneously.",
  },
  {
    title: "A detached home requiring ground-floor reorganisation",
    problem: "Generous floor area but fragmented rooms, weak garden views and duplicated circulation.",
    approach: "Reposition doors, consolidate utilities and add only the volume needed to complete the plan.",
    move: "A new visual axis connects entrance, living space and garden while storage forms the quieter edge.",
    planning: "Scale, neighbouring amenity and the cumulative effect of earlier additions need review.",
    cost: "Work across the existing house increases services, finishes and temporary accommodation allowances.",
    benefit: "The entire ground floor becomes more legible rather than simply gaining another room.",
  },
  {
    title: "A smaller extension with better reconfiguration",
    problem: "The initial brief assumes maximum floor area, although the principal problem is awkward internal movement.",
    approach: "Relocate a doorway, combine underused circulation and add a modest garden-facing bay.",
    move: "A smaller intervention directs light and views through the existing plan.",
    planning: "Reduced scale may simplify the planning case, but rights and constraints still require checking.",
    cost: "Less new envelope can release budget for joinery, performance and coherent existing-room upgrades.",
    benefit: "A more useful home with lower embodied impact and less garden lost to construction.",
  },
] as const;

const faqs = [
  ["What is the best type of extension?", "The best type is the one that resolves the existing plan, site and household brief with proportionate cost and planning risk. A rear, side, two-storey or smaller reconfiguration may each be right in different circumstances."],
  ["How can I make an extension feel brighter?", "Place daylight where the plan is darkest using rooflights, clerestory or borrowed light, and consider internal openings and surface reflectance. Rear glazing alone may leave the centre unchanged."],
  ["Are open-plan extensions still a good idea?", "They can be, provided cooking, dining, circulation and quieter activities are properly zoned. Many households benefit from retaining at least one closable room."],
  ["How much glazing should an extension have?", "There is no ideal percentage. Orientation, shade, privacy, heat loss, overheating, structure, budget and useful wall space should determine the amount and position."],
  ["Is a side-return extension worth it?", "It can transform a narrow period-house plan, but value depends on daylight, drainage, access, Party Wall matters and whether the additional width genuinely improves the layout."],
  ["Should an extension match the existing house?", "Matching and contrasting approaches can both work. The important qualities are proportion, material compatibility, deliberate junctions and a coherent relationship with the original building."],
  ["Can a smaller extension work better than a larger one?", "Yes. Better door positions, storage, views and circulation can allow a modest addition to outperform a larger space with an unresolved plan."],
  ["How do I avoid overheating?", "Coordinate glazing area and orientation with external shading, ventilation, glass performance and thermal modelling where appropriate. Do not rely on opening windows as the only strategy."],
  ["When should furniture be considered?", "From the first layout studies. Furniture, door swings and circulation clearances are essential evidence that a room will work."],
  ["What adds the most value to an extension?", "Value is property- and market-specific. Coherent layouts, useful rooms, good light, energy performance, storage and build quality tend to support long-term usability, but uplift is never guaranteed."],
] as const;

function projectText(project: Project) {
  return [project.title, project.category, project.projectType, project.description, ...(project.services || [])].join(" ").toLowerCase();
}

function selectExtensionProjects(projects: Project[]) {
  return projects.filter((project) => ["extension", "remodelling", "renovation"].some((term) => projectText(project).includes(term))).slice(0, 6);
}

export default async function HouseExtensionIdeasPage() {
  const projects = selectExtensionProjects(await getProjects());
  const heroProject = projects.find((project) => projectText(project).includes("extension")) || projects[0];
  const imageProjects = projects.slice(0, 3);
  const canonical = `${site.url}/knowledge-centre/house-extension-ideas`;
  const schemas = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Knowledge Centre", item: `${site.url}/knowledge-centre` },
        { "@type": "ListItem", position: 3, name: "House Extension Ideas", item: canonical },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "Article",
      headline: "House Extension Ideas: Practical Design Ideas for Better Light, Space and Everyday Living",
      description: metadata.description, datePublished: publishedDate, dateModified: publishedDate,
      author: { "@type": "Organization", name: "Hepburn Architects", url: site.url },
      publisher: { "@type": "Organization", name: "Hepburn Architects", url: site.url },
      mainEntityOfPage: canonical,
      image: heroProject ? projectImageUrl(heroProject.featuredImage, 1600) : undefined,
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ];

  return (
    <>
      <StructuredData data={buildGraph(...schemas)} />
      <header className={styles.hero}><div className="shell">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/knowledge-centre">Knowledge Centre</Link><span aria-hidden="true">/</span><span aria-current="page">House Extension Ideas</span></nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><small className="eyebrow">House Extension Design Ideas</small><h1>House Extension Ideas for Better Light, Space and Everyday Living</h1><p className={styles.standfirst}>The best extension is not necessarily the largest. A successful design should solve how the home works, improve daylight and circulation, and create spaces that remain useful over time.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Extension</a><Link className="btn secondary" href="/services/house-extensions">Explore House Extension Services</Link></div></div>
          <div className={styles.heroImage}><Image src={heroProject ? projectImageUrl(heroProject.featuredImage, 1600) : "/images/architectural-expertise-home.webp"} alt={heroProject ? projectImageAlt(heroProject) : "Contemporary residential extension by Hepburn Architects"} fill priority sizes="(max-width: 900px) 100vw, 45vw" />{heroProject ? <Link href={`/projects/${heroProject.slug}`}>{heroProject.title}<ArrowUpRight size={15} /></Link> : null}</div>
        </div>
      </div></header>

      <main>
        <section className={styles.openingSection}><div className={`shell ${styles.openingGrid}`}>
          <div className={styles.openingImage}>{imageProjects[1] ? <Image src={projectImageUrl(imageProjects[1].featuredImage, 1400)} alt={projectImageAlt(imageProjects[1])} fill sizes="(max-width: 800px) 100vw, 50vw" /> : <Image src="/images/architectural-expertise-home.webp" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" />}</div>
          <div><small className="eyebrow">Design the outcome</small><h2>Start With the Problem, Not the Floor Area</h2><p className={styles.lead}>Homeowners often begin by asking how large an extension can be. The better question is what the home needs to do better.</p><p>Dark rear rooms, awkward circulation, an isolated kitchen, weak garden connection, insufficient family space, no workspace and poor storage are different problems. They do not all need the same architectural response.</p><p>An underused side return might unlock the plan; elsewhere, relocating a doorway or retaining a courtyard may achieve more than extra depth. Define essential outcomes before testing area, form and approval routes.</p></div>
        </div></section>

        <section className={styles.ideasSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Twenty practical ideas</small><h2>Design Moves That Improve Everyday Living</h2></div><p>Each idea should be tested against the existing house, orientation, structure, planning context and overall budget.</p></div>
          <div className={styles.ideasList}>{ideas.map((idea, index) => (
            <article key={idea.title} className={index === 2 || index === 10 || index === 14 ? styles.imageIdea : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{idea.title}</h3>{index === 2 && imageProjects[0] ? <div className={styles.inlineImage}><Image src={projectImageUrl(imageProjects[0].featuredImage, 1400)} alt={projectImageAlt(imageProjects[0])} fill sizes="(max-width: 700px) 100vw, 52vw" /></div> : null}{index === 10 && imageProjects[2] ? <div className={styles.inlineImage}><Image src={projectImageUrl(imageProjects[2].featuredImage, 1400)} alt={projectImageAlt(imageProjects[2])} fill sizes="(max-width: 700px) 100vw, 52vw" /></div> : null}</div>
              <div><p className={styles.ideaLead}>{idea.body}</p><p>{idea.detail}</p>{"link" in idea && idea.link ? <Link className={styles.textLink} href={idea.link[0]}>{idea.link[1]}<ArrowRight size={16} /></Link> : null}</div>
            </article>
          ))}</div>
        </div></section>

        <section className={styles.principlesSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">A coherent whole</small><h2>What Makes an Extension Feel Well Designed?</h2></div><p>A strong design does not rely on one dramatic feature. Its decisions reinforce one another from the plan to the smallest junction.</p></div>
          <ol>{principles.map((principle, index) => <li key={principle}><span>{String(index + 1).padStart(2, "0")}</span><strong>{principle}</strong></li>)}</ol>
        </div></section>

        <section className={styles.mistakesSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Constructive cautions</small><h2>House Extension Ideas That Often Go Wrong</h2></div><p>Most design problems are easier and less expensive to resolve before planning, technical design or construction.</p></div>
          <div className={styles.mistakesList}>{mistakes.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div></section>

        <section className={styles.scenariosSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Illustrative design studies</small><h2>Four Ways to Reframe the Brief</h2></div><p>These are representative scenarios, not claims about the project imagery shown elsewhere on this page.</p></div>
          <div className={styles.scenarioGrid}>{scenarios.map((scenario, index) => <article key={scenario.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{scenario.title}</h3><dl><div><dt>Existing problem</dt><dd>{scenario.problem}</dd></div><div><dt>Design approach</dt><dd>{scenario.approach}</dd></div><div><dt>Main architectural move</dt><dd>{scenario.move}</dd></div><div><dt>Likely planning route</dt><dd>{scenario.planning}</dd></div><div><dt>Cost implications</dt><dd>{scenario.cost}</dd></div><div><dt>Long-term benefit</dt><dd>{scenario.benefit}</dd></div></dl></article>)}</div>
        </div></section>

        {projects.length ? <section className={styles.projectsSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Designed and delivered</small><h2>House Extension Projects in Practice</h2></div><Link className={styles.textLink} href="/projects">View House Extension Projects<ArrowRight size={16} /></Link></div>
          <div className={styles.projectGrid}>{projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><div><Image src={projectImageUrl(project.featuredImage, 900)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><small>{project.projectType || project.category}</small><h3>{project.title}</h3><p>{project.location}</p></Link>)}</div>
        </div></section> : null}

        <section className={styles.feasibilitySection}><div className={`shell ${styles.twoColumn}`}>
          <div><small className="eyebrow">From idea to viable proposal</small><h2>Planning, Cost and Programme Still Matter</h2></div>
          <div><p className={styles.lead}>The best concept must respond to planning policy, technical constraints and the overall investment available.</p><p>Structural complexity affects cost; kitchens and glazing can dominate budgets; and planning and technical design should be considered together. Early feasibility prevents time being spent developing an idea that cannot be approved, coordinated or afforded.</p><nav aria-label="Extension feasibility guides"><Link href="/knowledge-centre/extension-planning-permission">Extension Planning Permission<ArrowRight size={16} /></Link><Link href="/knowledge-centre/house-extension-costs">House Extension Costs<ArrowRight size={16} /></Link><Link href="/knowledge-centre/house-extension-timeline">House Extension Timeline<ArrowRight size={16} /></Link><Link href="/knowledge-centre/planning-permission">Planning Permission Explained<ArrowRight size={16} /></Link></nav></div>
        </div></section>

        <section className={styles.downloadSection}><div className={`shell ${styles.downloadGrid}`}>
          <div className={styles.guideCover}><Image src="/images/house-extension-guide-cover.png" alt="Planning a House Extension practical homeowner guide cover" width={1055} height={1491} sizes="(max-width: 700px) 60vw, 320px" /></div>
          <div><small className="eyebrow">Free homeowner resource</small><h2>Plan the Whole Extension Process</h2><p>Download the House Extension Guide for practical guidance on planning permission, budgeting, design decisions, the extension process and common mistakes.</p><Link className="btn primary" href="/house-extension-guide">Get the House Extension Guide<ArrowRight size={17} /></Link></div>
        </div></section>

        <section className={styles.faqSection}><div className={`shell ${styles.twoColumn}`}><div className={styles.stickyHeading}><small className="eyebrow">Design questions</small><h2>House Extension Ideas FAQs</h2></div><div className={styles.faqList}>{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></section>

        <section className={styles.relatedSection}><div className={`shell ${styles.twoColumn}`}><div><small className="eyebrow">Continue planning</small><h2>From Design Idea to Project Brief</h2></div><div><Link href="/services/house-extensions">House Extension Architectural Services<ArrowRight size={16} /></Link><Link href="/house-extension-guide">Download the House Extension Guide<ArrowRight size={16} /></Link><Link href="/knowledge-centre/building-regulations">Building Regulations Explained<ArrowRight size={16} /></Link></div></div></section>

        <section className={styles.finalCta}><div className={`shell ${styles.twoColumn}`}><div><small className="eyebrow">Project-specific design</small><h2>Ready to Explore the Best Design for Your Home?</h2></div><div><p>A successful extension should respond to the existing property, the way the household lives, the site, planning constraints and the available budget.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Extension</a><Link className="btn light-btn" href="/estimate">Estimate Professional Fees</Link></div></div></div></section>
      </main>
    </>
  );
}
