import type { Metadata } from "next";
import { PremiumLocationPage, type PremiumLocationContent } from "@/components/locations/PremiumLocationPage";
import { SOCIAL_IMAGE } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/locations/four-oaks-architects";
const canonical = `${site.url}${path}`;
const description = "Residential architects in Four Oaks for house extensions, remodelling, replacement homes, planning applications and Building Regulations. Director-led advice from Hepburn Architects.";

export const metadata: Metadata = {
  title: "Residential Architects Four Oaks",
  description,
  alternates: { canonical },
  openGraph: { title: "Architects Four Oaks | Residential Architecture & Planning", description, url: canonical, siteName: site.name, type: "website", images: [{ url: SOCIAL_IMAGE }] },
  twitter: { card: "summary_large_image", title: "Architects Four Oaks | Residential Architecture & Planning", description, images: [SOCIAL_IMAGE] },
};

const content: PremiumLocationContent = {
  slug: "four-oaks-architects",
  eyebrow: "FOUR OAKS · SUTTON COLDFIELD",
  name: "Four Oaks",
  h1: "Residential Architects in Four Oaks",
  description,
  areaServed: ["Four Oaks", "Sutton Coldfield", "Birmingham", "West Midlands"],
  intro: [
    "Hepburn Architects supports homeowners and residential clients in Four Oaks with house extensions, substantial remodelling, replacement dwellings, planning applications and detailed Building Regulations information. The practice is director-led, so early feasibility, design judgment and the route through approvals remain connected rather than passing between separate departments.",
    "Four Oaks sits within Sutton Coldfield and the City of Birmingham, but its residential character is more specific than a broad city description suggests. Large detached homes, period properties, mature gardens and varied later development create opportunities for thoughtful change. They also make proportion, roof form, established frontage, trees and neighbouring amenity important from the first design study.",
  ],
  contextHeading: "Designing for the character of Four Oaks",
  context: [
    "Four Oaks contains substantial detached houses alongside period villas, inter-war homes and later suburban properties. Plot widths, building lines and architectural language vary from street to street. A successful proposal therefore begins with the actual property and its immediate setting, not an assumed local house type. The original composition, previous additions and relationship between house and garden establish the framework for change.",
    "Mature planting is a defining part of many residential settings. Trees, hedges and deep front gardens can soften large buildings and contribute strongly to the street. They also affect development capacity. Root protection areas, canopy spread, level changes and construction access may influence where an extension or replacement home can sit. Tree information is most useful before the footprint is fixed, when it can shape the design rather than merely defend it.",
    "Frontage rhythm matters even where neighbouring houses are architecturally different. Setbacks, gaps between buildings, the position of garages, roof pitches and boundary treatments create order along a street. A large side addition that closes a characteristic gap, or a roof alteration that overwhelms the original form, can have a greater visual effect than its floor area suggests. Elevation and streetscape studies help test those relationships.",
    "Contemporary architecture can sit comfortably within Four Oaks when it is controlled in scale and precise in detail. Respect does not require imitation. A clearly modern rear addition may preserve the hierarchy of a period house better than an enlarged pastiche. The key questions are whether the host building remains legible, whether materials are coherent, and whether the addition improves the whole property rather than reading as an unrelated object.",
  ],
  services: [
    { title: "House Extensions", href: "/services/house-extensions", description: "Rear, side and two-storey extensions developed around the original house, garden, daylight and neighbouring amenity." },
    { title: "Planning Applications", href: "/services/planning-applications", description: "Feasibility, planning strategy, coordinated drawings and supporting information for domestic and replacement-home proposals." },
    { title: "Building Regulations", href: "/services/building-regulations", description: "Technical drawings coordinating structure, thermal fabric, ventilation, fire safety, drainage and construction junctions." },
    { title: "New-Build Homes", href: "/services/new-build-homes", description: "Site appraisal, replacement dwellings and one-off homes shaped by context, landscape, access and buildability." },
    { title: "Loft Conversions", href: "/services/loft-conversions", description: "Roof alterations resolving stair position, headroom, dormer form, structure, insulation and fire safety together." },
    { title: "Projects", href: "/projects", description: "Explore published residential case studies and their recorded locations across Birmingham and the wider region." },
    { title: "Fee Calculator", href: "/estimate", description: "Obtain an early indication of likely architectural fees before requesting a project-specific written quotation." },
  ],
  planningHeading: "Working within the Four Oaks Conservation Area",
  planningAuthority: "Birmingham City Council",
  planningAuthorityUrl: "https://www.birmingham.gov.uk/info/20054/planning_strategies_and_policies/78/conservation_areas",
  planning: [
    "Four Oaks includes a designated Conservation Area, but the designation does not cover every property in the wider neighbourhood. The first task is to establish whether the site lies within its boundary, whether the building is listed or locally significant, and whether any planning condition or Article 4 Direction changes the normal position. Conservation-area designation does not prevent change; it requires the character and appearance of the area to be properly understood and addressed.",
    "Within a conservation area, the contribution made by mature landscaping, historic plot pattern and the appearance of the street can be as important as the age of the house. Demolition, replacement dwellings, prominent extensions, roof alterations and changes to walls, gates or other boundaries may need particular care. A proposal should identify what is significant and show how the design preserves or enhances that significance while meeting a viable residential brief.",
    "Trees in a conservation area receive procedural protection, and individual trees may also be subject to Tree Preservation Orders. The planning strategy may require an arboricultural survey, impact assessment and method statement. A replacement dwelling or extensive addition can also change surface-water movement, garden character and the space available for retained planting, so landscape and drainage decisions should be considered alongside massing.",
    "Permitted development rights are not automatically removed from every house in Four Oaks. Their availability depends on the property type, location, planning history, existing additions, national limitations and any specific local restriction. Where a proposal is intended to rely on permitted development, a careful assessment and Proposed Lawful Development Certificate can provide formal evidence of the planning position.",
    "For ordinary residential applications in Four Oaks, Birmingham City Council is the local planning authority. The appropriate route may be a householder application, a full application for a replacement home, a lawful development certificate, or pre-application advice where the principle, scale or heritage effect warrants early discussion. Design and Access or heritage information should be proportionate to the site and proposal rather than included as generic paperwork.",
  ],
  extensionHeading: "House extensions and remodelling in Four Oaks",
  extensions: [
    "Rear extensions can improve the relationship between formal front rooms and the garden, particularly where a large house has accumulated smaller service additions. The design should begin with circulation and use: how the kitchen, dining and living spaces connect; where utility functions sit; and how daylight reaches the centre of the plan. A wide opening is not automatically the best solution if it removes useful wall space or leaves an undifferentiated room.",
    "Side and two-storey additions require particular attention to the hierarchy of the original house. Setbacks, eaves levels and roof form can keep an addition subordinate without making it apologetic. On wider plots, retained side space may form part of the street’s spacious character and provide access to the garden. The value of extra accommodation must therefore be weighed against visual bulk, neighbouring outlook and the established gap between buildings.",
    "Internal remodelling often unlocks more value than floor area alone. Repositioning a staircase, rationalising circulation or combining poorly connected rooms can allow a smaller extension to perform better. In period houses, selective retention helps the original sequence and proportions remain intelligible. New work should be deliberate about where old and new meet, especially at changes in floor level, ceiling height, window rhythm and material.",
    "Roof and loft alterations need to be tested in section from the outset. Stair geometry, usable headroom, structure and insulation consume space that an outline plan may not reveal. Dormer position and scale also affect the external composition, while new windows can create privacy concerns. Bringing planning and Building Regulations questions together avoids a roof design that appears acceptable externally but cannot produce a safe, useful interior.",
    "Material selection should be grounded in how the existing house is made. Matching brick can be appropriate where an addition is intended to recede, but a poor near-match may be less convincing than a controlled contrast. Roof coverings, metalwork, glazing proportions, parapets and rainwater details all affect whether the completed work feels composed. The aim is a durable relationship between host building and addition, not a short-lived visual gesture.",
  ],
  newHomesHeading: "Replacement homes and larger residential projects",
  newHomes: [
    "A replacement-home project should start with feasibility, not a fixed architectural image. The lawful existing building, planning history, conservation status, trees, access and neighbouring relationships establish the realistic development envelope. Early site sections and massing studies can reveal whether the brief is compatible with the plot before substantial design cost is committed.",
    "Established building lines and frontage composition are especially important for high-value residential sites. A larger house may be achievable without appearing dominant if its mass is broken down, roof form is controlled and landscape depth is retained. Conversely, a plan that fits numerically can still appear overdeveloped where garages, hardstanding and service areas consume the space that gives the street its character.",
    "Site coverage is only one measure of intensity. Height, ridge level, width, side separation and the apparent volume from public and neighbouring viewpoints all influence planning judgment. Access geometry, visibility, turning and parking need to work without allowing vehicles and hard surfaces to dictate the entrance. Boundary conditions should provide privacy and security while contributing positively to the street.",
    "Mature trees can become the organising structure for a replacement dwelling. Retaining the right specimens may determine the building position, outlook and external spaces. Specialist arboricultural, ecological, drainage or heritage advice may be required depending on the site. These inputs should be commissioned when they can still inform the architecture, not after a preferred scheme has made conflict inevitable.",
    "For clients assessing a purchase, a pre-acquisition review can identify obvious planning and spatial risks, but it is not a guarantee of permission or a substitute for legal, structural and valuation advice. Its value lies in testing assumptions: whether the desired accommodation is plausible, what evidence may be needed, and which constraints deserve further investigation before the client proceeds.",
  ],
  technical: [
    "Building Regulations development translates the planning design into coordinated information for Building Control and construction. Structural openings, beams, posts, foundations and roof alterations are coordinated with a structural engineer so that the intended layout remains credible. Existing-building uncertainty is recorded where opening-up or later site confirmation will be necessary.",
    "Thermal performance involves more than adding insulation thicknesses to a drawing. Wall, roof and floor build-ups, glazing, airtightness, thermal bridges, ventilation and overheating risk influence one another. Large areas of glazing can improve garden connection while creating heat-loss and solar-gain consequences that need to be tested against the wider fabric strategy.",
    "Fire safety, drainage and ventilation are developed for the particular arrangement. Open-plan layouts, altered stairs and loft accommodation can change escape requirements. Below-ground drainage routes may affect foundations and floor levels. Mechanical extract and background ventilation need routes and terminals that work technically without compromising important elevations.",
    "The technical package typically includes coordinated plans, sections, construction details and notes proportionate to the appointment. Specialist calculations and designs remain the responsibility of the relevant consultants and manufacturers. Clear tender information helps contractors price a common scope, although conditions within an existing house can still require informed decisions once work begins.",
  ],
  projectExactTerms: ["Four Oaks"],
  projectNearbyTerms: ["Sutton Coldfield", "Little Aston", "Aldridge", "Birmingham", "West Midlands"],
  projectIntro: "Projects are selected from published Sanity data, prioritising an exact Four Oaks match or a manual Four Oaks relationship before nearby residential work. Every card retains its recorded project location.",
  nearby: [
    { label: "Sutton Coldfield", href: "/locations/sutton-coldfield-architects" },
    { label: "Little Aston", href: "/locations/little-aston-architects" },
    { label: "Aldridge", href: "/locations/aldridge-architects" },
    { label: "Birmingham", href: "/locations/birmingham-architects" },
  ],
  faqs: [
    { question: "Is Four Oaks in Birmingham for planning purposes?", answer: "Yes. Four Oaks is part of Sutton Coldfield within the City of Birmingham. Birmingham City Council is the local planning authority for ordinary residential applications. Postal descriptions do not alter that planning-administration position." },
    { question: "Is my property in the Four Oaks Conservation Area?", answer: "Not every Four Oaks property is within the designated Conservation Area. The current boundary should be checked against the specific address, together with listed status, Tree Preservation Orders, planning conditions and any other site-specific constraint." },
    { question: "Can I extend a house in the Conservation Area?", answer: "Potentially. Conservation-area status does not prevent extensions, but scale, position, roof form, materials, landscape and the effect on the area’s character require careful assessment. The strongest response depends on the host building and its setting." },
    { question: "Do I need planning permission for a rear extension?", answer: "Some rear extensions may use permitted development rights, subject to detailed limitations and conditions. Earlier additions, designated land, planning conditions and the exact dimensions must be checked before that route is relied upon." },
    { question: "Can I replace an existing house in Four Oaks?", answer: "A replacement dwelling may be possible, but the principle and scale require site-specific assessment. The existing lawful building, street character, plot coverage, trees, access, neighbouring amenity and any conservation impact will be relevant." },
    { question: "How are trees considered in a planning application?", answer: "The council may require information about species, quality, root protection, canopy, construction effects and proposed mitigation. Conservation-area trees and trees protected by an Order have additional controls. An arboricultural consultant should advise where appropriate." },
    { question: "Can you help with Building Regulations?", answer: "Yes. Hepburn Architects can prepare architectural technical drawings and coordinate structural engineering, energy calculations and other specialist information. Building Control determines compliance, and the exact submission package depends on the project." },
    { question: "Can you review a property before purchase?", answer: "Yes. A proportionate pre-purchase feasibility review can examine planning history, visible constraints and broad development potential. It does not guarantee permission and does not replace legal searches, a building survey, valuation or specialist investigations." },
    { question: "Can you prepare a lawful development certificate?", answer: "Yes, where that is the appropriate route. We can assess the proposal against permitted development requirements and prepare the drawings for a Proposed Lawful Development Certificate. The council makes the formal determination." },
    { question: "How much does an architect cost in Four Oaks?", answer: "Fees depend on project size, existing information, planning sensitivity and the services required. We provide a written stage-based quotation after reviewing the property and brief. The fee calculator offers an early indication only." },
    { question: "How long does a householder application take?", answer: "The statutory target is normally eight weeks after a valid application is registered. Validation, consultation, amendments, specialist information or an agreed extension of time can lengthen the overall programme." },
    { question: "Do you work on contemporary extensions?", answer: "Yes. A contemporary extension can be appropriate where its scale, form, materials and detailing respond intelligently to the original house and setting. Conservation-sensitive design does not necessarily require historic imitation." },
  ],
  finalCopy: "Discuss the property, likely planning route and architectural scope directly with Hepburn Architects.",
  disclaimer: "Planning constraints and the availability of permitted development rights must be checked against the individual property, its planning history and current policy at the time of instruction. No planning outcome can be guaranteed.",
};

export default function FourOaksArchitectsPage() {
  return <PremiumLocationPage content={content} />;
}
