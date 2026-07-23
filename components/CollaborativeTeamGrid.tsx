"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  collaboratorImageUrl,
  collaboratorInitials,
  type Collaborator,
} from "@/lib/collaborators";

type CollaborativeTeamGridProps = {
  collaborators: Collaborator[];
  usingPlaceholders: boolean;
};

const femalePlaceholderNames = new Set([
  "amy",
  "anna",
  "charlotte",
  "chloe",
  "emma",
  "emily",
  "grace",
  "hannah",
  "helen",
  "joanne",
  "jodie",
  "karen",
  "katie",
  "laura",
  "lucy",
  "maria",
  "nicola",
  "rachel",
  "rebecca",
  "sarah",
  "sophie",
]);

function collaboratorSilhouetteVariant(name: string): "male" | "female" {
  const firstName = name.trim().split(/\s+/)[0]?.toLowerCase() || "";
  return femalePlaceholderNames.has(firstName) ? "female" : "male";
}

export function CollaborativeTeamGrid({
  collaborators,
  usingPlaceholders,
}: CollaborativeTeamGridProps) {
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          collaborators
            .map((collaborator) => collaborator.roleCategory || "Other Specialists")
            .filter(Boolean),
        ),
      ),
    [collaborators],
  );

  const [activeCategory, setActiveCategory] = useState("All roles");

  const visibleCollaborators =
    activeCategory === "All roles"
      ? collaborators
      : collaborators.filter(
          (collaborator) =>
            (collaborator.roleCategory || "Other Specialists") === activeCategory,
        );

  return (
    <>
      <div
        className="shell studio-v4-role-filters"
        aria-label="Filter collaborative team by role"
      >
        {["All roles", ...categories].map((category) => (
          <button
            type="button"
            key={category}
            className={activeCategory === category ? "is-active" : ""}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
            <span>
              {category === "All roles"
                ? collaborators.length
                : collaborators.filter(
                    (collaborator) =>
                      (collaborator.roleCategory || "Other Specialists") ===
                      category,
                  ).length}
            </span>
          </button>
        ))}
      </div>

      <div className="shell studio-v4-collaborator-grid">
        {visibleCollaborators.map((collaborator) => {
          const imageUrl = collaboratorImageUrl(collaborator.photo);
          const name = collaborator.name || collaborator.role;
          const silhouetteVariant = collaboratorSilhouetteVariant(name);

          return (
            <article
              className={`studio-v4-collaborator-card ${
                usingPlaceholders ? "is-placeholder" : ""
              }`}
              key={collaborator._id || `${collaborator.role}-${name}`}
            >
              <div className="studio-v4-collaborator-photo">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={
                      collaborator.photo?.alt ||
                      `${name}, ${collaborator.role}`
                    }
                    fill
                    sizes="(max-width: 650px) 100vw, (max-width: 950px) 50vw, 33vw"
                  />
                ) : (
                  <>
                    {silhouetteVariant === "female" ? (
                      <svg
                        className="studio-v4-collaborator-silhouette is-female"
                        viewBox="0 0 200 190"
                        role="img"
                        aria-label="Female profile photograph placeholder"
                      >
                        <path d="M51 100c-9-17-11-39-6-58C52 16 72 3 100 3c30 0 51 15 58 42 5 20 2 41-7 58l13 43c19 9 31 24 36 44H0c5-21 18-37 38-46l13-44Zm49-69c-19 0-31 13-31 34v21c0 24 13 43 31 43s31-19 31-43V65c0-21-12-34-31-34Z" />
                      </svg>
                    ) : (
                      <svg
                        className="studio-v4-collaborator-silhouette is-male"
                        viewBox="0 0 200 190"
                        role="img"
                        aria-label="Male profile photograph placeholder"
                      >
                        <path d="M54 69C54 27 74 6 101 6c30 0 48 22 48 63v18c0 22-10 39-26 49v8c31 7 54 24 61 46H16c7-23 30-40 61-47v-7C62 126 54 109 54 87V69Zm19-8c10-2 22-8 31-18 4 10 13 18 25 22v22c0 24-12 42-29 42S73 111 73 87V61Z" />
                        <path d="M58 60C61 25 77 8 102 8c25 0 41 17 45 50-13-5-23-14-28-25-12 14-32 23-61 27Z" />
                      </svg>
                    )}
                    <span>{collaboratorInitials(collaborator)}</span>
                  </>
                )}
              </div>

              <div className="studio-v4-collaborator-content">
                <small>
                  {usingPlaceholders
                    ? "Collaborator profile being added"
                    : collaborator.relationshipLabel ||
                      "Independent collaborator"}
                </small>
                <h3>{name}</h3>
                <strong>{collaborator.role}</strong>

                {collaborator.company && (
                  <span className="studio-v4-collaborator-company">
                    {collaborator.company}
                  </span>
                )}

                <p>{collaborator.bio}</p>

                {!!collaborator.qualifications?.length && (
                  <div className="studio-v4-qualification-list">
                    {collaborator.qualifications.map((qualification) => (
                      <span key={qualification}>{qualification}</span>
                    ))}
                  </div>
                )}

                {(collaborator.website ||
                  collaborator.linkedin ||
                  collaborator.email) && (
                  <div className="studio-v4-collaborator-links">
                    {collaborator.website && (
                      <a
                        href={collaborator.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Company website <ArrowUpRight size={16} />
                      </a>
                    )}
                    {collaborator.linkedin && (
                      <a
                        href={collaborator.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} on LinkedIn`}
                      >
                        <Linkedin size={16} /> LinkedIn
                      </a>
                    )}
                    {collaborator.email && (
                      <a href={`mailto:${collaborator.email}`}>
                        <Mail size={16} /> Email
                      </a>
                    )}
                  </div>
                )}

                {usingPlaceholders && (
                  <span className="studio-v4-placeholder-link">
                    Name, company and photograph coming soon
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!visibleCollaborators.length && (
        <p className="shell studio-v4-empty-filter">
          No collaborators are currently listed in this role.
        </p>
      )}
    </>
  );
}
