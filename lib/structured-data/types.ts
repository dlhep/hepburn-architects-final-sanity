export type SchemaValue = string | number | boolean | null | SchemaNode | SchemaValue[];

export type SchemaNode = {
  "@context"?: string;
  "@type"?: string | string[];
  "@id"?: string;
  [key: string]: SchemaValue | undefined;
};

export type BreadcrumbItem = { name: string; url: string };
export type FaqItem = { question: string; answer: string };
export type Area = { type?: "City" | "AdministrativeArea" | "Place"; name: string };
