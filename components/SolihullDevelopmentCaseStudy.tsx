import Image from "next/image";
import Link from "next/link";

export function SolihullDevelopmentCaseStudy() {
  return (
    <section className="section sand-section" aria-labelledby="solihull-development-case-study">
      <div className="shell service-detail-columns">
        <div>
          <small className="eyebrow">Solihull · Planning permission secured</small>
          <h2 id="solihull-development-case-study">From garage site to accessible home.</h2>
          <p>Hepburn Architects worked alongside planning consultant Joanne McCallion to help secure permission for a wheelchair-accessible bungalow on an existing garage site in Solihull.</p>
          <p>The proposal creates an opportunity for accessible, single-storey living within an established residential setting. It is a practical example of finding potential in land alongside an existing property.</p>
          <p>The bungalow is the second phase of the client’s wider project, following a six-bedroom HMO in the main house. A possible apartment development with a neighbouring owner remains a future proposal, subject to feasibility and planning approval.</p>
          <Link className="text-link" href="/journal/solihull-wheelchair-accessible-bungalow-planning-permission">
            Read the Solihull garage-site planning story →
          </Link>
        </div>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <Image
            src="/images/solihull-bungalow-comparison-enhanced.webp"
            alt="Existing garage site above and proposed wheelchair-accessible bungalow CGI below, Solihull"
            width={1173}
            height={1341}
            sizes="(max-width: 950px) 100vw, 50vw"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
          <figcaption className="small-copy" style={{ marginTop: "0.75rem" }}>
            Existing site and proposed CGI. Planning permission secured; the image does not show a completed bungalow.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
