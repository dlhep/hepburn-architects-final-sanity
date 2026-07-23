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

    mobileNavRef.current?.querySelector<HTMLElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
          <Link className="brand brand-one-line" href="/" onClick={closeMenu}>
            <strong className="brand-title">HEPBURN ARCHITECTS</strong>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/blog">Journal</Link>
            <Link href="/about">Studio</Link>
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
            <Link href="/services" onClick={closeMenu}>Services</Link>
            <Link href="/projects" onClick={closeMenu}>Projects</Link>
            <Link href="/guides" onClick={closeMenu}>Guides</Link>
            <Link href="/blog" onClick={closeMenu}>Journal</Link>
            <Link href="/about" onClick={closeMenu}>Studio</Link>
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
    </>
  );
}
