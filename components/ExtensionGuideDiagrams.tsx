import Image from "next/image";

const diagrams = [
  {
    src: "/guides/house-extension/extension-types.svg",
    alt: "Architectural diagram comparing rear, side, wrap-around, two-storey and front house extensions",
    title: "Common house extension types",
    caption:
      "The appropriate form depends on the existing property, planning context, budget and the way the completed home needs to work.",
  },
  {
    src: "/guides/house-extension/planning-routes.svg",
    alt: "Diagram comparing permitted development, larger home extension prior approval and householder planning permission",
    title: "Typical rear-extension planning routes",
    caption:
      "Permitted development is a technical, rules-based route. Eligibility must be checked against the individual property and full proposal.",
  },
  {
    src: "/guides/house-extension/daylight-deep-plan.svg",
    alt: "Section diagrams showing ways to bring daylight into a deep house extension",
    title: "Bringing daylight into a deep plan",
    caption:
      "Rooflights, courtyards and a carefully designed old-to-new connection can prevent the centre of the original house becoming dark.",
  },
  {
    src: "/guides/house-extension/planning-vs-building-regulations.svg",
    alt: "Comparison of planning permission and Building Regulations considerations",
    title: "Planning versus Building Regulations",
    caption:
      "Planning assesses whether development is acceptable; Building Regulations address how the work is designed and constructed safely.",
  },
  {
    src: "/guides/house-extension/extension-journey.svg",
    alt: "Eight-stage house extension process from consultation to completion",
    title: "A typical extension journey",
    caption:
      "Each stage should resolve the decisions needed by the next, reducing uncertainty before construction begins.",
  },
  {
    src: "/guides/house-extension/budget-allocation.svg",
    alt: "Circular house extension budget diagram showing construction, fees, fittings, VAT and contingency",
    title: "What the project budget should include",
    caption:
      "A realistic budget includes far more than the builder’s core construction quotation.",
  },
];

export function ExtensionGuideDiagrams() {
  return (
    <section
      aria-labelledby="extension-guide-diagrams-heading"
      style={{ margin: "3rem 0" }}
    >
      <small className="eyebrow">Illustrated guide</small>
      <h2 id="extension-guide-diagrams-heading">
        House extension planning at a glance
      </h2>
      <p>
        These diagrams summarise the main design, approval, daylight, technical,
        programme and budget decisions explained throughout this guide.
      </p>

      <div style={{ display: "grid", gap: "2rem", marginTop: "2rem" }}>
        {diagrams.map((diagram) => (
          <figure key={diagram.src} style={{ margin: 0 }}>
            <Image
              src={diagram.src}
              alt={diagram.alt}
              width={1400}
              height={840}
              sizes="(max-width: 900px) 100vw, 900px"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "18px",
                border: "1px solid rgba(29, 29, 27, 0.12)",
              }}
            />
            <figcaption style={{ marginTop: ".85rem", opacity: 0.78 }}>
              <strong style={{ display: "block", opacity: 1 }}>
                {diagram.title}
              </strong>
              {diagram.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
