import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

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
          <a href="https://www.hepburnarchitects.com/architects-middlesbrough" target="_blank" rel="noopener noreferrer">Visit the North East website</a>
        </div>

        <div className="footer-links-column">
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

          <div className="footer-link-group">
            <h3>Locations</h3>
            <Link href="/locations/birmingham-architects">Birmingham</Link>
            <Link href="/locations/solihull-architects">Solihull</Link>
            <Link href="/locations/bournville-architects">Bournville</Link>
            <Link href="/locations/kings-heath-architects">Kings Heath</Link>
            <Link href="/locations/wolverhampton-architects">Wolverhampton</Link>
            <Link href="/locations/walsall-architects">Walsall</Link>
            <Link href="/locations/leamington-spa-architects">Leamington Spa</Link>
            <Link href="/locations/aldridge-architects">Aldridge</Link>
            <Link href="/locations">View all locations</Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} Hepburn Architects Ltd.</div>
    </footer>
  );
}
