import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

type PortableBlock = {
  _type?: string;
  style?: string;
  children?: Array<{ text?: string }>;
};

function textFromBlock(block: PortableBlock) {
  return block.children?.map((child) => child.text || "").join("") || "";
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function youtubeId(url = "") {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^?&/]+)/);
  return match?.[1];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = value?.asset ? urlFor(value).width(1400).quality(86).url() : "";
      if (!src) return null;
      return (
        <figure style={{ margin: "2rem 0" }}>
          <Image
            src={src}
            alt={value.alt || "Architecture article image"}
            width={1400}
            height={900}
            sizes="(max-width: 900px) 100vw, 760px"
            style={{ width: "100%", height: "auto", borderRadius: "18px" }}
          />
          {value.caption ? <figcaption style={{ marginTop: ".65rem", opacity: .7 }}>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    callout: ({ value }) => (
      <aside className={`article-callout article-callout-${value.tone || "tip"}`}>
        <small>{value.tone === "warning" ? "Common mistake" : value.tone === "important" ? "Important" : "Architect’s tip"}</small>
        <h3>{value.title}</h3>
        <p>{value.text}</p>
      </aside>
    ),
    checklist: ({ value }) => (
      <section className="article-checklist-block">
        <h3>{value.title}</h3>
        <ul>{(value.items || []).map((item: string) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
      </section>
    ),
    faqGroup: ({ value }) => (
      <section className="article-faq">
        <h2>{value.title || "Frequently asked questions"}</h2>
        {(value.items || []).map((item: { question: string; answer: string }) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
    ),
    youtube: ({ value }) => {
      const id = youtubeId(value.url);
      if (!id) return null;
      return (
        <figure className="article-video">
          <div>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={value.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <figcaption>{value.title}</figcaption>
        </figure>
      );
    },
    download: ({ value }) => (
      <aside className="article-download">
        <div>
          <small>Free resource</small>
          <h3>{value.title}</h3>
          {value.description ? <p>{value.description}</p> : null}
        </div>
        <a className="btn primary" href={value.url}>{value.buttonText || "Download guide"}</a>
      </aside>
    ),
  },
  block: {
    h2: ({ children, value }) => <h2 id={slugify(textFromBlock(value as PortableBlock))}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={slugify(textFromBlock(value as PortableBlock))}>{children}</h3>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    ),
  },
};

export function ArticleBody({ value }: { value: unknown[] }) {
  const headings = (value as PortableBlock[])
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => ({ text: textFromBlock(block), id: slugify(textFromBlock(block)) }))
    .filter((heading) => heading.text);

  return (
    <div className="enhanced-article-body">
      {headings.length >= 3 ? (
        <nav className="article-toc" aria-label="On this page">
          <small>On this page</small>
          <ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol>
        </nav>
      ) : null}
      <PortableText value={value as never[]} components={components} />
      <style>{`
        .enhanced-article-body h2,.enhanced-article-body h3{scroll-margin-top:130px}
        .article-toc,.article-checklist-block{margin:2rem 0;padding:1.5rem;border:1px solid rgba(29,29,27,.14);border-radius:18px;background:#f7f5f0}
        .article-toc small,.article-callout small,.article-download small{display:block;margin-bottom:.65rem;text-transform:uppercase;letter-spacing:.12em;font-weight:700}
        .article-toc ol{columns:2;margin:0;padding-left:1.2rem}.article-toc li{margin:.45rem 1rem .45rem 0;break-inside:avoid}
        .article-callout{margin:2rem 0;padding:1.5rem;border-radius:18px;border-left:5px solid #df5b22;background:#f7f5f0}
        .article-callout-warning{border-left-color:#1d1d1b}.article-callout h3,.article-checklist-block h3,.article-download h3{margin-top:0}
        .article-checklist-block ul{list-style:none;padding:0;margin-bottom:0}.article-checklist-block li{display:flex;gap:.75rem;margin:.75rem 0}.article-checklist-block li span{color:#df5b22;font-weight:800}
        .article-faq{margin:3rem 0}.article-faq details{border-top:1px solid rgba(29,29,27,.18);padding:1rem 0}.article-faq details:last-child{border-bottom:1px solid rgba(29,29,27,.18)}
        .article-faq summary{cursor:pointer;font-weight:700}.article-video{margin:2.5rem 0}.article-video>div{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:18px;background:#111}
        .article-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.article-video figcaption{margin-top:.65rem;opacity:.72}
        .article-download{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;margin:2.5rem 0;padding:1.5rem;border-radius:18px;background:#1d1d1b;color:#fff}
        @media(max-width:700px){.article-toc ol{columns:1}.article-download{align-items:flex-start;flex-direction:column}}
      `}</style>
    </div>
  );
}
