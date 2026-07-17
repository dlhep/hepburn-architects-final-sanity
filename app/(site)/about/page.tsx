import type { Metadata } from "next";
import { CheckCircle2, Compass, Handshake, Leaf, Ruler, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Hepburn Architects",
  description:
    "Discover the ethos, values and residential design approach of Hepburn Architects, an ARB-registered and RIBA Chartered Practice.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Handshake,
    title: "Listen first",
    text: "Every project begins with the client, the property and the reasons behind the brief. Good design should feel personal rather than imposed."
  },
  {
    icon: Compass,
    title: "Resolve the route early",
    text: "Planning strategy, constraints and technical risks are considered before unnecessary drawing work begins."
  },
  {
    icon: Ruler,
    title: "Design with purpose",
    text: "Space, light, circulation, privacy and buildability matter more than fashionable gestures that do not improve daily life."
  },
  {
    icon: Leaf,
    title: "Think long term",
    text: "We aim for adaptable, durable and energy-conscious homes that remain useful as families, lifestyles and regulations change."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="section studio-hero">
        <div className="shell about-grid">
          <div>
            <small className="eyebrow">The studio</small>
            <h1>Residential architecture with clarity, character and commercial awareness.</h1>
            <p className="lead">
              Hepburn Architects is an ARB-registered and RIBA Chartered Practice
              working with homeowners, developers and investors across Birmingham,
              the West Midlands, Teesside and the wider UK.
            </p>
            <p>
              Our role is not simply to produce drawings. We help clients understand
              what a property can support, which approval route is realistic, where
              the main risks sit and how design decisions affect value, cost and
              long-term use.
            </p>
            <ul className="tick-list">
              <li><CheckCircle2 /> Residential planning and design expertise</li>
              <li><CheckCircle2 /> Clear staged appointments and defined outputs</li>
              <li><CheckCircle2 /> Practical coordination with specialist consultants</li>
              <li><CheckCircle2 /> Birmingham and Teesside regional knowledge</li>
            </ul>
          </div>
          <div className="founder-photo-wrap">
            <img
              src="https://www.hepburnarchitects.com/wp-content/uploads/2026/06/David-Hepburn.png"
              alt="David Hepburn, founding director of Hepburn Architects"
            />
            <div className="founder-caption">
              <small>Founding Director</small>
              <strong>David Hepburn</strong>
              <span>ARB · RIBA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell studio-statement">
          <small className="eyebrow">Our ethos</small>
          <h2>Design ambition should be matched by planning realism and technical care.</h2>
          <p>
            We believe the best residential architecture feels inevitable: the plan
            works, the building belongs on its site, the approvals route is understood
            and every major design move has a reason.
          </p>
        </div>
        <div className="shell values-grid">
          {values.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell studio-process">
          <div>
            <small className="eyebrow">How we work</small>
            <h2>A collaborative process without unnecessary complexity.</h2>
          </div>
          <div>
            <p>
              We explain decisions in plain English, set out what is included at each
              stage and challenge ideas that are unlikely to obtain approval or deliver
              good value.
            </p>
            <p>
              The practice supports projects from measured survey and feasibility
              through planning and Building Regulations. Specialist input is brought
              in where genuinely required rather than added by default.
            </p>
            <a
              className="btn primary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a free consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
