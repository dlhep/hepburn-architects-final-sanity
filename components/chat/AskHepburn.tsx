"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowUp, Check, MessageCircle, Phone, X } from "lucide-react";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { guidedTopics, matchGuidedTopic, type GuidedTopic } from "@/lib/chat/guided-responses";
import { site } from "@/lib/site";
import { postcodeDistrict, trackEvent, trackLead, trackSuccessfulFormSubmission } from "@/lib/analytics";
import styles from "./AskHepburn.module.css";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  links?: GuidedTopic["links"];
};

const INTRO =
  "Hello — I’m the Hepburn project assistant. I can help with initial questions about planning, extensions, loft conversions, new homes, HMOs, Building Regulations and architectural fees.";
const GREETING_KEY = "ask-hepburn-greeting-v1";
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function AskHepburn() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [viewingTopics, setViewingTopics] = useState(true);
  const [greeting, setGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "intro", role: "assistant", content: INTRO },
  ]);
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState(false);
  const [category, setCategory] = useState("");
  const [offerLead, setOfferLead] = useState(false);
  const [leadExpanded, setLeadExpanded] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const leadSubmittingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const titleId = useId();

  useEffect(() => {
    if (window.sessionStorage.getItem(GREETING_KEY)) return;
    let collapseTimer: number | undefined;
    const showTimer = window.setTimeout(() => {
      setGreeting(true);
      window.sessionStorage.setItem(GREETING_KEY, "shown");
      collapseTimer = window.setTimeout(() => setGreeting(false), 6_000);
    }, 10_000);
    return () => {
      window.clearTimeout(showTimer);
      if (collapseTimer) window.clearTimeout(collapseTimer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const oldOverflow = document.body.style.overflow;
    if (window.matchMedia("(max-width: 650px)").matches) document.body.style.overflow = "hidden";
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeChat();
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])',
        ),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending, offerLead, leadExpanded]);

  useEffect(() => {
    if (viewingTopics) messagesRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [viewingTopics]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    setOpen(false);
    setGreeting(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  }, [pathname]);

  function openChat() {
    setGreeting(false);
    setOpen(true);
    trackEvent("chatbot_open", { page_path: window.location.pathname });
  }

  function closeChat() {
    setOpen(false);
    trackEvent("chat_closed");
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }

  function closeChatForNavigation() {
    setOpen(false);
    setGreeting(false);
    trackEvent("chatbot_link_click", { destination_url: "/contact", page_path: window.location.pathname });
  }

  function selectTopic(topic: GuidedTopic) {
    setCategory(topic.label);
    setViewingTopics(false);
    setMessages((current) => [
      ...current,
      { id: makeId(), role: "user", content: topic.label },
      { id: makeId(), role: "assistant", content: topic.response, links: topic.links },
    ]);
    setOfferLead(true);
    trackEvent("chatbot_option_selected", { option_name: topic.label, page_path: window.location.pathname });
  }

  function showTopics() {
    setViewingTopics(true);
    setLeadExpanded(false);
    trackEvent("chat_topics_viewed");
  }

  function startNewChat() {
    setMessages([{ id: "intro", role: "assistant", content: INTRO }]);
    setViewingTopics(true);
    setQuestion("");
    setCategory("");
    setOfferLead(false);
    setLeadExpanded(false);
    setLeadStatus("idle");
    trackEvent("chat_restarted");
  }

  async function askQuestion(event: FormEvent) {
    event.preventDefault();
    const value = question.trim();
    if (!value || pending) return;
    const match = matchGuidedTopic(value);
    const next = [...messages, { id: makeId(), role: "user" as const, content: value }];
    setViewingTopics(false);
    setMessages(next);
    setQuestion("");
    setPending(true);
    setOfferLead(false);
    if (match) setCategory(match.label);
    trackEvent("chat_free_text_used");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((message) => message.id !== "intro")
            .slice(-8)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const result = (await response.json()) as { answer?: string; message?: string };
      const fallback =
        match?.response ??
        result.message ??
        "A live answer is unavailable. Please use a guided option or contact the practice.";
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content: response.ok && result.answer ? result.answer : fallback,
          links: response.ok && result.answer
            ? undefined
            : match?.links ?? [{ label: "Contact the practice", href: "/contact" }],
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content: match?.response ?? "A live answer is unavailable. Please use a guided option or contact the practice.",
          links: match?.links ?? [{ label: "Contact the practice", href: "/contact" }],
        },
      ]);
    } finally {
      setPending(false);
      setOfferLead(true);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (leadSubmittingRef.current) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const includeConversationSummary = data.includeConversationSummary === "yes";
    const latestVisitorQuestion = messages
      .filter((message) => message.role === "user")
      .at(-1)?.content;

    leadSubmittingRef.current = true;
    setLeadStatus("sending");
    try {
      const response = await fetch("/api/ask-hepburn-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          postcode: data.postcode,
          projectType: data.projectType,
          projectDescription: data.projectDescription,
          preferredNextStep: data.preferredNextStep,
          currentPageUrl: window.location.href,
          consentConfirmed: data.consent === "Agreed",
          includeConversationSummary,
          conversationSummary: includeConversationSummary
            ? [
                `Selected topic: ${category || "Not selected"}.`,
                latestVisitorQuestion ? `Latest visitor question: ${latestVisitorQuestion}` : "",
              ].filter(Boolean).join(" ")
            : undefined,
        }),
      });
      if (!response.ok) throw new Error(`Submission failed with status ${response.status}.`);
      form.reset();
      setLeadStatus("sent");
      trackSuccessfulFormSubmission(form, { form_location: "floating_chat", project_type: String(data.projectType || ""), postcode_district: postcodeDistrict(data.postcode) });
      trackEvent("chatbot_enquiry_submit", { option_name: category || "chatbot_enquiry", page_path: window.location.pathname });
      trackLead({ lead_type: "chatbot_enquiry", form_id: "chatbot-lead-form", project_type: String(data.projectType || ""), postcode_district: postcodeDistrict(data.postcode), conversion_location: "floating_chat" });
    } catch {
      setLeadStatus("error");
    } finally {
      leadSubmittingRef.current = false;
    }
  }

  return (
    <div className={styles.widget}>
      {!open && greeting ? (
        <div className={styles.greeting}>
          <button type="button" onClick={openChat}>Planning a project? Ask Hepburn a quick question.</button>
          <button type="button" aria-label="Dismiss Ask Hepburn greeting" onClick={() => setGreeting(false)}>
            <X aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {open ? (
        <>
          <button className={styles.backdrop} type="button" aria-label="Close Ask Hepburn" onClick={closeChat} />
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialogRef}>
            <header className={styles.header}>
              <div>
                <span className={styles.mark}><MessageCircle aria-hidden="true" /></span>
                <div><span id={titleId} className={styles.title}>Ask Hepburn</span><small>Project assistant</small></div>
              </div>
              <button type="button" onClick={closeChat} aria-label="Close Ask Hepburn"><X aria-hidden="true" /></button>
            </header>

            <nav className={styles.chatNavigation} aria-label="Chat navigation">
              {!viewingTopics ? (
                <button type="button" className={styles.backToTopics} onClick={showTopics}>
                  <ArrowLeft aria-hidden="true" /> Back to topics
                </button>
              ) : <span />}
              {messages.some((message) => message.role === "user") ? (
                <button type="button" className={styles.newChat} onClick={startNewChat} disabled={pending}>
                  Start new chat
                </button>
              ) : null}
            </nav>

            <div className={styles.messages} ref={messagesRef}>
              {viewingTopics ? (
                <section className={styles.topicsView} aria-labelledby={`${titleId}-topics`}>
                  <div className={`${styles.message} ${styles.assistant}`}>
                    <p>{INTRO}</p>
                  </div>
                  <h2 id={`${titleId}-topics`}>What would you like help with?</h2>
                  <div className={styles.quickActions}>
                  {guidedTopics.map((topic) => (
                    <button type="button" key={topic.id} onClick={() => selectTopic(topic)} disabled={pending}>
                      {topic.label}
                    </button>
                  ))}
                  </div>
                </section>
              ) : (
                <div className={styles.log} aria-live="polite" aria-relevant="additions">
                  {messages.map((message) => (
                    <div className={`${styles.message} ${styles[message.role]}`} key={message.id}>
                      <p>{message.content}</p>
                      {message.links ? (
                        <div className={styles.messageLinks}>
                          {message.links.map((link) => (
                            <Link
                              href={link.href}
                              key={link.href}
                              target={link.href.startsWith("http") ? "_blank" : undefined}
                              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              onClick={link.href.startsWith("http") ? undefined : closeChatForNavigation}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {pending ? (
                    <div className={`${styles.message} ${styles.assistant}`} aria-label="Ask Hepburn is preparing a response">
                      <span className={styles.typing} aria-hidden="true"><i /><i /><i /></span>
                    </div>
                  ) : null}
                </div>
              )}

              {!viewingTopics && offerLead ? (
                <section className={styles.conversion} aria-label="Project enquiry">
                  <p className={styles.conversionTitle}>Would you like Hepburn Architects to review your project?</p>
                  {!leadExpanded && leadStatus !== "sent" ? (
                    <button
                      type="button"
                      className={styles.leadToggle}
                      onClick={() => {
                        setLeadExpanded(true);
                        trackEvent("chatbot_enquiry_start", { option_name: category || "guided_topic", page_path: window.location.pathname });
                      }}
                    >
                      Send project details
                    </button>
                  ) : null}
                  {leadExpanded && leadStatus !== "sent" ? (
                    <form id="chatbot-lead-form" name="chatbot-lead-form" data-track-location="floating_chat" data-track-manual-submit="true"
                      onSubmit={submitLead}
                      className={styles.leadForm}
                      aria-busy={leadStatus === "sending"}
                    >
                      <label>Name<input name="name" autoComplete="name" required /></label>
                      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
                      <label>Project postcode<input name="postcode" autoComplete="postal-code" required /></label>
                      <label>Project type
                        <select name="projectType" defaultValue={category} required>
                          <option value="" disabled>Select a project type</option>
                          {guidedTopics.slice(0, 7).map((topic) => <option key={topic.id}>{topic.label}</option>)}
                          <option>Other residential project</option>
                        </select>
                      </label>
                      <label>Short project description<textarea name="projectDescription" rows={3} maxLength={1000} required /></label>
                      <label>Preferred next step
                        <select name="preferredNextStep" defaultValue="Email response" required>
                          <option>Email response</option><option>Book a consultation</option><option>Request a fee proposal</option>
                        </select>
                      </label>
                      <label className={styles.consent}>
                        <input type="checkbox" name="consent" value="Agreed" required />
                        <span>I agree that Hepburn Architects may use these details to respond to my enquiry.</span>
                      </label>
                      <label className={styles.consent}>
                        <input type="checkbox" name="includeConversationSummary" value="yes" />
                        <span>Include a short summary of my Ask Hepburn conversation with this enquiry.</span>
                      </label>
                      <button className={styles.submitLead} type="submit" disabled={leadStatus === "sending"}>
                        {leadStatus === "sending" ? "Sending…" : "Send to the practice"}
                      </button>
                      {leadStatus === "error" ? (
                        <p role="alert">
                          We couldn’t send your enquiry just now. Please use the main contact form or email the practice directly.
                        </p>
                      ) : null}
                    </form>
                  ) : null}
                  {leadStatus === "sent" ? (
                    <p role="status" className={styles.sent}>
                      <Check aria-hidden="true" /> Thank you. Your project details have been sent to Hepburn Architects. The practice will reply using the email address you provided.
                    </p>
                  ) : null}
                </section>
              ) : null}
            </div>

            <div className={styles.composer}>
              <form onSubmit={askQuestion}>
                <label className="sr-only" htmlFor={`${titleId}-question`}>Ask a question about your project</label>
                <input
                  id={`${titleId}-question`}
                  ref={inputRef}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask a question about your project…"
                  maxLength={1000}
                  disabled={pending}
                />
                <button type="submit" aria-label="Send question" disabled={!question.trim() || pending}>
                  <ArrowUp aria-hidden="true" />
                </button>
              </form>
              <p>General initial guidance only. Project-specific advice requires review of the property, planning history and proposed design.</p>
              <div className={styles.human}>
                <Link href="/contact" onClick={closeChatForNavigation}>Contact the practice</Link>
                <a href={site.phoneHref}><Phone aria-hidden="true" /> {site.phone}</a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          ref={launcherRef}
          type="button"
          className={styles.launcher}
          onClick={openChat}
          aria-label="Open Ask Hepburn project assistant"
          aria-haspopup="dialog"
        >
          <span><MessageCircle aria-hidden="true" /></span><strong>Ask Hepburn</strong>
        </button>
      )}
    </div>
  );
}
