import {
  findPage,
  guides,
  locations as baseLocations,
  services,
} from "./content";
import type { LocationItem, PageItem } from "./content";

const additionalLocations: LocationItem[] = [
  {
    slug: "bournville-architects",
    title: "Residential Architects in Bournville",
    shortTitle: "Bournville",
    seoTitle: "Architects in Bournville | Extensions & Conservation",
    description:
      "RIBA Chartered residential architects in Bournville for sensitive house extensions, loft conversions, planning applications and Building Regulations.",
    intro:
      "Director-led residential architecture for Bournville homes, combining practical family layouts with careful conservation, planning and technical design.",
    localContext:
      "Bournville is defined by its model-village character, generous gardens, mature trees, distinctive Arts and Crafts influences and estate-managed streets. Extensions and alterations need to protect that identity while delivering the space, light and functionality expected from a modern family home.",
    nearbyAreas: ["Kings Heath", "Harborne", "Moseley", "Selly Oak", "Birmingham", "Solihull"],
    serviceSlugs: ["house-extensions", "loft-conversions", "planning-applications", "building-regulations"],
    points: [
      "Conservation-sensitive house extensions",
      "Loft conversions and internal remodelling",
      "Bournville estate and planning approvals",
      "Building Regulations and technical design",
    ],
    authorityPage: true,
    planningIntro:
      "Bournville Village is a conservation area with an Article 4 Direction, and some properties may also require separate estate consent. The external design, materials, landscape and approval route should therefore be tested before the scheme is fixed.",
    planningTopics: [
      {
        title: "Bournville conservation and Article 4 controls",
        body:
          "Bournville Village has additional protection for its architectural and landscape character. Works that might normally be permitted development can require planning permission where Article 4 controls apply.",
        href: "https://www.birmingham.gov.uk/downloads/download/223/",
        linkLabel: "Bournville Village conservation documents",
      },
      {
        title: "Estate consent and appropriate materials",
        body:
          "Birmingham City Council advises that Bournville properties may also need permission from the estate manager. Brick, render, roof coverings, windows, boundaries and landscape details should respond to the established character.",
        href: "https://www.birmingham.gov.uk/conservationpermission",
        linkLabel: "Birmingham conservation permission guidance",
      },
      {
        title: "Extensions, trees and neighbour amenity",
        body:
          "The footprint and massing of an extension must balance additional living space with garden character, protected trees, daylight, privacy and the relationship with neighbouring homes.",
        href: "https://www.birmingham.gov.uk/info/20160/planning_applications/3004/how_we_assess_planning_applications",
        linkLabel: "Birmingham planning assessment guidance",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for an extension in Bournville?",
        answer:
          "Possibly. The dimensions and position of the extension must be checked alongside the property's planning history, conservation-area status, Article 4 controls and any separate Bournville estate requirements.",
      },
      {
        question: "What does the Bournville Article 4 Direction affect?",
        answer:
          "It withdraws specified permitted development rights to protect the area's character. Depending on the property, planning permission may be needed for alterations that would normally be allowed without an application.",
      },
      {
        question: "Is Bournville estate consent separate from planning permission?",
        answer:
          "Yes. Estate consent is a separate private approval and does not replace planning permission, listed building consent or Building Regulations approval where these are required.",
      },
      {
        question: "Can a modern extension work in Bournville?",
        answer:
          "Yes, where its scale, form, materials and landscape response are carefully developed. A contemporary addition does not need to imitate the original house, but it should respect its proportions and setting.",
      },
    ],
    projectTerms: ["bournville", "selly oak", "stirchley", "cotteridge", "south birmingham"],
    projectIntro:
      "A selection of extensions, loft conversions and residential transformations from Bournville and south Birmingham.",
  },
  {
    slug: "wolverhampton-architects",
    title: "Residential Architects in Wolverhampton",
    shortTitle: "Wolverhampton",
    seoTitle: "Residential Architects Wolverhampton | Extensions & Planning",
    description:
      "RIBA Chartered residential architects in Wolverhampton for extensions, loft conversions, new homes, HMOs, planning and Building Regulations.",
    intro:
      "Architectural design and planning support for homeowners, developers and property investors across Wolverhampton and the western West Midlands.",
    localContext:
      "Wolverhampton includes Victorian and Edwardian terraces, inter-war suburbs, larger detached homes, conservation areas and brownfield development opportunities. Good residential design must respond to local character, neighbouring amenity, access, parking, trees and the technical realities of the existing building.",
    nearbyAreas: ["Walsall", "Aldridge", "Sutton Coldfield", "Birmingham", "Tettenhall", "Codsall"],
    serviceSlugs: ["house-extensions", "loft-conversions", "new-build-homes", "hmo-conversions", "planning-applications", "building-regulations"],
    points: [
      "House extensions and whole-home remodelling",
      "Loft conversions and roof alterations",
      "HMOs, flats and changes of use",
      "New homes and residential development",
    ],
    authorityPage: true,
    planningIntro:
      "Wolverhampton proposals are assessed against the city's development plan and residential design guidance. Conservation areas, Article 4 controls, neighbour amenity, parking and the lawful planning history can materially change the best approval route.",
    planningTopics: [
      {
        title: "House-extension design guidance",
        body:
          "The council's extension guidance addresses scale, siting, appearance and the relationship with neighbouring properties. Two-storey and side additions require particular care to avoid overdominance or a terracing effect.",
        href: "https://www.wolverhampton.gov.uk/planning/planning-policies/supplementary-planning-documents-and-development-briefs",
        linkLabel: "Wolverhampton supplementary planning guidance",
      },
      {
        title: "Conservation areas and heritage assets",
        body:
          "Wolverhampton has a substantial network of conservation areas. Proposals affecting protected streets, listed buildings, locally listed assets or mature trees need a proportionate heritage and design response.",
        href: "https://www.wolverhampton.gov.uk/planning/conservation",
        linkLabel: "Wolverhampton conservation guidance",
      },
      {
        title: "City-wide HMO Article 4 Direction",
        body:
          "Planning permission is required across Wolverhampton to change a dwellinghouse from use class C3 to a small HMO in use class C4, alongside any separate licensing and fire-safety requirements.",
        href: "https://www.wolverhampton.gov.uk/planning/planning-policies/small-houses-multiple-occupation-article-4-direction",
        linkLabel: "Wolverhampton HMO Article 4 guidance",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for a Wolverhampton house extension?",
        answer:
          "Some extensions may be permitted development, but the dimensions, position, previous additions, planning conditions and any conservation or Article 4 controls must be checked before relying on that route.",
      },
      {
        question: "Can you design an HMO conversion in Wolverhampton?",
        answer:
          "Yes. We can review the planning use, Article 4 requirements, room sizes, shared amenity, refuse, cycle storage, fire strategy and Building Regulations implications before preparing an application.",
      },
      {
        question: "Can Hepburn Architects assess a development site?",
        answer:
          "Yes. An early feasibility review can test planning history, site capacity, access, parking, neighbouring amenity, heritage, trees and likely consultant requirements before significant design work begins.",
      },
      {
        question: "Do you prepare Building Regulations drawings for Wolverhampton projects?",
        answer:
          "Yes. We prepare coordinated technical drawings and specifications for extensions, loft conversions, conversions and new homes, with structural and specialist information coordinated where needed.",
      },
    ],
    projectTerms: ["wolverhampton", "tettenhall", "bilston", "wednesfield", "codsall", "west midlands"],
    projectIntro:
      "A selection of extensions, conversions and residential development work from Wolverhampton and the western West Midlands.",
  },
  {
    slug: "walsall-architects",
    title: "Residential Architects in Walsall",
    shortTitle: "Walsall",
    seoTitle: "Residential Architects Walsall | Extensions, HMOs & Planning",
    description:
      "RIBA Chartered residential architects in Walsall for house extensions, loft conversions, HMOs, new homes, planning and Building Regulations.",
    intro:
      "Director-led residential architecture for homes, conversions and development opportunities across Walsall and the wider Black Country.",
    localContext:
      "Walsall has a varied housing stock ranging from traditional terraces and suburban semis to detached homes, conservation areas and redevelopment sites. Successful schemes need to combine a clear design response with careful checks on planning history, access, parking, neighbour amenity and local character.",
    nearbyAreas: ["Aldridge", "Wolverhampton", "Sutton Coldfield", "Birmingham", "Solihull", "Bloxwich"],
    serviceSlugs: ["house-extensions", "loft-conversions", "new-build-homes", "hmo-conversions", "planning-applications", "building-regulations"],
    points: [
      "House extensions and loft conversions",
      "HMOs and residential conversions",
      "New homes and small development sites",
      "Planning and Building Regulations",
    ],
    authorityPage: true,
    planningIntro:
      "Walsall Council expects proposals to be supported by the correct validation information and assessed against local design, heritage and amenity considerations. The borough-wide HMO Article 4 Direction also changes the planning route for small HMO conversions.",
    planningTopics: [
      {
        title: "Householder planning and lawful development",
        body:
          "Extensions and alterations should begin with a review of permitted development limits, property history and local restrictions. A Lawful Development Certificate can provide formal confirmation where appropriate.",
        href: "https://go.walsall.gov.uk/planning-and-building-control/planning-householders",
        linkLabel: "Walsall householder planning guidance",
      },
      {
        title: "Local design and character",
        body:
          "Walsall's design guidance places emphasis on context, street character, urban form and the quality of the planning submission. Layout, scale, materials and landscape should be developed as one coordinated proposal.",
        href: "https://go.walsall.gov.uk/planning-and-building-control/planning-policy/current-planning-policy/supplementary-planning",
        linkLabel: "Designing Walsall guidance",
      },
      {
        title: "Borough-wide HMO Article 4 Direction",
        body:
          "The permitted development right for changing a family dwelling to a small HMO has been withdrawn across Walsall borough, so planning permission is required in addition to licensing checks.",
        href: "https://go.walsall.gov.uk/planning-and-building-control/listed-buildings-conservation-and-environment/buildings-and-areas",
        linkLabel: "Walsall Article 4 directions",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for an extension in Walsall?",
        answer:
          "Not always. Some extensions can be permitted development, but the proposal must comply with detailed limits and conditions, and the property's history, conservation status and any removed rights must be checked.",
      },
      {
        question: "Does a small HMO need planning permission in Walsall?",
        answer:
          "Yes. The borough-wide Article 4 Direction means a change from a family dwelling in class C3 to a small HMO in class C4 requires planning permission, as well as any necessary licence.",
      },
      {
        question: "Can you help with a house-to-flats conversion?",
        answer:
          "Yes. We can assess the principle of subdivision, space standards, amenity, parking, refuse, acoustic separation, fire safety and the drawings and statements required for planning and Building Regulations.",
      },
      {
        question: "Can you provide a feasibility study before I buy a property?",
        answer:
          "Yes. A proportionate feasibility review can identify planning constraints, likely development capacity, key risks and the further surveys or consultants that may be required.",
      },
    ],
    projectTerms: ["walsall", "bloxwich", "willenhall", "darlaston", "brownhills", "black country"],
    projectIntro:
      "A selection of extensions, HMOs, conversions and residential development work from Walsall and the Black Country.",
  },
  {
    slug: "kings-heath-architects",
    title: "Residential Architects in Kings Heath",
    shortTitle: "Kings Heath",
    seoTitle: "Architects in Kings Heath | Extensions, Lofts & Planning",
    description:
      "RIBA Chartered residential architects in Kings Heath for period-home extensions, loft conversions, remodelling, planning and Building Regulations.",
    intro:
      "Design-led residential architecture for Victorian terraces, Edwardian homes and family properties across Kings Heath and south Birmingham.",
    localContext:
      "Kings Heath combines dense traditional streets, larger period houses, inter-war suburbs and busy neighbourhood centres. Extensions and loft conversions must make efficient use of often constrained plots while protecting daylight, privacy, garden space, parking and the established rhythm of the street.",
    nearbyAreas: ["Moseley", "Bournville", "Edgbaston", "Harborne", "Birmingham", "Solihull"],
    serviceSlugs: ["house-extensions", "loft-conversions", "hmo-conversions", "planning-applications", "building-regulations"],
    points: [
      "Kitchen and family extensions",
      "Loft conversions for period homes",
      "Whole-house remodelling",
      "HMOs, planning and technical drawings",
    ],
    authorityPage: true,
    planningIntro:
      "Kings Heath projects are assessed under Birmingham planning policy, with close attention to neighbour amenity, street character, parking and trees. The city-wide HMO Article 4 Direction also means small HMO conversions require planning permission.",
    planningTopics: [
      {
        title: "Extensions on constrained urban plots",
        body:
          "Rear, side and two-storey extensions need to protect reasonable daylight, outlook and privacy while remaining proportionate to the original house and garden.",
        href: "https://www.birmingham.gov.uk/info/20160/planning_applications/3004/how_we_assess_planning_applications",
        linkLabel: "Birmingham planning assessment guidance",
      },
      {
        title: "Kings Heath local character and movement",
        body:
          "The local action plan covers land-use and transport considerations around High Street, Alcester Road South and adjoining side streets. Access, parking and the relationship with the neighbourhood centre can influence proposals.",
        href: "https://www.birmingham.gov.uk/downloads/download/168/kings_heath_local_action_plan",
        linkLabel: "Kings Heath Local Action Plan",
      },
      {
        title: "HMOs and Birmingham's Article 4 Direction",
        body:
          "Changing a family dwelling to a small HMO requires a planning application across Birmingham. Occupancy, amenity, refuse, parking, licensing and fire safety should be coordinated from the outset.",
        href: "https://www.birmingham.gov.uk/info/20054/local_plan_documents/1933/city-wide_article_4_direction_relating_to_houses_in_multiple_occupation_hmos",
        linkLabel: "Birmingham HMO Article 4 guidance",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for an extension in Kings Heath?",
        answer:
          "Some extensions may be permitted development, but the dimensions, roof form, position, previous additions and any planning conditions must be checked. Planning permission is often required for larger side, rear or two-storey schemes.",
      },
      {
        question: "Can a Kings Heath terrace have a loft conversion?",
        answer:
          "Often yes, subject to roof volume, headroom, stair position, fire safety, structural design and planning constraints. Front roof alterations and some dormers are more likely to require planning permission.",
      },
      {
        question: "Does a Kings Heath HMO require planning permission?",
        answer:
          "Yes for a change from a family dwelling to a small HMO, because Birmingham's city-wide Article 4 Direction removes the normal permitted development right for that change.",
      },
      {
        question: "Can you redesign the ground floor as well as adding an extension?",
        answer:
          "Yes. The strongest projects usually consider circulation, storage, utility space, daylight and the relationship with the garden rather than treating the extension as an isolated room.",
      },
    ],
    projectTerms: ["kings heath", "moseley", "billesley", "hall green", "stirchley", "south birmingham"],
    projectIntro:
      "A selection of extensions, loft conversions and residential remodelling projects from Kings Heath and south Birmingham.",
  },
  {
    slug: "leamington-spa-architects",
    title: "Residential Architects in Leamington Spa",
    shortTitle: "Leamington Spa",
    seoTitle: "Architects in Leamington Spa | Extensions & Period Homes",
    description:
      "RIBA Chartered residential architects in Leamington Spa for period-home extensions, loft conversions, remodelling, planning and Building Regulations.",
    intro:
      "Director-led residential architecture for period properties, family homes, conversions and development opportunities across Royal Leamington Spa.",
    localContext:
      "Leamington Spa includes Regency and Victorian townscape, established suburban streets, conservation areas, listed buildings and contemporary growth areas. Residential work must balance heritage and local character with neighbour amenity, parking, landscape, flood considerations and modern standards of space and energy performance.",
    nearbyAreas: ["Warwick", "Kenilworth", "Cubbington", "Whitnash", "Solihull", "Birmingham"],
    serviceSlugs: ["house-extensions", "loft-conversions", "new-build-homes", "hmo-conversions", "planning-applications", "building-regulations"],
    points: [
      "Period-home extensions and remodelling",
      "Loft conversions and roof alterations",
      "HMOs and residential conversions",
      "New homes, planning and technical design",
    ],
    authorityPage: true,
    planningIntro:
      "Leamington Spa proposals may need to address the Warwick District Residential Design Guide, the made Royal Leamington Spa Neighbourhood Plan, conservation-area policies and the town-wide HMO Article 4 Direction.",
    planningTopics: [
      {
        title: "Residential design and neighbour amenity",
        body:
          "Warwick District's Residential Design Guide covers extensions as well as new housing and conversions. Scale, separation, outlook, privacy, parking and a clear response to local character should be resolved together.",
        href: "https://www.warwickdc.gov.uk/info/20794/supplementary_planning_documents_and_other_guidance",
        linkLabel: "Warwick District residential design guidance",
      },
      {
        title: "Conservation areas and the neighbourhood plan",
        body:
          "The made Royal Leamington Spa Neighbourhood Plan forms part of the development plan. Heritage, local character, green space, movement and neighbourhood policies may be material to residential proposals.",
        href: "https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1096/royal_leamington_spa",
        linkLabel: "Royal Leamington Spa Neighbourhood Plan",
      },
      {
        title: "Town-wide HMO Article 4 Direction",
        body:
          "A change from a dwellinghouse in class C3 to a small HMO in class C4 requires planning permission throughout Leamington Spa, in addition to licensing and technical compliance.",
        href: "https://www.warwickdc.gov.uk/info/20794/supplementary_planning_documents_and_other_guidance/272/hmo_article_4_direction",
        linkLabel: "Leamington Spa HMO Article 4 guidance",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for an extension in Leamington Spa?",
        answer:
          "Some extensions may be permitted development, but the property's location, planning history, conservation or listed status, Article 4 controls and the detailed dimensions of the proposal must be checked.",
      },
      {
        question: "Can you design an extension to a period property?",
        answer:
          "Yes. We assess the significance and proportions of the existing building, then develop an addition that improves daily use while responding appropriately to materials, setting and neighbouring properties.",
      },
      {
        question: "Does a small HMO need planning permission in Leamington Spa?",
        answer:
          "Yes. The Article 4 Direction applies across the whole town, so a change from class C3 to class C4 requires a planning application as well as any necessary HMO licence.",
      },
      {
        question: "Can you help with a new home or development plot near Leamington?",
        answer:
          "Yes. We can assess planning policy, neighbourhood-plan considerations, access, landscape, flood risk, ecology, heritage and neighbouring amenity before developing the design.",
      },
    ],
    projectTerms: ["leamington spa", "royal leamington spa", "warwick", "kenilworth", "whitnash", "warwickshire"],
    projectIntro:
      "A selection of period-property, extension and residential development work from Leamington Spa and Warwickshire.",
  },
  {
    slug: "aldridge-architects",
    title: "Residential Architects in Aldridge",
    shortTitle: "Aldridge",
    seoTitle: "Architects in Aldridge | Extensions & New Homes",
    description:
      "RIBA Chartered residential architects in Aldridge for house extensions, loft conversions, new homes, planning applications and Building Regulations.",
    intro:
      "Residential architecture for family homes, larger extensions, remodelling and development opportunities across Aldridge and north-east Walsall.",
    localContext:
      "Aldridge includes established suburban streets, larger detached homes, mature gardens, a historic conservation area and a close relationship with surrounding Green Belt countryside. Proposals need to respond to the original house, street character, trees, access, parking and neighbouring amenity.",
    nearbyAreas: ["Walsall", "Sutton Coldfield", "Wolverhampton", "Birmingham", "Streetly", "Brownhills"],
    serviceSlugs: ["house-extensions", "loft-conversions", "new-build-homes", "planning-applications", "building-regulations"],
    points: [
      "Single and two-storey house extensions",
      "Loft conversions and whole-home remodelling",
      "Replacement homes and development plots",
      "Planning and Building Regulations",
    ],
    authorityPage: true,
    planningIntro:
      "Aldridge projects are determined by Walsall Council and may involve conservation-area, Green Belt, tree, access and neighbour-amenity considerations. The site's constraints should be established before the footprint and architectural language are fixed.",
    planningTopics: [
      {
        title: "Extensions to established family homes",
        body:
          "The proposal should remain proportionate to the original dwelling, protect daylight and outlook, avoid harmful overlooking and maintain an appropriate relationship with the street and garden.",
        href: "https://go.walsall.gov.uk/planning-and-building-control/planning-householders",
        linkLabel: "Walsall householder planning guidance",
      },
      {
        title: "Aldridge Conservation Area",
        body:
          "The historic centre is a designated conservation area. Development affecting it should preserve or enhance its character, with careful attention to scale, materials, boundaries, trees and the setting of heritage assets.",
        href: "https://go.walsall.gov.uk/planning-and-building-control/listed-buildings-conservation-and-environment/conservation-areas",
        linkLabel: "Walsall conservation areas",
      },
      {
        title: "Green Belt edges and development potential",
        body:
          "Sites near the settlement edge may require a careful policy assessment of openness, landscape character, lawful buildings and the principle and scale of any replacement or additional dwelling.",
        href: "https://go.walsall.gov.uk/planning-and-building-control/planning-policy",
        linkLabel: "Walsall planning policy",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for an extension in Aldridge?",
        answer:
          "Some extensions can be permitted development, but the size, height and position, previous additions, planning conditions, conservation status and proximity to protected land must be checked first.",
      },
      {
        question: "Can I build a two-storey side extension?",
        answer:
          "Potentially. The design normally needs to address side spacing, roof form, setback, the risk of a terracing effect, neighbour amenity and whether the extension remains subordinate to the original house.",
      },
      {
        question: "Can you assess a replacement dwelling or garden plot?",
        answer:
          "Yes. We can review the lawful site position, access, Green Belt or settlement policy, trees, landscape, character, neighbouring amenity and likely development capacity before preparing a full proposal.",
      },
      {
        question: "Can Hepburn Architects handle both planning and Building Regulations?",
        answer:
          "Yes. The appointment can include measured survey, feasibility, design, planning submission and a coordinated technical drawing package for Building Control and contractor pricing.",
      },
    ],
    projectTerms: ["aldridge", "streetly", "brownhills", "walsall wood", "north walsall", "staffordshire"],
    projectIntro:
      "A selection of extensions, remodelling and new-home projects from Aldridge and the surrounding West Midlands.",
  },
];

export type { LocationItem, PageItem };
export { findPage, guides, services };
export const locations: LocationItem[] = [...baseLocations, ...additionalLocations];
