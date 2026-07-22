import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";
import { COLLABORATORS_QUERY } from "@/sanity/lib/queries";

export type CollaboratorPhoto = {
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

export type Collaborator = {
  _id?: string;
  name: string;
  role: string;
  roleCategory?: string;
  relationshipLabel?: string;
  company?: string;
  bio: string;
  qualifications?: string[];
  website?: string;
  linkedin?: string;
  email?: string;
  displayOrder?: number;
  photo?: CollaboratorPhoto;
};

export async function getCollaborators(): Promise<Collaborator[]> {
  if (!isSanityConfigured) return [];

  try {
    const result = await client.fetch<Collaborator[]>(
      COLLABORATORS_QUERY,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["sanity-collaborators"],
        },
      },
    );

    return result || [];
  } catch (error) {
    console.error("Sanity collaborator fetch failed; using placeholders.", error);
    return [];
  }
}

export function collaboratorImageUrl(
  photo: CollaboratorPhoto | undefined,
  width = 900,
): string {
  if (!photo?.asset) return "";

  return urlFor(photo).width(width).quality(86).url();
}

export function collaboratorInitials(collaborator: Collaborator): string {
  const source = collaborator.name && collaborator.name !== "Profile to be added"
    ? collaborator.name
    : collaborator.role;

  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
