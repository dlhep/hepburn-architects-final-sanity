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
          <p>
            Residential architecture, planning and technical design across Birmingham,
            the West Midlands, Teesside and the wider UK.
          </p>
          <a className="footer-phone" href={site.phoneHref}>
            <Phone size={16} /> <strong>{site.phone}</strong>
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <div className="social-links">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href={site.googleBusiness} target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile"><MapPin /></a>
          </div>
        </div>

        <div>
          <h3>Birmingham Office</h3>
          <address>
            Izabella House<br />
            24-26 Regent Place<br />
            Birmingham<br />
            B1 3NJ
          </address>
          <a href={site.offices.birmingham.mapUrl} target="_blank" rel="noopener noreferrer">View map</a>
        </div>

        <div>
          <h3>Nunthorpe Office</h3>
          <address>
            1 Church Lane<br />
            Nunthorpe<br />
            Middlesbrough<br />
            TS7 0PD
          </address>
          <a href={site.offices.nunthorpe.mapUrl} target="_blank" rel="noopener noreferrer">View map</a>
        </div>

        <div>
          <h3>Explore</h3>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/before-after">Before & after</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/estimate">Fee calculator</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        © {new Date().getFullYear()} Hepburn Architects Ltd.
      </div>
    </footer>
  );
}
