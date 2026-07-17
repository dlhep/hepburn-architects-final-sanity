import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = value?.asset
        ? urlFor(value).width(1400).quality(86).url()
        : "";

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
          {value.caption ? (
            <figcaption style={{ marginTop: ".65rem", opacity: .7 }}>
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export function ArticleBody({ value }: { value: unknown[] }) {
  return <div><PortableText value={value as never[]} components={components} /></div>;
}
