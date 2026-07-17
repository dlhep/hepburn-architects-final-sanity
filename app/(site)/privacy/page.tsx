import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Notice", description: "Privacy notice for Hepburn Architects website enquiries.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <section className="section"><div className="shell article-page"><small className="eyebrow">Privacy</small><h1>Privacy notice</h1><p className="lead">Information submitted through the website is used to respond to enquiries and provide requested project information.</p><h2>Information collected</h2><p>Name, email address, project location and project details submitted through forms or calculators.</p><h2>How it is used</h2><p>To respond to your enquiry, prepare fee information and discuss architectural services. Information is not sold.</p><h2>Third-party processors</h2><p>Form submissions are processed through Formspree and the website is hosted by Vercel.</p><h2>Contact</h2><p>Contact info@hepburnarchitects.com with privacy questions or deletion requests.</p></div></section>
  );
}
