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
  ribaStages: string[];
  typicalProgramme: string[];
  feeContext: string;
  exclusions: string[];
  relatedGuides: { slug: string; title: string }[];
  projectTerms: string[];
  projectIntro: string;
  faqs: { question: string; answer: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "house-extensions",
    title: "House Extension Architect",
    metaTitle: "House Extension Architect | Planning & Building Regulations",
    metaDescription: "Architectural design, planning applications and Building Regulations drawings for single-storey, two-storey, side and wrap-around extensions.",
    hero: "/images/selected-work-2.png",
    intro: "A successful extension should improve more than floor area. We design around daylight, circulation, privacy, garden connection, planning policy and the long-term value of the home.",
    idealFor: ["Single-storey rear extensions", "Two-storey side and rear extensions", "Wrap-around extensions", "Kitchen and family-room extensions", "Period-property additions"],
    process: [
      { title: "Feasibility and survey", text: "We review the property, brief, planning history, neighbouring relationships and likely approval route." },
      { title: "Design development", text: "Options are tested against space, light, external appearance, buildability and budget priorities." },
      { title: "Planning submission", text: "We prepare the drawings and supporting information needed for permitted development, lawful development or full planning." },
      { title: "Technical design", text: "Where appointed, the approved concept is developed into a coordinated Building Regulations package." }
    ],
    deliverables: ["Existing and proposed plans", "Elevations and sections", "Planning strategy advice", "Design and Access Statement where required", "Building Regulations drawings", "Consultant coordination"],
    ribaStages: ["Stage 0–1: project appraisal and brief", "Stage 2: concept design and options", "Stage 3: planning and spatial coordination", "Stage 4: Building Regulations and technical design"],
    typicalProgramme: ["Survey and appraisal: usually 1–2 weeks", "Concept and planning design: usually 3–5 weeks", "Planning decision: commonly 8 weeks after validation, but delays occur", "Technical design: commonly 3–5 weeks after the design is fixed"],
    feeContext: "Most extension appointments are offered as a fixed fee after the property, brief, planning route and required stages have been reviewed. The online calculator provides an early guide only.",
    exclusions: ["Structural engineer calculations", "Planning and Building Control fees", "Party Wall surveying", "Specialist ecology, tree, drainage or flood reports", "Contract administration or site project management unless separately agreed"],
    relatedGuides: [
      { slug: "complete-house-extension-guide", title: "Complete House Extension Guide" },
      { slug: "planning-permission-house-extension", title: "Do I Need Planning Permission for an Extension?" },
      { slug: "house-extension-cost-uk", title: "House Extension Costs in the UK" },
      { slug: "building-regulations-drawings", title: "Building Regulations Drawings Explained" }
    ],
    projectTerms: ["extension", "renovation", "remodelling", "loft"],
    projectIntro: "A selection of extension and whole-home transformation projects showing how planning, space and material decisions are developed together.",
    faqs: [
      { question: "Do all extensions need planning permission?", answer: "No. Some extensions may fall within permitted development, but the limits depend on property type, previous alterations, location and design." },
      { question: "Can you help after a refusal?", answer: "Yes. We can review the decision notice and officer report, then advise whether redesign, resubmission or appeal is the strongest route." },
      { question: "Do you provide construction drawings?", answer: "Yes. Our Building Regulations packages can include plans, sections, specifications and coordinated technical details." },
      { question: "Will you manage the builder on site?", answer: "Our core service focuses on design, planning and technical information. Any construction-stage support must be defined and agreed separately." }
    ]
  },
  {
    slug: "loft-conversions",
    title: "Loft Conversion Architect",
    metaTitle: "Loft Conversion Architect | Dormers, Hip-to-Gable & Planning",
    metaDescription: "Design, permitted development checks and Building Regulations drawings for dormer, hip-to-gable, rooflight and mansard loft conversions.",
    hero: "/images/homepage-hero.png",
    intro: "Loft conversions can unlock valuable space, but headroom, stairs, fire safety, roof structure and external appearance all need to work together.",
    idealFor: ["Rear dormer conversions", "Hip-to-gable conversions", "Rooflight conversions", "Mansard proposals", "Loft bedrooms and home offices"],
    process: [
      { title: "Roof-space appraisal", text: "We assess headroom, ridge height, stair position, roof structure and likely usable floor area." },
      { title: "Planning route", text: "We confirm whether permitted development, a Lawful Development Certificate or planning permission is appropriate." },
      { title: "Layout and form", text: "The stair, dormer, roof form and internal arrangement are developed together." },
      { title: "Technical coordination", text: "Fire precautions, insulation, structure, ventilation and drainage are incorporated into the technical package." }
    ],
    deliverables: ["Existing and proposed roof plans", "Floor plans and sections", "Dormer elevations", "Volume calculations where needed", "Building Regulations package", "Fire-safety coordination"],
    ribaStages: ["Stage 0–1: roof-space feasibility", "Stage 2: stair and layout options", "Stage 3: planning or lawful-development submission", "Stage 4: fire, structure and technical design"],
    typicalProgramme: ["Initial appraisal and survey: usually 1–2 weeks", "Design and approval drawings: usually 3–4 weeks", "Lawful Development Certificate: statutory target commonly 8 weeks", "Technical design: usually 3–4 weeks"],
    feeContext: "Fees depend on roof complexity, the planning route, whether a measured survey is needed and whether technical design is included. A fixed proposal follows review of the existing roof and brief.",
    exclusions: ["Structural engineer design", "Party Wall matters", "Building Control and planning fees", "Roof surveys or asbestos surveys", "Site supervision unless separately agreed"],
    relatedGuides: [
      { slug: "loft-conversion-planning-permission", title: "Loft Conversion Planning Permission" },
      { slug: "permitted-development-rights-explained", title: "Permitted Development Rights Explained" },
      { slug: "planning-vs-building-regulations", title: "Planning vs Building Regulations" },
      { slug: "building-regulations-drawings", title: "Building Regulations Drawings Explained" }
    ],
    projectTerms: ["loft", "dormer", "roof", "conversion"],
    projectIntro: "Residential projects involving loft accommodation, roof alterations and coordinated internal remodelling.",
    faqs: [
      { question: "How much roof volume is permitted?", answer: "The standard limits are generally 40m³ for terraced houses and 50m³ for detached and semi-detached houses, subject to the detailed conditions." },
      { question: "Can a front dormer be permitted development?", answer: "Usually not on the principal elevation facing a highway. Front dormers commonly require planning permission." },
      { question: "Will I need a protected stair?", answer: "Many loft conversions require a compliant protected escape route. The solution depends on the height, layout and Building Regulations strategy." },
      { question: "Is a Lawful Development Certificate worthwhile?", answer: "It can provide formal evidence that a proposed loft conversion is lawful, which can be useful for future sales, lenders and contractors." }
    ]
  },
  {
    slug: "new-build-homes",
    title: "New Build Home Architect",
    metaTitle: "New Build Home Architect | One-Off Houses & Small Developments",
    metaDescription: "Feasibility, planning and technical design for one-off houses, replacement dwellings, infill plots and small residential developments.",
    hero: "/images/selected-work-1.png",
    intro: "New homes need a strong response to context, access, amenity, landscape, planning policy and buildability. We develop the design and planning case together.",
    idealFor: ["One-off houses", "Replacement dwellings", "Backland and infill plots", "Small residential developments", "Low-energy homes"],
    process: [
      { title: "Site feasibility", text: "We test access, constraints, planning history, local character, likely capacity and development risks." },
      { title: "Concept design", text: "Massing, layout, orientation, parking, amenity and architectural character are developed iteratively." },
      { title: "Planning case", text: "The proposal is supported by the drawings, statements and consultant information needed for validation." },
      { title: "Technical design", text: "Following approval, the scheme can be developed for Building Regulations and consultant coordination." }
    ],
    deliverables: ["Site feasibility study", "Concept layouts", "Planning drawings", "Design and Access Statement", "Consultant coordination", "Building Regulations package"],
    ribaStages: ["Stage 0: strategic site appraisal", "Stage 1: project brief and consultant scope", "Stage 2: concept design", "Stage 3: planning and spatial coordination", "Stage 4: technical design"],
    typicalProgramme: ["Feasibility: usually 1–3 weeks", "Concept design: commonly 4–8 weeks", "Planning preparation: commonly 4–8 weeks after the preferred option", "Planning determination: often 8–13 weeks after validation, depending on scale", "Technical design: commonly 6–12 weeks"],
    feeContext: "New homes and small developments are priced to reflect site risk, dwelling numbers, consultant coordination and the required RIBA stages. Early feasibility can be commissioned before a full appointment.",
    exclusions: ["Planning consultant and specialist consultant fees", "Topographical and utility surveys", "Ecology, arboriculture, highways, drainage and flood reports", "Structural and civil engineering", "Warranty, SAP and energy assessor fees", "Contract administration unless separately agreed"],
    relatedGuides: [
      { slug: "replacement-dwelling-planning", title: "Replacement Dwelling Planning Guide" },
      { slug: "planning-application-validation-checklist", title: "Planning Validation Checklist" },
      { slug: "planning-application-timescales", title: "Planning Application Timescales" },
      { slug: "architect-fees-residential-project", title: "Residential Architect Fees" }
    ],
    projectTerms: ["new build", "new-build", "masterplan", "development", "replacement", "apartments"],
    projectIntro: "One-off homes, apartment schemes and small residential masterplans developed around context, capacity and planning strategy.",
    faqs: [
      { question: "Can you assess a plot before purchase?", answer: "Yes. Early feasibility can help identify planning risks, likely capacity and whether further specialist work is justified." },
      { question: "Do you work on small housing developments?", answer: "Yes. We support one-off homes and small residential sites, with fees scaled to the number and complexity of proposed units." },
      { question: "Can you coordinate planning consultants?", answer: "Yes. We can coordinate ecology, trees, drainage, highways, heritage and other specialist inputs where required." },
      { question: "Can you guarantee planning permission?", answer: "No. We provide a realistic, evidence-led strategy, but the local planning authority remains the decision-maker." }
    ]
  },
  {
    slug: "hmo-conversions",
    title: "HMO Conversion Architect",
    metaTitle: "HMO Architect | Planning, Licensing & Building Regulations",
    metaDescription: "HMO planning applications, layout reviews, fire-safety coordination and Building Regulations drawings for C4 and sui generis HMOs.",
    hero: "/images/architectural-expertise-home.webp",
    intro: "HMO projects must balance planning use, Article 4 controls, room standards, communal amenity, licensing and fire safety from the outset.",
    idealFor: ["C3 to C4 conversions", "Sui generis HMOs", "Existing HMO regularisation", "HMO extensions", "Investor feasibility studies"],
    process: [
      { title: "Planning and licensing review", text: "We confirm the likely use class, Article 4 position, local HMO policy and licensing implications." },
      { title: "Space-standard appraisal", text: "Bedrooms, kitchens, communal space, bathrooms, refuse and cycle provision are checked." },
      { title: "Planning layout", text: "The proposal is developed to address occupancy, amenity and likely planning objections." },
      { title: "Technical and fire coordination", text: "Fire separation, escape, doors, alarms, ventilation and Building Regulations are coordinated." }
    ],
    deliverables: ["HMO feasibility review", "Existing and proposed plans", "Planning submission", "Space-standard schedule", "Fire-safety layout coordination", "Building Regulations drawings"],
    ribaStages: ["Stage 0–1: use, licensing and viability review", "Stage 2: occupancy and layout options", "Stage 3: planning submission and coordination", "Stage 4: fire and technical design"],
    typicalProgramme: ["Feasibility and standards review: usually 1–2 weeks", "Planning layout and submission: usually 3–5 weeks", "Planning decision: commonly 8–13 weeks after validation", "Technical and fire coordination: usually 4–6 weeks"],
    feeContext: "HMO fees reflect proposed occupancy, Article 4 or sui generis planning issues, licensing standards, fire strategy and whether Building Regulations information is required.",
    exclusions: ["Fire risk assessment by a competent specialist", "Licensing and planning application fees", "Acoustic testing or reports", "Structural engineer calculations", "Management plans and operational licensing documents unless agreed", "Site inspections unless separately appointed"],
    relatedGuides: [
      { slug: "hmo-conversion-planning-guide", title: "HMO Conversion Planning Guide" },
      { slug: "convert-house-into-flats", title: "Converting a House into Flats" },
      { slug: "planning-permission-conservation-area", title: "Planning in Conservation Areas" },
      { slug: "building-regulations-drawings", title: "Building Regulations Drawings Explained" }
    ],
    projectTerms: ["hmo", "flats", "conversion", "apartments"],
    projectIntro: "Conversion and multi-unit residential projects where planning use, space standards and technical compliance must be coordinated.",
    faqs: [
      { question: "Does a 6-person HMO need planning permission?", answer: "The answer depends on the existing lawful use, local Article 4 controls and the proposed occupancy. Larger HMOs can fall within sui generis use and require planning permission." },
      { question: "Do you advise on licensing?", answer: "We coordinate the architectural information and can review layouts against published licensing standards, though the local authority remains the final decision-maker." },
      { question: "Can every bedroom have an ensuite?", answer: "Not always. The layout must still provide suitable shared amenity, circulation, ventilation and fire safety." },
      { question: "Is planning approval the same as an HMO licence?", answer: "No. Planning, licensing and Building Regulations are separate regimes and may all apply to the same property." }
    ]
  },
  {
    slug: "planning-applications",
    title: "Planning Application Architect",
    metaTitle: "Planning Application Architect | Drawings, Statements & Strategy",
    metaDescription: "Residential planning drawings, planning statements, Design and Access Statements and submission support for extensions, conversions and new homes.",
    hero: "/images/selected-work-3.png",
    intro: "Planning success depends on more than drawings. We build the design and supporting case around policy, context, amenity and the likely concerns of the planning authority.",
    idealFor: ["Householder planning applications", "Lawful Development Certificates", "Changes of use", "Flat and HMO conversions", "New dwellings and small sites"],
    process: [
      { title: "Policy and site review", text: "We identify the development plan, planning history, constraints and likely validation requirements." },
      { title: "Planning-led design", text: "The proposal is developed against character, amenity, access, space standards and other relevant tests." },
      { title: "Supporting documents", text: "Statements, schedules and consultant inputs are prepared or coordinated where required." },
      { title: "Submission and monitoring", text: "We submit the application, monitor progress and respond to proportionate officer queries." }
    ],
    deliverables: ["Planning drawings", "Planning Statement", "Design and Access Statement", "Heritage Impact Assessment where required", "Application forms and submission", "Officer liaison"],
    ribaStages: ["Stage 0–1: planning risk and brief", "Stage 2: concept design", "Stage 3: planning submission and spatial coordination"],
    typicalProgramme: ["Planning history and policy review: usually 1–2 weeks", "Design and submission preparation: usually 3–8 weeks", "Validation: authority dependent", "Determination: commonly 8 weeks for householder applications and 13 weeks for major applications, but delays are frequent"],
    feeContext: "Planning fees are based on project type, complexity, existing information, the need for statements and the number of consultant inputs to coordinate.",
    exclusions: ["Local authority application fees", "Planning consultant or barrister fees", "Specialist surveys and reports", "Appeal work unless separately agreed", "Material redesign outside the agreed brief"],
    relatedGuides: [
      { slug: "planning-application-validation-checklist", title: "Planning Validation Checklist" },
      { slug: "planning-application-timescales", title: "Planning Application Timescales" },
      { slug: "planning-refusal-next-steps", title: "What to Do After a Planning Refusal" },
      { slug: "lawful-development-certificate", title: "Lawful Development Certificates" }
    ],
    projectTerms: ["planning", "extension", "development", "conversion", "new build", "masterplan"],
    projectIntro: "Projects illustrating planning-led design across extensions, conversions, heritage sites and residential development.",
    faqs: [
      { question: "How long does planning permission take?", answer: "Householder applications usually target eight weeks, although validation, amendments and extensions of time can extend the programme." },
      { question: "Can you submit a Lawful Development Certificate?", answer: "Yes. We prepare the drawings and supporting case for proposed or existing lawful development applications." },
      { question: "Can you guarantee approval?", answer: "No architect can guarantee approval. We can, however, provide a realistic strategy and improve the quality and clarity of the submission." },
      { question: "Will you respond to the planning officer?", answer: "Where included in the appointment, we monitor the application and respond to reasonable officer queries or amendment requests." }
    ]
  },
  {
    slug: "building-regulations",
    title: "Building Regulations Drawings",
    metaTitle: "Building Regulations Drawings | Residential Technical Design",
    metaDescription: "Detailed Building Regulations drawings for extensions, loft conversions, new homes, HMOs and residential conversions.",
    hero: "/images/architectural-expertise-home.webp",
    intro: "Technical drawings turn an approved design into coordinated information for Building Control, consultants and contractors.",
    idealFor: ["House extensions", "Loft conversions", "New-build homes", "HMOs and flat conversions", "Residential remodelling"],
    process: [
      { title: "Approved design review", text: "We confirm the planning position, scope, construction assumptions and consultant requirements." },
      { title: "Technical development", text: "Structure, insulation, fire safety, drainage, ventilation and construction build-ups are coordinated." },
      { title: "Consultant integration", text: "Structural and specialist information is incorporated where available and necessary." },
      { title: "Building Control submission", text: "The drawing package is issued for the chosen Building Control route and queries are addressed within the appointment." }
    ],
    deliverables: ["Technical plans and sections", "Construction details", "Fire and thermal notes", "Drainage and ventilation information", "Building Control submission", "Consultant coordination"],
    ribaStages: ["Stage 3: confirm approved spatial design", "Stage 4: technical design and consultant coordination"],
    typicalProgramme: ["Information and consultant review: usually 1 week", "Technical drawing production: usually 3–6 weeks", "Building Control plan check: authority or approver dependent", "Revisions and query responses: proportionate to comments received"],
    feeContext: "Technical-design fees depend on the project type, construction complexity, quality of the approved information and the level of consultant coordination required.",
    exclusions: ["Structural calculations and engineering drawings", "SAP, energy and overheating assessments", "Building Control fees", "Fire-engineering reports", "Tender administration and site inspections unless separately agreed", "Contractor temporary works and fabrication design"],
    relatedGuides: [
      { slug: "building-regulations-drawings", title: "Building Regulations Drawings Explained" },
      { slug: "planning-vs-building-regulations", title: "Planning vs Building Regulations" },
      { slug: "planning-conditions-discharge-guide", title: "Discharging Planning Conditions" },
      { slug: "architect-fees-residential-project", title: "Residential Architect Fees" }
    ],
    projectTerms: ["extension", "loft", "conversion", "new build", "renovation"],
    projectIntro: "Residential projects where approved concepts were developed into coordinated technical information.",
    faqs: [
      { question: "Are planning drawings enough to build from?", answer: "Usually not. Planning drawings focus on appearance and land-use impacts, while Building Regulations drawings address technical compliance and construction." },
      { question: "Do I need a structural engineer?", answer: "Many extensions, lofts and conversions require structural calculations. We can coordinate with the engineer you appoint." },
      { question: "Do you provide tender documents?", answer: "Our standard technical package is aimed at Building Regulations. Tender and construction-stage services can be discussed separately where required." },
      { question: "Does Building Control approval guarantee workmanship?", answer: "No. Approval confirms the submitted design route; construction quality remains the responsibility of the contractor and relevant dutyholders." }
    ]
  }
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
