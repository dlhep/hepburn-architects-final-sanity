"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenu, setMegaMenu] = useState<"projects" | "services" | "knowledge" | null>(null);
  const overlayHeaderPage = pathname === "/" || pathname === "/projects" || pathname === "/services";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!overlayHeaderPage) return;

    const updateHeader = () => setScrolled(window.scrollY > 80);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [overlayHeaderPage]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNavRef.current?.querySelector<HTMLElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === "Tab" && mobileNavRef.current) {
        const focusable = [menuButtonRef.current, ...mobileNavRef.current.querySelectorAll<HTMLElement>("a,button")].filter((item): item is HTMLElement => Boolean(item));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = previousOverflow; };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setMegaMenu(null);
  }

  const megaMenus = {
    projects: {
      eyebrow: "Selected work",
      title: "Architecture shaped around real homes and places.",
      intro: "Explore completed extensions, new homes, planning work and residential transformations.",
      overview: { href: "/projects", label: "View all projects" },
      image: "/images/selected-work-2.webp",
      links: [
        ["House extensions", "/services/house-extensions"], ["New-build homes", "/services/new-build-homes"],
        ["Birmingham projects", "/locations/birmingham-architects"], ["Solihull projects", "/locations/solihull-architects"],
        ["Project map", "/projects#project-map"], ["Client reviews", "/reviews"],
      ],
    },
    services: {
      eyebrow: "Architectural services",
      title: "A clear route from first idea to technical design.",
      intro: "Director-led residential architecture, planning and technical support across the West Midlands.",
      overview: { href: "/services", label: "Explore all services" },
      image: "/images/services-hero-photoreal.png",
      links: [
        ["House extensions", "/services/house-extensions"], ["Planning applications", "/services/planning-applications"],
        ["Building Regulations", "/services/building-regulations"], ["New-build homes", "/services/new-build-homes"],
        ["Loft conversions", "/services/loft-conversions"], ["HMO conversions", "/services/hmo-conversions"],
      ],
    },
    knowledge: {
      eyebrow: "Knowledge Centre",
      title: "Practical guidance before you commit.",
      intro: "Straightforward answers on design, planning permission, costs, timescales and Building Regulations.",
      overview: { href: "/knowledge-centre", label: "Open the Knowledge Centre" },
      image: "/images/childrens-home-planning-hero.png",
      links: [
        ["Planning permission", "/knowledge-centre/planning-permission"], ["Building Regulations", "/knowledge-centre/building-regulations"],
        ["Extension costs", "/knowledge-centre/house-extension-costs"], ["Extension timeline", "/knowledge-centre/house-extension-timeline"],
        ["Loft conversions", "/knowledge-centre/loft-conversions"], ["Planning tools", "/planning-tools"],
      ],
    },
  } as const;

  return (
    <>
      <header className={`header${overlayHeaderPage && scrolled ? " is-scrolled" : ""}`}>
        <div className="shell nav">
          <Link className="brand-logo-link" href="/" onClick={closeMenu} aria-label="Hepburn Architects home">
            {/* The inline SVG wordmark keeps its intrinsic proportions without an image optimisation request. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/hepburn-logo.svg"
              alt="Hepburn Architects"
              width={581}
              height={155}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {([['projects', 'Projects'], ['services', 'Services'], ['knowledge', 'Knowledge Centre']] as const).map(([key, label]) => (
              <button className={`mega-trigger${megaMenu === key ? " is-active" : ""}`} type="button" key={key} onClick={() => setMegaMenu((current) => current === key ? null : key)} aria-expanded={megaMenu === key} aria-controls="desktop-mega-menu">
                {label}<ChevronDown size={14} />
              </button>
            ))}
            <Link href="/about">About</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/estimate">Fee calculator</Link>
            <a className="nav-phone" href={site.phoneHref}><Phone size={16} /> {site.phone}</a>
            <a className="btn primary small-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a>
          </nav>
          <button
            ref={menuButtonRef}
            className="menu-btn"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {megaMenu && (
          <div className="mega-menu" id="desktop-mega-menu">
            <div className="shell mega-menu-grid">
              <div className="mega-menu-intro">
                <small>{megaMenus[megaMenu].eyebrow}</small>
                <h2>{megaMenus[megaMenu].title}</h2>
                <p>{megaMenus[megaMenu].intro}</p>
                <Link href={megaMenus[megaMenu].overview.href} onClick={closeMenu}>{megaMenus[megaMenu].overview.label}<ArrowRight size={17} /></Link>
              </div>
              <nav className="mega-menu-links" aria-label={`${megaMenus[megaMenu].eyebrow} menu`}>
                {megaMenus[megaMenu].links.map(([label, href], index) => <Link href={href} onClick={closeMenu} key={href}><span>0{index + 1}</span>{label}<ArrowRight size={15} /></Link>)}
              </nav>
              <Link className="mega-menu-feature" href={megaMenus[megaMenu].overview.href} onClick={closeMenu}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={megaMenus[megaMenu].image} alt="" />
                <span>Explore {megaMenus[megaMenu].eyebrow}<ArrowRight size={17} /></span>
              </Link>
            </div>
          </div>
        )}
        {open && (
          <nav
            ref={mobileNavRef}
            id="mobile-navigation"
            className="mobile-nav shell"
            aria-label="Mobile navigation"
          >
            <Link href="/projects" onClick={closeMenu}>Projects</Link>
            <Link href="/services" onClick={closeMenu}>Services</Link>
            <Link href="/knowledge-centre" onClick={closeMenu}>Knowledge Centre</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
            <Link href="/journal" onClick={closeMenu}>Journal</Link>
            <Link href="/estimate" onClick={closeMenu}>Fee calculator</Link>
            <a className="btn call-btn" href={site.phoneHref}><Phone size={18} /> Call {site.phone}</a>
            <a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a>
          </nav>
        )}
      </header>
      <a className="mobile-call-float" href={site.phoneHref} aria-label={`Call Hepburn Architects on ${site.phone}`}>
        <Phone />
        <span>Call now</span>
      </a>
      <style jsx>{`
        .brand-logo-link {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          line-height: 0;
        }

        .brand-logo {
          display: block;
          width: 150px;
          height: auto;
        }

        @media (max-width: 1100px) {
          .brand-logo {
            width: 150px;
          }
        }

        @media (max-width: 650px) {
          .brand-logo {
            width: 150px;
          }
        }
      `}</style>
    </>
  );
}
