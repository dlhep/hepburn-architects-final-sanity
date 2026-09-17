import type { Article } from "./articles";

// Reviewed against GPDO Schedule 2 Part 14 and S.I. 2026/896 on 17 September 2026.
// Apply to the reviewed CMS revision only, so a later editorial update takes over.
const reviewedCmsRevision = "2026-08-12T18:35:39Z";
const reviewDate = "2026-09-17T00:00:00Z";

function block(key: string, text: string, style = "normal", href?: string) {
  return {
    _type: "block", _key: key, style,
    markDefs: href ? [{ _key: `${key}-link`, _type: "link", href }] : [],
    children: [{ _type: "span", _key: `${key}-text`, text, marks: href ? [`${key}-link`] : [] }],
  };
}

const body = [
  block("review", "Planning guidance for England. Reviewed against the legislation on 17 September 2026."),
  block("intro", "Changes to domestic solar permitted development rights took effect on 27 August 2026. For homeowners in Birmingham, Solihull and the West Midlands, the first step is to identify the property type and proposed installation: the rules for a dwellinghouse differ from those for a block of flats."),
  block("changes", "What changed on 27 August 2026?", "h2"),
  block("instrument", "S.I. 2026/896 amended Classes A and B of Part 14 of the General Permitted Development Order. Class A covers equipment on domestic buildings; Class B covers stand-alone equipment within their curtilage. The amendments include separate limitations for dwellinghouses and blocks of flats, revised wall and enclosure provisions, and restrictions on timber-mounted plug-in solar."),
  block("amendment-source", "Read the 2026 amending Order", "normal", "https://www.legislation.gov.uk/uksi/2026/896/contents/made"),
  block("walls", "Wall-mounted panels, balconies and roof enclosures", "h2"),
  block("wall-limits", "For a dwellinghouse, Class A limits projection from a wall to 0.2 metres where the wall abuts a highway and 0.4 metres otherwise. Corresponding limits apply to balcony and roof enclosures. These are measured perpendicular to the relevant surface. Other limitations and conditions must also be met; a projection limit alone does not establish permission."),
  block("flats", "For a block of flats, the wall projection limit remains 0.2 metres. Do not apply the dwellinghouse allowances to a flat without establishing which provisions cover the building and proposal."),
  block("roofs", "Roof-mounted solar", "h2"),
  block("roof-limits", "On pitched roofs, Class A limits projection to 0.2 metres beyond the roof slope and prevents equipment extending above the highest part of the roof, excluding chimneys. On flat roofs, the equipment must not extend more than 0.6 metres above the highest part of the roof, excluding chimneys. On article 2(3) land, the flat-roof route also requires an application to determine whether prior approval is needed for appearance."),
  block("garden", "Stand-alone solar in a house garden", "h2"),
  block("garden-rules", "Class B sets different height limits according to position. For a dwellinghouse, equipment within 5 metres of the boundary and forward of the principal elevation is limited to 1 metre. Other equipment within 5 metres of the boundary is limited to 2 metres. A 2-metre limit also applies to certain highway-side positions in conservation areas; the general limit otherwise is 4 metres. Where more than one limit applies, use the lowest."),
  block("garden-conditions", "The panel surface area must not exceed 9 square metres. World Heritage Sites, listed-building curtilages and scheduled monuments have further restrictions, and some designated-land installations require the prior approval procedure. Blocks of flats have separate rules, including a 5-metre boundary separation requirement."),
  block("heritage", "Conservation areas and listed buildings", "h2"),
  block("heritage-rules", "Class A excludes specified highway-fronting wall or enclosure installations in conservation areas and World Heritage Sites. It also excludes installations on listed dwellinghouses or listed blocks of flats and their curtilage buildings, and on scheduled monument sites. Listed-building consent is a separate consideration. Establish the designations and applicable approval route before ordering equipment."),
  block("conditions", "Under both Classes A and B, siting must minimise the specified appearance or amenity effects so far as practicable, and equipment must be removed as soon as reasonably practicable when no longer needed."),
  block("plug-in", "Plug-in solar: planning and electrical safety", "h2"),
  block("plug-in-rules", "The amended planning rules restrict plug-in solar on specified wooden walls, balconies, enclosures and timber-clad building parts; Class B also restricts it on wooden fences, gates, walls and other enclosures. Planning permission does not certify a product or electrical connection. Check equipment suitability, structural support, electrical requirements and any Building Regulations implications with the appropriate specialists."),
  block("current", "Do I still need to wait for the changes?", "h2"),
  block("current-answer", "The amendments are now in force. Assess a new proposal against the current legislation rather than relying on an announcement made before commencement. Article 6 allows development that was permitted immediately before 27 August 2026, but ceased to be permitted because of these amendments, to be carried out until the end of 26 August 2027. Check the transitional provision against the actual proposal."),
  block("design", "Planning solar alongside an extension", "h2"),
  block("design-advice", "Our design recommendation is to consider panel layout alongside rooflights, roof form, shading, cable routes and the wider appearance of the home. For a Birmingham or Solihull renovation, bring the address, photographs and proposed equipment layout to the initial discussion so we can identify the planning questions that need resolving."),
  block("service", "Discuss house extension design and planning with Hepburn Architects", "normal", "/services/house-extensions"),
  block("sources", "Primary sources and scope", "h2"),
  block("gpdo-source", "Current GPDO Schedule 2, Part 14: renewable energy permitted development", "normal", "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/14"),
  block("order-source", "S.I. 2026/896: commencement, amendments and transitional provisions", "normal", "https://www.legislation.gov.uk/uksi/2026/896/contents/made"),
  block("scope", "This is a summary of selected planning provisions for England, not a complete eligibility assessment or electrical installation guide. The full limitations, conditions, planning history and any restrictions affecting the property must be checked for the actual proposal."),
];

export function applySolarArticleReview(article: Article): Article {
  if (article.slug !== "solar-panel-planning-rules-august-2026" || article._updatedAt !== reviewedCmsRevision) return article;
  return {
    ...article,
    title: "Solar Panel Planning Rules After August 2026",
    seoTitle: "Solar Panel Planning Rules 2026: What Changed?",
    excerpt: "Solar planning rules changed in England on 27 August 2026. Understand the requirements for houses, flats, roofs, walls and garden installations.",
    seoDescription: "Solar planning rules after 27 August 2026: requirements for houses, flats, roofs and garden panels, with advice for Birmingham and Solihull homeowners.",
    _updatedAt: reviewDate,
    body,
  };
}
