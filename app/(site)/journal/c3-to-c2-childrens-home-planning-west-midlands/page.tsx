import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { buildArticleSchema, buildBreadcrumbSchema, buildGraph } from "@/lib/structured-data";
import { site } from "@/lib/site";
import styles from "../house-extension-planning-permission-birmingham-2026-guide/page.module.css";

const title = "C3 to C2 Planning for Children’s Homes in Birmingham and the West Midlands";
const description =
  "A practical guide to C3 and C2 planning for children’s homes in Birmingham and the West Midlands, including material change of use, staffing, parking and planning evidence.";
const url = `${site.url}/journal/c3-to-c2-childrens-home-planning-west-midlands`;
const image = "/images/childrens-home-planning-hero.png";
const date = "2026-10-03";

export const metadata: Metadata = {
  title: { absolute: "C3 to C2 Children’s Home Planning | Birmingham" },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    publishedTime: date,
    modifiedTime: date,
    authors: [`${site.url}/about`],
    images: [{ url: `${site.url}${image}`, alt: "Architectural illustration of a welcoming residential children’s home" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${site.url}${image}`] },
};

export default function ChildrensHomePlanningWestMidlandsArticle() {
  const schema = buildGraph(
    buildArticleSchema({
      url,
      headline: title,
      description,
      image: `${site.url}${image}`,
      datePublished: date,
      dateModified: date,
      section: "Planning guidance",
      keywords: ["C2 planning", "children's home", "C3 to C2", "Birmingham", "West Midlands"],
      journal: true,
    }),
    buildBreadcrumbSchema(url, [
      { name: "Home", url: `${site.url}/` },
      { name: "Journal", url: `${site.url}/journal` },
      { name: "C3 to C2 children’s home planning", url },
    ]),
  );

  return (
    <>
      <StructuredData data={schema} />
      <article className={`section ${styles.article}`}>
        <div className="shell article-page">
          <nav aria-label="Breadcrumb" className="muted small-copy">
            <Link href="/">Home</Link> · <Link href="/journal">Journal</Link>
          </nav>
          <small className="eyebrow"><Newspaper size={14} /> Planning guidance · Birmingham &amp; West Midlands</small>
          <h1>{title}</h1>
          <p className="lead">
            Converting an ordinary dwelling into a residential children’s home can look straightforward on paper.
            In planning terms, it rarely is. The first question is not simply “is this C2?” but whether the proposed
            operation would amount to a material change from the property’s existing lawful use.
          </p>
          <p className={styles.byline}>Published 3 October 2026 · By <Link href="/about">David Hepburn</Link></p>

          <div className={styles.body}>
            <figure className={styles.hero}>
              <Image
                src={image}
                alt="Architectural illustration of a welcoming residential children’s home"
                width={1717}
                height={916}
                priority
                sizes="(max-width: 760px) 100vw, 820px"
              />
              <figcaption>
                Children’s-home planning is assessed on the actual proposed use: occupancy, care arrangements,
                staffing, movements, parking, amenity and the character of the property all matter.
              </figcaption>
            </figure>

            <section>
              <h2>What is the difference between C3 and C2?</h2>
              <p>
                Under the Town and Country Planning (Use Classes) Order, Class C2 includes residential accommodation
                and care for people in need of care, while Class C3 covers dwellinghouses and can, in some circumstances,
                include people living together as a single household where care is provided.
              </p>
              <p>
                That distinction matters because a children’s home is often associated with C2, but the use class cannot
                safely be determined from the number of children alone. The planning authority may need to consider the
                character of the household, how care is delivered, the level and pattern of staffing, vehicle movements,
                visitors, physical alterations and whether the overall use remains materially similar to a dwellinghouse.
              </p>
              <p>
                The statutory starting point is the <a href="https://www.legislation.gov.uk/uksi/1987/764/schedule/part/C" target="_blank" rel="noopener noreferrer">Use Classes Order</a>.
                In practice, whether a material change of use has occurred is a matter of fact and degree.
              </p>
            </section>

            <section>
              <h2>Does every children’s home need a C3 to C2 planning application?</h2>
              <p>
                No. It would be wrong to advise that every small children’s home automatically requires full planning
                permission for a change from C3 to C2. Equally, it would be risky to assume that a small home automatically
                remains C3.
              </p>
              <p>
                The correct route depends on the existing lawful use and the proposed operation. Depending on the facts,
                the appropriate strategy may be a full planning application, a Certificate of Lawfulness, or written
                confirmation that the proposed use does not require a material change of use.
              </p>
              <p>
                This is why the planning strategy should be established before committing to a property, signing a long
                lease or preparing an Ofsted application.
              </p>
            </section>

            <section>
              <h2>What will Birmingham planners want to understand?</h2>
              <p>
                Every case is site-specific, but the authority is likely to need a clear and consistent picture of how the
                property will operate. The planning drawings and supporting statement should normally explain:
              </p>
              <ul>
                <li>the number of children proposed to live at the property;</li>
                <li>the age range and broad care model, without disclosing unnecessary personal information;</li>
                <li>staff numbers during the day, overnight arrangements and shift-change times;</li>
                <li>manager attendance, visitors, professionals and deliveries;</li>
                <li>parking provision and likely vehicle movements;</li>
                <li>use of the garden and external areas;</li>
                <li>any staff office, sleep-in room or other internal changes;</li>
                <li>refuse, cycle storage, access and any physical alterations; and</li>
                <li>the likely effect on neighbouring amenity and the residential character of the street.</li>
              </ul>
              <p>
                The strongest applications are not vague. They define the operating model clearly enough for the planning
                officer to assess the proposal that will actually take place.
              </p>
            </section>

            <section>
              <h2>Recent Birmingham decisions show why the detail matters</h2>
              <p>
                Birmingham City Council has considered a number of C3-to-C2 children’s-home applications during 2026.
                For example, a proposal at Hill Crest Grove, Kingstanding for up to two children was approved subject to
                conditions in April 2026, and a maximum two-child proposal at Park Hill Road, Harborne was also approved
                in April 2026. Other proposals have been refused.
              </p>
              <p>
                The lesson is not that two children will always be acceptable. It is that these applications are assessed
                on their individual planning merits. Location, parking, the intensity of the proposed operation, internal
                and external changes, residential amenity and the quality of the supporting evidence can all influence the
                outcome.
              </p>
              <p>
                See Birmingham City Council’s published records for
                {" "}<a href="https://eplanning.birmingham.gov.uk/Northgate/PlanningExplorer/Generic/StdDetails.aspx?DAURI=PLANNING&FT=PlanningApplicationDetails&PARAM0=1389717&PT=PlanningApplicationsOn-Line&PUBLIC=Y&TYPE=PL%2FPlanningPK.xml" target="_blank" rel="noopener noreferrer">22 Hill Crest Grove</a>
                {" "}and{" "}
                <a href="https://eplanning.birmingham.gov.uk/Northgate/PlanningExplorer/Generic/StdDetails.aspx?DAURI=PLANNING&FT=Planning+Application+Details&PARAM0=1382258&PT=PlanningApplicationsOn-Line&PUBLIC=Y&TYPE=PL%2FPlanningPK.xml" target="_blank" rel="noopener noreferrer">24 Park Hill Road</a>.
              </p>
            </section>

            <section>
              <h2>Planning and Ofsted are separate — but they need to line up</h2>
              <p>
                Planning permission does not register a children’s home, and Ofsted registration does not resolve the
                planning use of a property. The two processes are separate.
              </p>
              <p>
                Ofsted’s current guidance asks applicants to provide evidence of the planning position and strongly
                recommends waiting until any required planning permission is granted before applying for registration.
                That makes early planning due diligence commercially important, not just a paperwork exercise.
              </p>
              <p>
                The current Ofsted requirements can be checked on the
                {" "}<a href="https://www.gov.uk/government/publications/register-a-childrens-home/apply-to-register-a-childrens-home" target="_blank" rel="noopener noreferrer">GOV.UK children’s-home registration guidance</a>.
              </p>
            </section>

            <section>
              <h2>Five mistakes that create avoidable planning risk</h2>
              <ol>
                <li><strong>Buying the property before checking the planning position.</strong> A suitable-looking house can still have parking, amenity, policy or lawful-use problems.</li>
                <li><strong>Assuming the number of children determines the use class.</strong> It does not. The whole operating model matters.</li>
                <li><strong>Using generic staffing information.</strong> The planning statement, drawings and operational information need to describe the same proposal.</li>
                <li><strong>Ignoring vehicle movements and shift changes.</strong> These are common points of scrutiny and should be addressed honestly.</li>
                <li><strong>Treating planning and Ofsted as interchangeable.</strong> They are different regulatory processes and both need a clear property strategy.</li>
              </ol>
            </section>

            <section>
              <h2>How Hepburn Architects approaches a C2 proposal</h2>
              <p>
                We start with feasibility. That means reviewing the property, its lawful use and planning history, the
                proposed number of children, staffing model, parking, surrounding context and any alterations required.
                We then advise on the most defensible planning route.
              </p>
              <p>
                Where an application is required, we can prepare measured drawings, proposed plans, planning drawings,
                supporting planning information and a Design and Access Statement where appropriate, and coordinate the
                submission through determination.
              </p>
              <p>
                The objective is not to force every project into C2. It is to establish the correct planning position and
                present the real proposal accurately.
              </p>

              <div className={styles.feeCta}>
                <div>
                  <small>Children’s-home planning</small>
                  <h3>Assess the property before you commit.</h3>
                  <p>We can review a potential children’s home in Birmingham or across the West Midlands and advise on the likely planning route.</p>
                </div>
                <Link href="/services/c2-planning-applications-childrens-homes" className="btn">View our C2 planning service</Link>
              </div>
            </section>

            <section>
              <h2>A final note</h2>
              <p>
                Planning use-class questions are fact-sensitive. This article is general guidance rather than a
                property-specific planning or legal opinion. If you are considering a particular address, the proposed
                care model and operational details should be reviewed against the planning history and local context before
                a conclusion is reached.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
