import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { site } from "@/lib/site";

const practiceLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Studio" },
  { href: "/knowledge-centre", label: "Knowledge Centre" },
  { href: "/planning-tools", label: "Planning Tools" },
  { href: "/blog", label: "Journal" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/house-extensions", label: "House Extensions" },
  { href: "/services/planning-applications", label: "Planning Applications" },
  { href: "/services/building-regulations", label: "Building Regulations" },
  { href: "/services/new-build-homes", label: "New-Build Homes" },
  { href: "/services/loft-conversions", label: "Loft Conversions" },
  { href: "/services/hmo-conversions", label: "HMO Conversions" },
];

const locationLinks = [
  { href: "/locations/birmingham-architects", label: "Birmingham" },
  { href: "/locations/solihull-architects", label: "Solihull" },
  { href: "/locations/sutton-coldfield-architects", label: "Sutton Coldfield" },
  { href: "/locations/harborne-architects", label: "Harborne" },
  { href: "/locations/edgbaston-architects", label: "Edgbaston" },
  { href: "/locations/moseley-architects", label: "Moseley" },
];

function FooterLinkGroup({ heading, links }: { heading: string; links: typeof practiceLinks }) {
  return (
    <nav className="footer-link-group" aria-label={`${heading} links`}>
      <h2>{heading}</h2>
      {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      {heading === "Locations" && <Link className="footer-all-link" href="/locations">View all locations <ArrowRight size={14} /></Link>}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-practice-column">
          <Link className="footer-brand-logo-link" href="/" aria-label="Hepburn Architects home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="footer-brand-logo" src="/hepburn-logo-reversed.svg" alt="Hepburn Architects" width={581} height={155} />
          </Link>
          <p className="footer-description">Residential architecture, planning and technical design across Birmingham, Solihull and the wider West Midlands.</p>
          <div className="footer-contact-links">
            <a href={site.phoneHref}><Phone size={15} aria-hidden="true" /> <strong>{site.phone}</strong></a>
            <a href={`mailto:${site.email}`}><Mail size={15} aria-hidden="true" /> {site.email}</a>
          </div>
          <div className="footer-studio">
            <h2>Birmingham Studio</h2>
            <address>Izabella House<br />24–26 Regent Place<br />Birmingham B1 3NJ</address>
          </div>
          <div className="footer-accreditations" aria-label="Professional accreditations">
            <a href="https://www.architecture.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the official RIBA website (opens in a new tab)">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="footer-riba-logo" src="/images/accreditations/riba-chartered-practice.png" alt="RIBA Chartered Practice" width={868} height={385} />
            </a>
            <a href="https://arb.org.uk/architects-register/" target="_blank" rel="noopener noreferrer" aria-label="Search the official ARB Architects Register (opens in a new tab)">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="footer-arb-logo" src="/images/accreditations/arb.png" alt="Architects Registration Board" width={365} height={385} />
            </a>
          </div>
        </div>

        <FooterLinkGroup heading="Practice" links={practiceLinks} />
        <FooterLinkGroup heading="Services" links={serviceLinks} />
        <FooterLinkGroup heading="Locations" links={locationLinks} />
      </div>

      <div className="footer-region-switch">
        <div className="shell">
          <span>North East project?</span>
          <a href="https://www.hepburnarchitects.com/" target="_blank" rel="noopener noreferrer">Visit Hepburn Architects North East <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="shell footer-legal">
        <span>© {new Date().getFullYear()} Hepburn Architects Ltd.</span>
        <nav aria-label="Legal links">
          <Link href="/privacy">Privacy</Link>
          <CookiePreferencesButton label="Cookies" />
        </nav>
      </div>

      <style>{`
        .site-footer {
          background: #2d3235;
          color: #fffdf8;
          padding: 0;
        }

        .footer-main {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(150px, 1fr));
          gap: clamp(34px, 4vw, 64px);
          padding-top: clamp(52px, 6vw, 76px);
          padding-bottom: clamp(46px, 5vw, 68px);
        }

        .footer-practice-column,
        .footer-link-group {
          display: grid;
          align-content: start;
        }

        .footer-practice-column { gap: 14px; }

        .footer-brand-logo-link {
          display: inline-flex;
          width: min(100%, 224px);
          margin-bottom: 4px;
          line-height: 0;
        }

        .footer-brand-logo { width: 100%; height: auto; }

        .footer-description {
          max-width: 43ch;
          margin: 0;
          color: rgba(255, 253, 248, .76);
          font-size: 15px;
          line-height: 1.6;
        }

        .footer-contact-links { display: grid; gap: 6px; }
        .footer-contact-links a { display: flex; align-items: center; gap: 8px; width: fit-content; }
        .footer-contact-links svg { color: #f08a58; flex: none; }

        .footer-studio { margin-top: 4px; }
        .footer-studio h2,
        .footer-link-group h2 {
          margin: 0 0 12px;
          color: #f08a58;
          font-size: 11px;
          line-height: 1.3;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .footer-studio address {
          color: rgba(255, 253, 248, .76);
          font-size: 14px;
          line-height: 1.55;
        }

        .footer-accreditations {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 8px;
        }

        .footer-accreditations a { display: flex; align-items: center; line-height: 0; }
        .footer-accreditations img { display: block; width: auto; object-fit: contain; }
        .footer-riba-logo { height: 58px; }
        .footer-arb-logo { height: 58px; }

        .footer-link-group { gap: 9px; }
        .footer-link-group a { width: fit-content; color: rgba(255, 253, 248, .82); font-size: 14px; line-height: 1.45; }
        .footer-link-group a:hover,
        .footer-contact-links a:hover { color: #fff; }
        .footer-link-group .footer-all-link { display: flex; align-items: center; gap: 6px; margin-top: 4px; color: #f5a178; font-weight: 700; }

        .footer-region-switch {
          border-block: 1px solid rgba(255, 255, 255, .16);
          background: rgba(0, 0, 0, .1);
        }

        .footer-region-switch .shell {
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .footer-region-switch span { color: rgba(255, 253, 248, .7); font-size: 14px; }
        .footer-region-switch a { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; }

        .footer-legal {
          min-height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          color: rgba(255, 253, 248, .58);
          font-size: 12px;
        }

        .footer-legal nav { display: flex; align-items: center; gap: 22px; }
        .footer-legal a,
        .footer-cookie-preferences { color: rgba(255, 253, 248, .7); }
        .footer-cookie-preferences { border: 0; padding: 0; background: transparent; font-size: 12px; cursor: pointer; }
        .footer-legal a:hover,
        .footer-cookie-preferences:hover,
        .footer-region-switch a:hover { color: #fff; }

        .site-footer a:focus-visible,
        .site-footer button:focus-visible { outline-color: #f5a178; }

        @media (max-width: 950px) {
          .footer-main { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .footer-practice-column {
            grid-column: 1 / -1;
            grid-template-columns: minmax(0, 1.5fr) minmax(180px, .8fr);
            column-gap: 48px;
          }
          .footer-brand-logo-link,
          .footer-description,
          .footer-contact-links { grid-column: 1; }
          .footer-studio,
          .footer-accreditations { grid-column: 2; }
          .footer-studio { grid-row: 1 / span 3; margin-top: 0; padding-top: 2px; }
          .footer-accreditations { grid-row: 4; }
        }

        @media (max-width: 650px) {
          .footer-main { grid-template-columns: 1fr; gap: 34px; }
          .footer-practice-column { grid-column: auto; grid-template-columns: 1fr; gap: 12px; }
          .footer-brand-logo-link,
          .footer-description,
          .footer-contact-links,
          .footer-studio,
          .footer-accreditations { grid-column: auto; grid-row: auto; }
          .footer-studio { margin-top: 8px; }
          .footer-accreditations { margin-top: 10px; }
          .footer-riba-logo,
          .footer-arb-logo { height: 52px; }
          .footer-region-switch .shell { min-height: 0; padding-block: 17px; align-items: flex-start; flex-direction: column; gap: 5px; }
          .footer-legal { padding-block: 19px; align-items: flex-start; flex-direction: column; gap: 10px; }
        }
      `}</style>
    </footer>
  );
}
