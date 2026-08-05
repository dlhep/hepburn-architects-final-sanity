import type { Metadata } from "next";
import { PremiumLocationPage, type PremiumLocationContent } from "@/components/locations/PremiumLocationPage";
import { SOCIAL_IMAGE } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/locations/little-aston-architects";
const canonical = `${site.url}${path}`;
const description = "Architect-led house extensions, remodelling, new homes, planning applications and Building Regulations in Little Aston and surrounding Staffordshire areas.";

export const metadata: Metadata = {
  title: "Architects Little Aston | Extensions, New Homes & Planning",
  description,
  alternates: { canonical },
  openGraph: { title: "Architects Little Aston | Extensions, New Homes & Planning", description, url: canonical, siteName: site.name, type: "website", images: [{ url: SOCIAL_IMAGE }] },
  twitter: { card: "summary_large_image", title: "Architects Little Aston | Extensions, New Homes & Planning", description, images: [SOCIAL_IMAGE] },
};

const content: PremiumLocationContent = {
  slug: "little-aston-architects",
  eyebrow: "LITTLE ASTON · STAFFORDSHIRE",
  name: "Little Aston",
  h1: "Residential Architects in Little Aston",
  description,
  areaServed: ["Little Aston", "Staffordshire", "Lichfield District"],
  intro: [
    "Hepburn Architects provides residential architectural services in Little Aston for extensions, whole-house remodelling, replacement dwellings, one-off new homes, planning applications and Building Regulations information. The practice combines early site appraisal with architectural design and technical coordination, allowing the proposal to develop around evidence rather than assumptions.",
    "Little Aston is in Staffordshire, outside Birmingham. Its larger detached houses, substantial plots and established landscaped settings create a different design and planning context from a dense urban neighbourhood. New work needs to provide the accommodation a client requires without eroding the space, privacy and landscape structure that give the area its residential quality.",
  ],
  contextHeading: "Architecture shaped by Little Aston’s established residential setting",
  context: [
    "Little Aston includes varied twentieth-century and contemporary housing rather than one uniform architectural style. Some houses have formal symmetrical fronts and traditional roof forms; others are wider, lower and more modern in expression. The useful local reference is therefore not a prescribed style but the relationship between building, plot and landscape. A proposal should understand its street before deciding whether continuity or contrast is appropriate.",
    "Larger plots can appear to offer generous development capacity, but the usable envelope is shaped by more than boundary dimensions. Mature trees, hedges, access, changes in level, drainage and the position of neighbouring houses affect where building mass can be placed. A wide footprint may also reduce the side spacing that helps substantial homes sit comfortably within landscaped surroundings.",
    "Privacy is part of Little Aston’s spacious character. Extensions and replacement homes should be assessed in three dimensions, considering upper-floor windows, balconies, terraces and level differences as well as plan distances. A carefully positioned opening can provide long views into a garden without creating direct overlooking. Site sections and window studies are often more informative than a simple boundary measurement.",
    "Landscape is not leftover space around the architecture. Retained trees, approach sequence, entrance forecourt, private garden and service areas should form a coherent site plan. Parking and turning need to function, but an overextended hard surface can weaken the setting of even a well-designed house. Boundary walls, hedges and gates also shape how a property contributes to the street.",
  ],
  services: [
    { title: "House Extensions", href: "/services/house-extensions", description: "Proportionate additions and internal remodelling for substantial detached homes, developed in plan, section and elevation." },
    { title: "Planning Applications", href: "/services/planning-applications", description: "Planning strategy, drawings and supporting information responding to district policy, neighbourhood context and site constraints." },
    { title: "Building Regulations", href: "/services/building-regulations", description: "Technical design coordinating structure, energy performance, fire safety, drainage, ventilation and consultant inputs." },
    { title: "New-Build Homes", href: "/services/new-build-homes", description: "Site appraisal and architectural services for one-off homes and replacement dwellings in established settings." },
    { title: "Loft Conversions", href: "/services/loft-conversions", description: "Roof-space design addressing stair geometry, external form, structure, thermal performance and fire safety." },
    { title: "Small Sites and Backland", href: "/services/new-build-homes", description: "Early capacity assessment for suitable residential opportunities without assuming that every large garden can be developed." },
    { title: "Projects", href: "/projects", description: "Published residential case studies from Staffordshire, Sutton Coldfield and the wider West Midlands." },
    { title: "Fee Calculator", href: "/estimate", description: "An initial indication of architectural fees before a written, project-specific scope is prepared." },
  ],
  planningHeading: "Planning within the Little Aston Neighbourhood Plan area",
  planningAuthority: "Lichfield District Council",
  planningAuthorityUrl: "https://www.lichfielddc.gov.uk/planning",
  planning: [
    "Little Aston has a made Neighbourhood Plan. It forms part of the planning context alongside national policy and the adopted development plan for Lichfield District. That does not mean every site has the same constraints or that a single policy decides every application. The relevant documents, planning history and physical context need to be reviewed for the individual property and proposal.",
    "Neighbourhood planning gives local expression to matters such as character and residential quality, while the district council remains the decision-maker for normal residential applications. A design should therefore be capable of responding to several levels of policy. The architectural case is strongest when site analysis, layout, scale, landscape and amenity form one explanation rather than separate statements assembled after the design is fixed.",
    "Common considerations can include plot coverage, building width and height, retained side space, trees, boundary treatment, vehicle access and the effect on neighbours. For a replacement home, the relationship between proposed and existing development will be relevant, but the assessment is not simply a percentage comparison. Apparent bulk, siting, roof form and landscape setting can materially change how a building is experienced.",
    "Permitted development may be available for some works, but it is a national planning permission subject to detailed limitations and conditions. The original dwelling, previous additions, planning conditions, use, land designation and any removed rights must be established before relying on it. A Lawful Development Certificate can provide formal confirmation where the proposal meets the legal tests.",
    "The appropriate application might be a householder submission, a full application for a new or replacement dwelling, a lawful development certificate, or a pre-application enquiry where early officer feedback would be proportionate. Depending on the site, supporting information may include tree, ecology, drainage, heritage, transport or energy evidence. Specialist reports should answer a real issue rather than add volume without purpose.",
  ],
  extensionHeading: "House extensions and remodelling in Little Aston",
  extensions: [
    "Extending a substantial detached house is not simply a matter of using the available garden. The addition should preserve a clear relationship with the original building and avoid spreading accommodation into an inefficient plan. Rear, side and two-storey options are tested against movement through the house, orientation, daylight, garden use and the spaces the client actually needs.",
    "Proportion and massing become more important as the scale increases. A side extension may need a setback or lower ridge to keep the original composition legible, while a rear addition can sometimes adopt a more clearly contemporary form. Roof geometry should be resolved early because valleys, level changes and very broad spans can introduce technical complexity and maintenance risk.",
    "Side spacing often contributes to the sense of separation between larger houses. Filling the whole width of a plot can create a cramped appearance even when the accommodation is attractive internally. The design should consider views from the road, the entrance sequence and the relationship with neighbouring elevations, not only the private garden façade.",
    "Internal remodelling can transform an older plan without disproportionate enlargement. Kitchens, utility rooms, circulation and family spaces are studied together, with furniture and storage used to test whether a room will work. Open-plan living may be appropriate, but quieter rooms, acoustic separation and the ability to close spaces can be equally valuable in a large household.",
    "Daylight and orientation shape the section as well as the plan. Rooflights, clerestory glazing and courtyards can bring light into deep floor plates, but glazing needs to be balanced against privacy, summer heat and energy performance. A coherent material palette should connect older and newer parts without relying on superficial matching where the construction and proportions are fundamentally different.",
  ],
  newHomesHeading: "New and replacement homes in Little Aston",
  newHomes: [
    "Site appraisal should precede a fixed design for a replacement dwelling or one-off home. Planning history, the lawful existing house, neighbourhood-plan context, trees, access, services, levels and neighbouring windows establish the questions that the architecture must answer. This initial work can identify whether the brief is plausible and which specialist investigations are justified.",
    "A replacement house should respond to its landscape setting and the pattern of development around it. More internal space does not need to translate into one dominant volume. Breaking mass into legible elements, controlling ridge heights and using the site’s depth can produce generous accommodation while retaining an appropriate relationship with the street and adjoining plots.",
    "Overdevelopment is not measured by floor area alone. Excessive bulk can result from width, height, proximity to boundaries, roof volume or a combination of building and hardstanding. Garages, parking, turning, bins, plant and garden structures all occupy the site. A credible proposal demonstrates that daily operation has been considered alongside the main house.",
    "Access and parking require practical dimensions and safe movement, but they should not overwhelm the arrival experience. Existing entrances may have visibility or tree constraints, and a new access can affect boundaries and landscape character. Early coordination with arboricultural or highway advice may be sensible where the arrangement is constrained or materially altered.",
    "Privacy should be designed, not treated as a late objection response. Building position, floor levels, internal layout, window orientation and landscape can protect neighbouring amenity without producing defensive blank walls. Long views within the plot can be retained while direct overlooking is avoided. The same studies can improve natural light and give principal rooms a more deliberate relationship with the garden.",
    "Energy-efficient fabric and low-energy systems should be considered as one strategy. Form, orientation, insulation, airtightness, thermal bridging, glazing and ventilation determine the underlying demand before technologies are selected. Heat pumps, photovoltaics or other systems then need appropriate space, acoustic consideration, controls and technical coordination rather than being added to a completed design concept.",
  ],
  technical: [
    "Building Regulations drawings develop the chosen design around applicable requirements for structure, thermal performance, ventilation, fire safety, drainage and accessibility. The information should be proportionate to the construction route while making key junctions and responsibilities clear. Approval under Building Regulations remains separate from planning permission.",
    "Structural coordination is particularly important where extensive openings, altered roofs or level changes are proposed. The architectural and engineering information must agree on beam depths, bearings, columns, stability and foundations. Early coordination protects ceiling heights and layouts from avoidable changes after the design has been approved.",
    "Thermal design considers continuity of insulation, glazing performance, airtightness, ventilation and overheating. Large homes can have varied orientations and deep plans, so daylight and solar gain should be assessed room by room. Services need realistic routes and plant space, with external equipment positioned for performance, maintenance, appearance and neighbour amenity.",
    "Fire safety and accessibility depend on the particular plan. Stair geometry, escape windows, alarms, compartmentation and doors are coordinated with the intended use. Drainage routes, invert levels and surface-water proposals are also reviewed. Specialist calculations, surveys and product designs are integrated where required, while remaining the responsibility of their respective authors.",
    "A technical package can also support contractor pricing through coordinated plans, sections, details and specifications. It reduces ambiguity but cannot remove every unknown in an existing house. Tender comparisons, contract terms, programme, insurance and the handling of changes should be understood before construction starts.",
  ],
  projectExactTerms: ["Little Aston"],
  projectNearbyTerms: ["Sutton Coldfield", "Aldridge", "Staffordshire", "Walsall", "West Midlands", "Birmingham"],
  projectIntro: "Project selection prioritises an exact Little Aston location or manual relationship, followed by nearby Staffordshire and West Midlands residential work. The displayed location always comes from the published project record.",
  nearby: [
    { label: "Four Oaks", href: "/locations/four-oaks-architects" },
    { label: "Sutton Coldfield", href: "/locations/sutton-coldfield-architects" },
    { label: "Aldridge", href: "/locations/aldridge-architects" },
    { label: "Walsall", href: "/locations/walsall-architects" },
    { label: "Birmingham", href: "/locations/birmingham-architects" },
  ],
  faqs: [
    { question: "Which council determines planning applications in Little Aston?", answer: "Lichfield District Council is the local planning authority for ordinary residential applications in Little Aston. Little Aston is in Staffordshire and should not be treated as a Birmingham locality for planning purposes." },
    { question: "Does Little Aston have a Neighbourhood Plan?", answer: "Yes. Little Aston has a made Neighbourhood Plan. It forms part of the planning context alongside national policy and the adopted district development plan. The relevant policy position should be checked when a project begins." },
    { question: "Do I need planning permission for an extension?", answer: "It depends on the proposal and property. Some extensions may use permitted development rights, while larger, prominent or otherwise restricted work requires a householder application. Planning history and any conditions must be checked." },
    { question: "Can I replace a house with a larger dwelling?", answer: "Potentially, but a larger replacement is not automatically acceptable. Lichfield District Council will assess siting, scale, bulk, character, landscape, access, neighbouring amenity and the applicable policy context for the site." },
    { question: "Can permitted development be used in Little Aston?", answer: "It may be available for qualifying houses and proposals. The national limitations, original dwelling, previous additions, planning conditions and any removed rights must be assessed. A Lawful Development Certificate can provide formal confirmation." },
    { question: "How are trees and landscaping considered?", answer: "Trees can influence the development envelope, access and construction method. Protected status, root areas, canopy, quality and replacement planting may need specialist assessment. Mature boundaries and landscaping can also contribute to local character and privacy." },
    { question: "Can you review a site before purchase?", answer: "Yes. We can provide an initial architectural and planning feasibility review based on available information. It identifies issues for further investigation but cannot guarantee permission or replace legal, valuation, structural and specialist advice." },
    { question: "Can you design a contemporary extension?", answer: "Yes. Contemporary work can be appropriate where its scale, form, glazing and materials create a coherent relationship with the existing house and landscaped setting. A modern addition should be precise rather than merely contrasting." },
    { question: "Can you prepare Building Regulations drawings?", answer: "Yes. We prepare architectural technical information and coordinate structural engineering, energy and other specialist designs as required. The scope is confirmed for the particular construction and procurement route." },
    { question: "How much does an architect cost in Little Aston?", answer: "Fees depend on the site, project scale, planning sensitivity and services required. Hepburn Architects issues a written stage-based proposal after reviewing the property and brief. The online calculator provides an indicative starting point." },
    { question: "How long does planning take?", answer: "Householder and minor applications normally have an eight-week statutory target after validation, but validation, consultation, amendments, specialist evidence or an agreed extension of time can make the complete process longer." },
    { question: "Do you work across Staffordshire and the West Midlands?", answer: "Yes. The practice supports suitable residential projects in Little Aston, neighbouring Staffordshire areas, Sutton Coldfield, Birmingham and the wider West Midlands. Each project begins with a review of location, property and scope." },
  ],
  finalCopy: "Discuss the site, planning context and architectural scope directly with Hepburn Architects.",
  disclaimer: "Planning constraints and the availability of permitted development rights must be checked against the individual property, its planning history and current national, district and neighbourhood policy at the time of instruction. No planning outcome can be guaranteed.",
};

export default function LittleAstonArchitectsPage() {
  return <PremiumLocationPage content={content} />;
}
