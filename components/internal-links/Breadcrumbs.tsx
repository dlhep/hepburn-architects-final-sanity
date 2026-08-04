import Link from "next/link";
import styles from "./internal-links.module.css";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
    <Link href="/">Home</Link><span aria-hidden="true"> / </span>
    {items.map((item, index) => <span key={`${item.label}-${index}`}>{item.href ? <Link href={item.href}>{item.label}</Link> : item.label}{index < items.length - 1 ? <><span aria-hidden="true"> / </span></> : null}</span>)}
  </nav>;
}
