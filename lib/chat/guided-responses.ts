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
      "Whether you need planning permission depends on the type, size and location of the proposed work. Some house extensions, loft conversions and alterations may fall under permitted development, although restrictions can apply to listed buildings, conservation areas and properties where permitted development rights have been removed. Hepburn Architects can review your property and proposed works before you commit to a full application.",
    links: [
      { label: "Read our planning permission guidance →", href: "/knowledge-centre/planning-permission" },
    ],
  },
  {
    id: "extension",
    label: "Can you help with a house extension?",
    response:
      "Yes. Hepburn Architects can help with single-storey, two-storey and wrap-around extensions, from early feasibility and planning strategy through to design, planning drawings and Building Regulations information. An initial review can identify the likely approval route and the main design constraints before detailed work begins.",
    links: [
      { label: "Explore house extension architectural services →", href: "/services/house-extensions" },
    ],
  },
  {
    id: "loft",
    label: "Is my loft suitable for conversion?",
    response:
      "Suitability depends on the available roof height and shape, where a safe staircase can go, structural requirements and planning constraints. Fire safety and insulation also need to be considered early. Hepburn Architects can review these points, advise on the likely approval route and prepare planning and technical drawings where appropriate.",
    links: [
      { label: "Read our loft conversion guidance →", href: "/knowledge-centre/loft-conversions" },
    ],
  },
  {
    id: "hmo",
    label: "Do I need permission for an HMO?",
    response:
      "Possibly. The correct route depends on the property's existing use, the proposed number of occupants and whether local Article 4 controls remove normal permitted development rights. Space standards, licensing and fire-safety requirements may also affect the layout, so a property-specific review is important before you proceed.",
    links: [
      { label: "Read our HMO planning guide →", href: "/guides/hmo-conversion-planning-guide" },
    ],
  },
  {
    id: "new-build",
    label: "Can you design a new-build home?",
    response:
      "Yes. Hepburn Architects can assess a site's potential, planning context, access, neighbouring amenity and design constraints before developing the design. The service can then continue through the planning and technical drawing stages, depending on what your project needs.",
    links: [
      { label: "See our new-build homes service →", href: "/services/new-build-homes" },
    ],
  },
  {
    id: "building-regulations",
    label: "What are Building Regulations drawings?",
    response:
      "Building Regulations are separate from planning and cover technical matters such as structure, fire safety, ventilation, drainage and energy performance. Hepburn prepares coordinated technical drawing packages, with specialist input where required.",
    links: [
      { label: "Read our Building Regulations guidance →", href: "/knowledge-centre/building-regulations" },
    ],
  },
  {
    id: "fees",
    label: "How much are architectural fees?",
    response:
      "Fees depend on the property, project complexity, approval route and stages required. The online calculator gives an initial indication; a binding fee is provided only after the brief and available information have been reviewed.",
    links: [
      { label: "Use our fee calculator →", href: "/estimate" },
    ],
  },
  {
    id: "contact",
    label: "How can I speak to the practice?",
    response:
      "You can contact the practice directly, book a free 30-minute consultation or send a project enquiry. A member of the practice will review the information you provide.",
    links: [
      { label: "Contact Hepburn Architects →", href: "/contact" },
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
