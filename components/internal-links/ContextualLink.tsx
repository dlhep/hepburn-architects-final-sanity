import Link from "next/link";
import type { ReactNode } from "react";

export function ContextualLink({ href, children, group = "contextual-copy" }: { href: string; children: ReactNode; group?: string }) {
  return <Link href={href} data-track-internal="true" data-track-group={group}>{children}</Link>;
}
