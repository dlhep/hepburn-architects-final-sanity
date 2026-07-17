import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Residential Before and After Design Concepts",
  description:
    "Explore illustrative residential transformation concepts for house extensions, bungalow remodelling and side additions.",
  alternates: { canonical: "/before-after" },
};

const examples = [
  {
    title: "Contemporary Rear Extension",
    location: "Illustrative design concept",
    before: "/images/before-after/rear-extension-before.svg",
    after: "/images/before-after/rear-extension-after.svg",
    beforeAlt: "Existing traditional house before a contemporary rear extension concept",
    afterAlt: "Proposed modern glazed rear extension architectural concept",
  },
  {
    title: "Bungalow Remodelling",
    location: "Illustrative design concept",
    before: "/images/before-after/bungalow-remodel-before.svg",
    after: "/images/before-after/bungalow-remodel-after.svg",
    beforeAlt: "Existing bungalow before architectural remodelling concept",
    afterAlt: "Proposed contemporary bungalow remodelling architectural concept",
  },
  {
    title: "Side and Rear Addition",
    location: "Illustrative design concept",
    before: "/images/before-after/side-extension-before.svg",
    after: "/images/before-after/side-extension-after.svg",
    beforeAlt: "Existing house before side and rear extension concept",
    afterAlt: "Proposed modern side and rear extension architectural concept",
  },
];

export default function BeforeAfterPage() {
  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow">Transformation concepts</small>
        <h1>See how architecture can change the way a home works.</h1>
        <p>
          These professionally prepared illustrative concepts demonstrate common
          residential transformations. They are design examples rather than claims
          that each pair shows the same completed property.
        </p>
      </div>

      <div className="shell before-after-grid">
        {examples.map((example) => (
          <BeforeAfterSlider key={example.title} {...example} />
        ))}
      </div>

      <div className="shell content-cta">
        <h2>Would you like to explore your property’s potential?</h2>
        <p>
          Use the fee calculator or speak directly with Hepburn Architects about a
          tailored feasibility and design appointment.
        </p>
        <Link className="btn primary" href="/estimate">
          Get an indicative fee <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
