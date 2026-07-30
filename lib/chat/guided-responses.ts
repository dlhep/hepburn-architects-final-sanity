export type GuidedTopic = {
  id: string;
  label: string;
  response: string;
  links: Array<{ label: string; href: string }>;
};

export const guidedTopics: GuidedTopic[] = [
  {
    id: "planning",
    label: "Do I need planning permission?",
    response:
      "The approval route depends on the property, its planning history, local constraints and the proposed work. Some projects may fall within permitted development, but this should be checked before relying on it.",
    links: [
      { label: "Planning applications", href: "/services/planning-applications" },
      { label: "Planning permission guidance", href: "/knowledge-centre/planning-permission" },
    ],
  },
  {
    id: "extension",
    label: "House extension",
    response:
      "Hepburn Architects can help from early feasibility and planning strategy through to design, planning drawings and Building Regulations information for single-storey, two-storey and wrap-around extensions.",
    links: [
      { label: "House extension service", href: "/services/house-extensions" },
      { label: "House extension Knowledge Centre", href: "/knowledge-centre/house-extensions" },
      { label: "Free house extension guide", href: "/house-extension-guide" },
    ],
  },
  {
    id: "loft",
    label: "Loft conversion",
    response:
      "A loft conversion needs early checks of roof space, stair position, planning constraints, structure and fire safety. Hepburn can review the likely route and prepare planning and technical drawings where appropriate.",
    links: [
      { label: "Loft conversion service", href: "/services/loft-conversions" },
      { label: "Loft conversion guidance", href: "/knowledge-centre/loft-conversions" },
    ],
  },
  {
    id: "hmo",
    label: "HMO or change of use",
    response:
      "The route can depend on proposed occupancy, the existing use, local Article 4 controls, space standards, licensing and fire-safety requirements. A property-specific review is important before a layout or planning route is confirmed.",
    links: [
      { label: "HMO conversion service", href: "/services/hmo-conversions" },
      { label: "HMO planning guide", href: "/guides/hmo-conversion-planning-guide" },
    ],
  },
  {
    id: "new-build",
    label: "New-build home",
    response:
      "For a new home, Hepburn can assess site potential, planning context, access, amenity and design constraints before developing the planning and technical packages.",
    links: [
      { label: "New-build homes service", href: "/services/new-build-homes" },
      { label: "Explore completed projects", href: "/projects" },
    ],
  },
  {
    id: "building-regulations",
    label: "Building Regulations",
    response:
      "Building Regulations are separate from planning and cover technical matters such as structure, fire safety, ventilation, drainage and energy performance. Hepburn prepares coordinated technical drawing packages, with specialist input where required.",
    links: [
      { label: "Building Regulations service", href: "/services/building-regulations" },
      { label: "Building Regulations guidance", href: "/knowledge-centre/building-regulations" },
    ],
  },
  {
    id: "fees",
    label: "Architectural fees",
    response:
      "Fees depend on the property, project complexity, approval route and stages required. The online calculator gives an initial indication; a binding fee is provided only after the brief and available information have been reviewed.",
    links: [
      { label: "Use the fee calculator", href: "/estimate" },
      { label: "How residential fees work", href: "/guides/architect-fees-residential-project" },
    ],
  },
  {
    id: "contact",
    label: "Speak to the practice",
    response:
      "You can contact the practice directly, book a free 30-minute consultation or send a project enquiry. A member of the practice will review the information you provide.",
    links: [
      { label: "Contact Hepburn Architects", href: "/contact" },
      { label: "Book a consultation", href: "https://calendly.com/david-hepburnarchitects/30min" },
    ],
  },
];

export function matchGuidedTopic(question: string) {
  const value = question.toLowerCase();
  if (/(fee|price|cost|quote)/.test(value)) return guidedTopics.find((topic) => topic.id === "fees");
  if (/(hmo|change of use|flat conversion)/.test(value)) return guidedTopics.find((topic) => topic.id === "hmo");
  if (/(loft|dormer|roof conversion)/.test(value)) return guidedTopics.find((topic) => topic.id === "loft");
  if (/(extension|extend|wrap.?around)/.test(value)) return guidedTopics.find((topic) => topic.id === "extension");
  if (/(new.?build|new home|replacement dwelling)/.test(value)) return guidedTopics.find((topic) => topic.id === "new-build");
  if (/(building regulation|building control|technical drawing)/.test(value)) {
    return guidedTopics.find((topic) => topic.id === "building-regulations");
  }
  if (/(planning|permitted development|permission|article 4)/.test(value)) {
    return guidedTopics.find((topic) => topic.id === "planning");
  }
  return undefined;
}
