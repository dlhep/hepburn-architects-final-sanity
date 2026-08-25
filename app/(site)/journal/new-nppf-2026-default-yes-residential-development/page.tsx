import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";
import { site } from "@/lib/site";
import styles from "../house-extension-planning-permission-birmingham-2026-guide/page.module.css";

const title =
  "New NPPF 2026: What the “Default Yes” Planning Rules Mean for Small Residential Sites";

const description =
  "England’s new NPPF came into effect on 17 August 2026. Find out what the new “default yes” approach, station-led development and stronger support for sustainable housing could mean for small residential sites.";

const path =
  "/journal/new-nppf-2026-default-yes-residential-development";

const url = `${site.url}${path}`;
const image = `${site.url}/images/selected-work-2.webp`;
const publicationDate = "2026-08-25";

const faqs = [
  {
    question: "Does the 2026 NPPF mean planning permission is now automatically granted?",
    answer:
      "No. The revised NPPF creates stronger policy support for appropriate development in sustainable locations, but applications still need to address local planning policy, design, access, amenity, heritage, ecology, flood risk and other material considerations.",
  },
  {
    question: "What does the NPPF “default yes” approach mean?",
    answer:
      "The phrase describes a more positive national policy approach to suitable development, particularly within settlements and around qualifying well-connected stations. It does not create automatic planning permission.",
  },
  {
    question: "Could the new NPPF help an infill or garden development site?",
    answer:
      "Potentially. Appropriate infill and intensification within settlements may benefit from the stronger national policy position, but the individual site's access, character, neighbouring relationships, trees, ecology and other constraints remain important.",
  },
  {
    question: "What density is expected close to qualifying stations?",
    answer:
      "The final August 2026 Framework sets minimum expectations of 35 dwellings per hectare in qualifying station locations, increasing to 45 dwellings per hectare where the higher service-frequency threshold applies.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute:
      "New NPPF 2026: Default Yes Planning Rules for Small Sites",
  },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    publishedTime: publicationDate,
    modifiedTime: publicationDate,
    authors: [`${site.url}/about`],
    images: [
      {
        url: image,
        width: 1448,
        height: 1086,
        alt: "Residential development illustrating a small housing site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function NewNppf2026Article() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: title,
        description,
        author: { "@id": `${site.url}/#david-hepburn` },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: url,
        datePublished: publicationDate,
        dateModified: publicationDate,
        image,
        articleSection: "Planning guidance",
        inLanguage: "en-GB",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${site.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: `${site.url}/journal`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <StructuredData data={buildGraph(schema)} />

      <article className={`section ${styles.article}`}>
        <div className="shell article-page">
          <nav aria-label="Breadcrumb" className="muted small-copy">
            <Link href="/">Home</Link> ·{" "}
            <Link href="/journal">Journal</Link>
          </nav>

          <small className="eyebrow">
            <Newspaper size={14} /> Planning update
          </small>

          <h1>{title}</h1>

          <p className="lead">
            England has a new National Planning Policy Framework. Published
            on 17 August 2026, the revised NPPF gives stronger national
            policy support to appropriate development in sustainable
            locations and introduces important new policies around
            well-connected stations.
          </p>

          <p className={styles.byline}>
            Published 25 August 2026 · 7 minutes read · By{" "}
            <Link href="/about">David Hepburn</Link>
          </p>

          <figure className={styles.hero}>
            <Image
              src="/images/selected-work-2.webp"
              alt="Residential development illustrating a small housing site"
              width={1448}
              height={1086}
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
            <figcaption>
              The revised NPPF strengthens national support for appropriate
              housing development in sustainable locations.
            </figcaption>
          </figure>

          <div className={styles.body}>
            <p>
              For homeowners, landowners and small developers, the changes
              could be particularly relevant to infill plots, large gardens,
              corner sites, garage land, under-used commercial sites and
              other small residential opportunities.
            </p>

            <aside className={styles.question}>
              <strong>Could a previously marginal site now be worth another look?</strong>
              <span>
                Potentially. The new national policy position may strengthen
                the planning case for appropriate development within
                settlements and in accessible locations.
              </span>
            </aside>

            <section>
              <h2>What changed on 17 August 2026?</h2>

              <p>
                The government published a substantially restructured
                National Planning Policy Framework on 17 August 2026.
              </p>

              <p>
                One of the important changes is a clearer national
                decision-making framework, intended to create a more
                consistent and rules-based approach to planning decisions.
              </p>

              <p>
                The new Framework also places increased emphasis on
                delivering housing in sustainable locations and making
                effective use of land within existing settlements.
              </p>
            </section>

            <section>
              <h2>What does “default yes” actually mean?</h2>

              <p>
                The phrase <strong>“default yes”</strong> has been used by
                government when describing the more supportive approach to
                development, particularly around well-connected stations.
              </p>

              <p>
                It does not mean that planning permission has become
                automatic.
              </p>

              <aside className={styles.warning}>
                <strong>Important distinction</strong>
                <span>
                  The new NPPF strengthens the planning-policy case for
                  suitable development. It does not remove the requirement
                  to assess the individual site and proposal.
                </span>
              </aside>

              <p>
                Local-plan policy, design, neighbouring amenity, highway
                safety, heritage, trees, ecology, drainage, flood risk and
                other planning considerations can still determine whether a
                proposal is acceptable.
              </p>
            </section>

            <section>
              <h2>Why could this matter for small residential sites?</h2>

              <p>
                Small sites often make an important contribution to housing
                supply but can be difficult to progress through the planning
                system.
              </p>

              <p>
                The revised national policy may give additional weight to
                proposals that make efficient use of land in sustainable
                locations.
              </p>

              <p>That could be particularly relevant to:</p>

              <ul>
                <li>infill plots between existing houses;</li>
                <li>large gardens with genuine development potential;</li>
                <li>corner plots;</li>
                <li>redundant garages and garage courts;</li>
                <li>under-used parking or commercial sites;</li>
                <li>low-density land within established residential areas;</li>
                <li>small redevelopment opportunities; and</li>
                <li>sites close to good public transport.</li>
              </ul>

              <p>
                A site which looked marginal under the previous policy
                framework may therefore deserve to be reassessed.
              </p>
            </section>

            <section>
              <h2>What changes near well-connected stations?</h2>

              <p>
                One of the headline parts of the revised NPPF is stronger
                support for development within reasonable walking distance
                of qualifying well-connected railway, underground, tram and
                light-rail stations.
              </p>

              <p>
                The final policy generally uses around{" "}
                <strong>800 metres walking distance</strong>, although the
                quality and directness of the actual walking route matter.
              </p>

              <p>
                This is important because a simple 800-metre radius drawn on
                a map may not accurately represent walking distance where
                railway lines, waterways, major roads or an indirect street
                network create barriers.
              </p>
            </section>

            <section>
              <h2>What density is expected near stations?</h2>

              <p>
                The final August 2026 NPPF uses minimum density expectations
                of <strong>35 dwellings per hectare</strong> in qualifying
                station locations.
              </p>

              <p>
                This rises to at least{" "}
                <strong>45 dwellings per hectare</strong> where the station
                meets the higher service-frequency threshold.
              </p>

              <div className={styles.comparison}>
                <article>
                  <h3>35 homes/ha</h3>
                  <p>
                    Baseline national expectation in qualifying station
                    locations.
                  </p>
                </article>

                <article>
                  <h3>45 homes/ha</h3>
                  <p>
                    Higher expectation where the enhanced service-frequency
                    test is met.
                  </p>
                </article>

                <article>
                  <h3>Not a ceiling</h3>
                  <p>
                    Appropriate site capacity still depends on the specific
                    context and constraints.
                  </p>
                </article>
              </div>

              <p>
                These figures should not simply be multiplied by the red-line
                site area to determine how many houses will fit.
              </p>

              <p>
                Access, roads, parking, refuse storage, amenity space,
                daylight, overlooking, trees and the relationship with
                neighbouring buildings all affect realistic development
                capacity.
              </p>
            </section>

            <section>
              <h2>Does this help infill and garden development?</h2>

              <p>
                Potentially, yes.
              </p>

              <p>
                The policy direction supports appropriate intensification
                and better use of land in sustainable locations.
              </p>

              <p>
                However, a large garden is not automatically a development
                site simply because national policy has become more
                supportive of housing.
              </p>

              <p>
                A successful infill proposal still needs to demonstrate an
                appropriate relationship with the existing settlement
                pattern, satisfactory access, suitable amenity and an
                acceptable effect on neighbouring homes.
              </p>
            </section>

            <section>
              <h2>What is “medium development”?</h2>

              <p>
                The 2026 Framework also introduces the new concept of{" "}
                <strong>medium development</strong>.
              </p>

              <p>
                For housing, this generally means schemes providing{" "}
                <strong>10 to 49 homes</strong> on sites no larger than{" "}
                <strong>2.5 hectares</strong>.
              </p>

              <p>
                This is particularly relevant to SME housebuilders and
                smaller developers operating between individual infill
                projects and strategic housing sites.
              </p>
            </section>

            <section>
              <h2>What can still prevent planning permission?</h2>

              <p>
                The revised NPPF does not remove normal planning constraints.
                These can still include:
              </p>

              <ul>
                <li>local planning policies;</li>
                <li>conservation areas and listed buildings;</li>
                <li>Green Belt;</li>
                <li>highway safety and access;</li>
                <li>flood risk and drainage;</li>
                <li>ecology and biodiversity;</li>
                <li>protected and important trees;</li>
                <li>overlooking and privacy;</li>
                <li>daylight and outlook;</li>
                <li>parking and servicing; and</li>
                <li>design quality and local character.</li>
              </ul>

              <p>
                The new NPPF can improve the principle of development without
                making an otherwise unacceptable design acceptable.
              </p>
            </section>

            <section>
              <h2>What should landowners do before applying?</h2>

              <p>
                The first step should normally be a planning and development
                feasibility assessment rather than immediately commissioning
                a complete planning application.
              </p>

              <p>
                This should establish:
              </p>

              <ul>
                <li>the planning history of the site;</li>
                <li>the relevant local and national planning policies;</li>
                <li>access and highway constraints;</li>
                <li>heritage, ecology, tree and flood-risk constraints;</li>
                <li>likely residential capacity;</li>
                <li>the relationship with neighbouring properties; and</li>
                <li>whether the new NPPF materially improves the planning case.</li>
              </ul>

              <p>
                Our{" "}
                <Link href="/knowledge-centre/planning-permission">
                  planning permission guide
                </Link>{" "}
                explains the wider application process.
              </p>
            </section>

            <section>
              <h2>Could the new NPPF unlock your site?</h2>

              <p>
                If you own an infill plot, large garden, corner site, garage
                site or another piece of under-used land, it may now be worth
                reviewing its development potential.
              </p>

              <p>
                The revised NPPF does not guarantee planning permission, but
                in the right location it could provide a stronger
                national-policy basis for residential development.
              </p>

              <div className={styles.feeCta}>
                <div>
                  <small>Residential development feasibility</small>
                  <h3>Have a site that might have development potential?</h3>
                  <p>
                    We can assess the planning position, constraints and
                    likely residential capacity before you commit to a full
                    planning application.
                  </p>
                </div>

                <Link className="btn" href="/contact">
                  Discuss your site
                </Link>
              </div>
            </section>

            <section className={styles.resources}>
              <h2>Official guidance</h2>
              <ul>
                <li>
                  <a
                    href="https://www.gov.uk/guidance/national-planning-policy-framework"
                    target="_blank"
                    rel="noreferrer"
                  >
                    National Planning Policy Framework — GOV.UK
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.faq}>
              <h2>Frequently asked questions</h2>

              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
