"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackedLink({
  href,
  eventName,
  className,
  children,
  target,
  rel,
}: {
  href: string;
  eventName: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent(eventName, { destination: href })}
    >
      {children}
    </a>
  );
}
