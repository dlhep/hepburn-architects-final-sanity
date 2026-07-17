"use client";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
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
          <Link className="brand brand-one-line" href="/" onClick={() => setOpen(false)}>
            <strong className="brand-wordmark"><span>HEPBURN</span><span>ARCHITECTS</span></strong>
          </Link>
          <nav className="desktop-nav">
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">Studio</Link>
            <Link href="/estimate">Fee calculator</Link>
            <a className="nav-phone" href={site.phoneHref}><Phone size={16} /> {site.phone}</a>
            <a className="btn primary small-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a>
          </nav>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav shell">
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/projects" onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/guides" onClick={() => setOpen(false)}>Guides</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/about" onClick={() => setOpen(false)}>Studio</Link>
            <Link href="/estimate" onClick={() => setOpen(false)}>Fee calculator</Link>
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
