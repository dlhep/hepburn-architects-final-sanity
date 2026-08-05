import { serializeJsonLd } from "@/lib/seo";
import type { SchemaNode } from "@/lib/structured-data";

type StructuredDataValue = SchemaNode | { "@context": "https://schema.org"; "@graph": SchemaNode[] };

export function StructuredData({ data, id = "structured-data" }: { data: StructuredDataValue; id?: string }) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
