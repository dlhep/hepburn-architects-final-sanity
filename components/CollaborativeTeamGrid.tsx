"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  UserRound,
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
                    <UserRound aria-hidden="true" />
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
