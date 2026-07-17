export type ServiceDetail = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  idealFor: string[];
  process: { title: string; text: string }[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "house-extensions",
    title: "House Extension Architect",
    metaTitle: "House Extension Architect | Planning & Building Regulations",
    metaDescription: "Architectural design, planning applications and Building Regulations drawings for single-storey, two-storey, side and wrap-around extensions.",
    hero: "https://images.unsplash.com/photo-1600047508788-786f3865b4b9?auto=format&fit=crop&w=1800&q=88",
    intro: "A successful extension should improve more than floor area. We design around daylight, circulation, privacy, garden connection, planning policy and the long-term value of the home.",
    idealFor: ["Single-storey rear extensions", "Two-storey side and rear extensions", "Wrap-around extensions", "Kitchen and family-room extensions", "Period-property additions"],
    process: [
      { title: "Feasibility and survey", text: "We review the property, brief, planning history, neighbouring relationships and likely approval route." },
      { title: "Design development", text: "Options are tested against space, light, external appearance, buildability and budget priorities." },
      { title: "Planning submission", text: "We prepare the drawings and supporting information needed for permitted development, lawful development or full planning." },
      { title: "Technical design", text: "Where appointed, the approved concept is developed into a coordinated Building Regulations package." }
    ],
    deliverables: ["Existing and proposed plans", "Elevations and sections", "Planning strategy advice", "Design and Access Statement where required", "Building Regulations drawings", "Consultant coordination"],
    faqs: [
      { question: "Do all extensions need planning permission?", answer: "No. Some extensions may fall within permitted development, but the limits depend on property type, previous alterations, location and design." },
      { question: "Can you help after a refusal?", answer: "Yes. We can review the decision notice and officer report, then advise whether redesign, resubmission or appeal is the strongest route." },
      { question: "Do you provide construction drawings?", answer: "Yes. Our Building Regulations packages can include plans, sections, specifications and coordinated technical details." }
    ]
  },
  {
    slug: "loft-conversions",
    title: "Loft Conversion Architect",
    metaTitle: "Loft Conversion Architect | Dormers, Hip-to-Gable & Planning",
    metaDescription: "Design, permitted development checks and Building Regulations drawings for dormer, hip-to-gable, rooflight and mansard loft conversions.",
    hero: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=88",
    intro: "Loft conversions can unlock valuable space, but headroom, stairs, fire safety, roof structure and external appearance all need to work together.",
    idealFor: ["Rear dormer conversions", "Hip-to-gable conversions", "Rooflight conversions", "Mansard proposals", "Loft bedrooms and home offices"],
    process: [
      { title: "Roof-space appraisal", text: "We assess headroom, ridge height, stair position, roof structure and likely usable floor area." },
      { title: "Planning route", text: "We confirm whether permitted development, a Lawful Development Certificate or planning permission is appropriate." },
      { title: "Layout and form", text: "The stair, dormer, roof form and internal arrangement are developed together." },
      { title: "Technical coordination", text: "Fire precautions, insulation, structure, ventilation and drainage are incorporated into the technical package." }
    ],
    deliverables: ["Existing and proposed roof plans", "Floor plans and sections", "Dormer elevations", "Volume calculations where needed", "Building Regulations package", "Fire-safety coordination"],
    faqs: [
      { question: "How much roof volume is permitted?", answer: "The standard limits are generally 40m³ for terraced houses and 50m³ for detached and semi-detached houses, subject to the detailed conditions." },
      { question: "Can a front dormer be permitted development?", answer: "Usually not on the principal elevation facing a highway. Front dormers commonly require planning permission." },
      { question: "Will I need a protected stair?", answer: "Many loft conversions require a compliant protected escape route. The solution depends on the height, layout and Building Regulations strategy." }
    ]
  },
  {
    slug: "new-build-homes",
    title: "New Build Home Architect",
    metaTitle: "New Build Home Architect | One-Off Houses & Small Developments",
    metaDescription: "Feasibility, planning and technical design for one-off houses, replacement dwellings, infill plots and small residential developments.",
    hero: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=88",
    intro: "New homes need a strong response to context, access, amenity, landscape, planning policy and buildability. We develop the design and planning case together.",
    idealFor: ["One-off houses", "Replacement dwellings", "Backland and infill plots", "Small residential developments", "Low-energy homes"],
    process: [
      { title: "Site feasibility", text: "We test access, constraints, planning history, local character, likely capacity and development risks." },
      { title: "Concept design", text: "Massing, layout, orientation, parking, amenity and architectural character are developed iteratively." },
      { title: "Planning case", text: "The proposal is supported by the drawings, statements and consultant information needed for validation." },
      { title: "Technical design", text: "Following approval, the scheme can be developed for Building Regulations and consultant coordination." }
    ],
    deliverables: ["Site feasibility study", "Concept layouts", "Planning drawings", "Design and Access Statement", "Consultant coordination", "Building Regulations package"],
    faqs: [
      { question: "Can you assess a plot before purchase?", answer: "Yes. Early feasibility can help identify planning risks, likely capacity and whether further specialist work is justified." },
      { question: "Do you work on small housing developments?", answer: "Yes. We support one-off homes and small residential sites, with fees scaled to the number and complexity of proposed units." },
      { question: "Can you coordinate planning consultants?", answer: "Yes. We can coordinate ecology, trees, drainage, highways, heritage and other specialist inputs where required." }
    ]
  },
  {
    slug: "hmo-conversions",
    title: "HMO Conversion Architect",
    metaTitle: "HMO Architect | Planning, Licensing & Building Regulations",
    metaDescription: "HMO planning applications, layout reviews, fire-safety coordination and Building Regulations drawings for C4 and sui generis HMOs.",
    hero: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=88",
    intro: "HMO projects must balance planning use, Article 4 controls, room standards, communal amenity, licensing and fire safety from the outset.",
    idealFor: ["C3 to C4 conversions", "Sui generis HMOs", "Existing HMO regularisation", "HMO extensions", "Investor feasibility studies"],
    process: [
      { title: "Planning and licensing review", text: "We confirm the likely use class, Article 4 position, local HMO policy and licensing implications." },
      { title: "Space-standard appraisal", text: "Bedrooms, kitchens, communal space, bathrooms, refuse and cycle provision are checked." },
      { title: "Planning layout", text: "The proposal is developed to address occupancy, amenity and likely planning objections." },
      { title: "Technical and fire coordination", text: "Fire separation, escape, doors, alarms, ventilation and Building Regulations are coordinated." }
    ],
    deliverables: ["HMO feasibility review", "Existing and proposed plans", "Planning submission", "Space-standard schedule", "Fire-safety layout coordination", "Building Regulations drawings"],
    faqs: [
      { question: "Does a 6-person HMO need planning permission?", answer: "Often yes, because larger HMOs can fall within sui generis use. Local Article 4 Directions may also remove permitted development rights for smaller HMOs." },
      { question: "Do you advise on licensing?", answer: "We coordinate the architectural information and can review layouts against licensing standards, though the local authority remains the final decision-maker." },
      { question: "Can every bedroom have an ensuite?", answer: "Not always. The layout must still provide suitable shared amenity, circulation, ventilation and fire safety." }
    ]
  },
  {
    slug: "planning-applications",
    title: "Planning Application Architect",
    metaTitle: "Planning Application Architect | Drawings, Statements & Strategy",
    metaDescription: "Residential planning drawings, planning statements, Design and Access Statements and submission support for extensions, conversions and new homes.",
    hero: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1800&q=88",
    intro: "Planning success depends on more than drawings. We build the design and supporting case around policy, context, amenity and the likely concerns of the planning authority.",
    idealFor: ["Householder planning applications", "Lawful Development Certificates", "Changes of use", "Flat and HMO conversions", "New dwellings and small sites"],
    process: [
      { title: "Policy and site review", text: "We identify the development plan, planning history, constraints and likely validation requirements." },
      { title: "Planning-led design", text: "The proposal is developed against character, amenity, access, space standards and other relevant tests." },
      { title: "Supporting documents", text: "Statements, schedules and consultant inputs are prepared or coordinated where required." },
      { title: "Submission and monitoring", text: "We submit the application, monitor progress and respond to proportionate officer queries." }
    ],
    deliverables: ["Planning drawings", "Planning Statement", "Design and Access Statement", "Heritage Impact Assessment where required", "Application forms and submission", "Officer liaison"],
    faqs: [
      { question: "How long does planning permission take?", answer: "Householder applications usually target eight weeks, although validation, amendments and extensions of time can extend the programme." },
      { question: "Can you submit a Lawful Development Certificate?", answer: "Yes. We prepare the drawings and supporting case for proposed or existing lawful development applications." },
      { question: "Can you guarantee approval?", answer: "No architect can guarantee approval. We can, however, provide a realistic strategy and improve the quality and clarity of the submission." }
    ]
  },
  {
    slug: "building-regulations",
    title: "Building Regulations Drawings",
    metaTitle: "Building Regulations Drawings | Residential Technical Design",
    metaDescription: "Detailed Building Regulations drawings for extensions, loft conversions, new homes, HMOs and residential conversions.",
    hero: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=88",
    intro: "Technical drawings turn an approved design into coordinated information for Building Control, consultants and contractors.",
    idealFor: ["House extensions", "Loft conversions", "New-build homes", "HMOs and flat conversions", "Residential remodelling"],
    process: [
      { title: "Approved design review", text: "We confirm the planning position, scope, construction assumptions and consultant requirements." },
      { title: "Technical development", text: "Structure, insulation, fire safety, drainage, ventilation and construction build-ups are coordinated." },
      { title: "Consultant integration", text: "Structural and specialist information is incorporated where available and necessary." },
      { title: "Building Control submission", text: "The drawing package is issued for the chosen Building Control route and queries are addressed within the appointment." }
    ],
    deliverables: ["Technical plans and sections", "Construction details", "Fire and thermal notes", "Drainage and ventilation information", "Building Control submission", "Consultant coordination"],
    faqs: [
      { question: "Are planning drawings enough to build from?", answer: "Usually not. Planning drawings focus on appearance and land-use impacts, while Building Regulations drawings address technical compliance and construction." },
      { question: "Do I need a structural engineer?", answer: "Many extensions, lofts and conversions require structural calculations. We can coordinate with the engineer you appoint." },
      { question: "Do you provide tender documents?", answer: "Our standard technical package is aimed at Building Regulations. Tender and construction-stage services can be discussed separately where required." }
    ]
  }
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
