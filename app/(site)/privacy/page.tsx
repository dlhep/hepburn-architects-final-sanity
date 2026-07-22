import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy and Cookie Notice",
  description:
    "How Hepburn Architects collects, uses, stores and protects website enquiry, calculator and optional analytics information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="shell article-page">
        <small className="eyebrow">Privacy and cookies</small>
        <h1>Privacy and cookie notice</h1>
        <p className="lead">
          This notice explains how Hepburn Architects Ltd handles personal information
          submitted through this website and how optional analytics are controlled.
        </p>
        <p>Last updated: 22 July 2026.</p>

        <section>
          <h2>Who is responsible for your information</h2>
          <p>
            Hepburn Architects Ltd is the data controller for information collected through
            this website. Our correspondence address is Izabella House, 24-26 Regent Place,
            Birmingham, B1 3NJ. Privacy enquiries can be sent to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>

        <section>
          <h2>Information we may collect</h2>
          <ul>
            <li>Name, email address and telephone number.</li>
            <li>Project address, postcode, property type and project description.</li>
            <li>Calculator selections, indicative fee information and enquiry source.</li>
            <li>Messages, attachments and correspondence you choose to send us.</li>
            <li>
              Limited website usage information through Google Analytics, but only after you
              accept optional analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why we use personal information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Respond to enquiries and arrange consultations.</li>
            <li>Review a property, brief and likely architectural appointment.</li>
            <li>Prepare fee proposals and provide requested services.</li>
            <li>Maintain appropriate business, professional and legal records.</li>
            <li>Protect the website and prevent misuse.</li>
            <li>
              Understand website performance where optional analytics consent has been given.
            </li>
          </ul>
          <p>
            We do not add website enquirers to general marketing lists unless a separate and
            clear marketing choice is provided.
          </p>
        </section>

        <section>
          <h2>Lawful bases</h2>
          <p>
            We normally process enquiry information because it is necessary to take steps at
            your request before entering into a contract, to perform a contract, or because we
            have a legitimate interest in responding to genuine enquiries and operating the
            practice. Where optional analytics require consent, they remain disabled until you
            accept them.
          </p>
        </section>

        <section>
          <h2>Cookies and optional analytics</h2>
          <p>
            The website uses a necessary local preference to remember whether you accepted or
            rejected optional analytics. Google Analytics is not loaded until you choose
            “Accept analytics”. You can reopen Cookie settings at any time and change that
            choice.
          </p>
          <p>
            Analytics information is used in aggregate to understand page visits and actions
            such as consultation, telephone and enquiry clicks. It is not used to make automated
            decisions about you.
          </p>
        </section>

        <section>
          <h2>Service providers</h2>
          <p>We may use carefully selected providers including:</p>
          <ul>
            <li>Vercel for website hosting and delivery.</li>
            <li>Sanity for website content management.</li>
            <li>Formspree for website enquiry processing.</li>
            <li>Calendly when you choose to book a consultation.</li>
            <li>Google Analytics only where optional analytics consent has been given.</li>
            <li>Professional advisers and consultants where necessary for a project.</li>
          </ul>
          <p>
            Some providers may process information outside the UK. Where this occurs, we rely
            on the provider&apos;s appropriate contractual and legal safeguards.
          </p>
        </section>

        <section>
          <h2>How long information is retained</h2>
          <p>
            Enquiries that do not become projects are normally retained for up to 24 months so
            that we can respond to follow-up questions and understand the history of the
            enquiry. Client and project records may be kept longer where required for contracts,
            taxation, insurance, professional obligations or legal claims. Information is
            deleted or anonymised when it is no longer reasonably needed.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            Depending on the circumstances, you may have rights to access, correct, delete or
            restrict your information, object to processing, or receive information in a
            portable form. Where processing relies on consent, you may withdraw that consent at
            any time without affecting earlier lawful processing.
          </p>
          <p>
            Contact <a href={`mailto:${site.email}`}>{site.email}</a> to exercise a right or ask
            a privacy question. You may also complain to the UK Information Commissioner&apos;s
            Office if you believe your information has not been handled correctly.
          </p>
        </section>

        <section>
          <h2>Contacting us</h2>
          <p>
            For a project enquiry, use the <Link href="/contact">contact page</Link>. For a
            privacy request, email <a href={`mailto:${site.email}`}>{site.email}</a> and include
            enough information for us to identify the relevant records.
          </p>
        </section>
      </div>
    </section>
  );
}
