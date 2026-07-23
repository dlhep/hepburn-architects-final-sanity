import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

const footerLocations = [
  { href: "/locations/birmingham-architects", label: "Birmingham" },
  { href: "/locations/solihull-architects", label: "Solihull" },
  { href: "/locations/bournville-architects", label: "Bournville" },
  { href: "/locations/kings-heath-architects", label: "Kings Heath" },
  { href: "/locations/wolverhampton-architects", label: "Wolverhampton" },
  { href: "/locations/walsall-architects", label: "Walsall" },
  { href: "/locations/leamington-spa-architects", label: "Leamington Spa" },
  { href: "/locations/aldridge-architects", label: "Aldridge" },
];

export function Footer() {
  return (
    <footer>
      <div className="shell footer-grid footer-grid-expanded">
        <div>
          <div className="brand footer-brand brand-one-line">
            <strong>HEPBURN ARCHITECTS</strong>
          </div>
          <p>Residential architecture, planning and technical design across Birmingham, Solihull and the wider West Midlands.</p>
          <a className="footer-phone" href={site.phoneHref}><Phone size={16} /> <strong>{site.phone}</strong></a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <div className="social-links">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href={site.googleBusiness} target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile"><MapPin /></a>
          </div>
        </div>

        <div>
          <h3>Birmingham Studio</h3>
          <address>Izabella House<br />24-26 Regent Place<br />Birmingham<br />B1 3NJ</address>
          <a href={site.offices.birmingham.mapUrl} target="_blank" rel="noopener noreferrer">View map</a>
        </div>

        <div>
          <h3>Nunthorpe Studio</h3>
          <address>1 Church Lane<br />Nunthorpe<br />Middlesbrough<br />TS7 0PD</address>
        </div>

        <div className="footer-link-group">
          <h3>Explore</h3>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/estimate">Fee calculator</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy & cookies</Link>
        </div>
      </div>

      <div className="shell footer-location-band" aria-label="Areas served">
        <h3>Locations</h3>
        <nav className="footer-location-links">
          {footerLocations.map((location) => (
            <Link key={location.href} href={location.href}>{location.label}</Link>
          ))}
          <Link className="footer-location-all" href="/locations">View all locations</Link>
        </nav>
      </div>

      <div className="shell footer-bottom">© {new Date().getFullYear()} Hepburn Architects Ltd.</div>

      <style>{`
        .footer-location-band {
          display: grid;
          grid-template-columns: 110px minmax(0, 1fr);
          gap: 28px;
          align-items: start;
          margin-top: 34px;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
        }

        .footer-location-band h3 {
          margin: 2px 0 0;
          color: var(--orange);
          font-size: 12px;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .footer-location-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 26px;
          align-items: center;
        }

        .footer-location-links a {
          color: rgba(255, 255, 255, 0.86);
          font-size: 14px;
          line-height: 1.45;
          white-space: nowrap;
          transition: color 160ms ease;
        }

        .footer-location-links a:hover {
          color: #fff;
        }

        .footer-location-links .footer-location-all {
          color: var(--orange);
          font-weight: 700;
        }

        footer .footer-bottom {
          margin-top: 24px;
        }

        @media (max-width: 650px) {
          .footer-location-band {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 30px;
          }

          .footer-location-links {
            gap: 10px 20px;
          }
        }
      `}</style>
    </footer>
  );
}
