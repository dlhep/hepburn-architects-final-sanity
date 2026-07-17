import { ExternalLink, Star } from "lucide-react";
import { site } from "@/lib/site";

export function GoogleReviewPanel() {
  return (
    <section className="section google-review-section">
      <div className="shell google-review-panel">
        <div className="google-stars" aria-label="Google reviews">
          {[1,2,3,4,5].map((item) => <Star key={item} fill="currentColor" />)}
        </div>
        <div>
          <small className="eyebrow">Independent client feedback</small>
          <h2>See what clients say on Google.</h2>
          <p>
            Read current reviews and view the verified Hepburn Architects business profile.
          </p>
        </div>
        <a className="btn primary" href={site.googleBusiness} target="_blank" rel="noopener noreferrer">
          View Google reviews <ExternalLink size={17} />
        </a>
      </div>
    </section>
  );
}
