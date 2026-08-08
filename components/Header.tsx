"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

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
  }

  return (
    <>
      <div className="topbar">
        <div className="shell topbar-inner">
          <span>ARB registered · RIBA Chartered Practice</span>
          <a className="topbar-phone" href={site.phoneHref}><Phone size={13} /> Call {site.phone}</a>
        </div>
      </div>
      <header className="header">
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
            <Link href="/projects">Projects</Link>
            <Link href="/services">Services</Link>
            <Link href="/knowledge-centre">Knowledge Centre</Link>
            <Link href="/about">Studio</Link>
            <Link href="/blog">Journal</Link>
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
            <Link href="/about" onClick={closeMenu}>Studio</Link>
            <Link href="/blog" onClick={closeMenu}>Journal</Link>
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
          width: clamp(180px, 18vw, 225px);
          height: auto;
        }

        @media (max-width: 1100px) {
          .brand-logo {
            width: 190px;
          }
        }

        @media (max-width: 650px) {
          .brand-logo {
            width: 158px;
          }
        }
      `}</style>
    </>
  );
}
