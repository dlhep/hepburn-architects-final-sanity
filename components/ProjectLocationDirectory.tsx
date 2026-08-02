import type { PublicProjectDirectoryItem } from "@/lib/mapped-projects";
import styles from "./ProjectMapSection.module.css";

const REGION_ORDER = [
  "Birmingham & Solihull",
  "Black Country",
  "Worcestershire",
  "Warwickshire & Coventry",
  "Staffordshire",
  "Teesside & North East",
  "Other UK",
] as const;

type RegionName = (typeof REGION_ORDER)[number];

const REGION_TOWNS: Record<Exclude<RegionName, "Other UK">, readonly string[]> = {
  "Birmingham & Solihull": [
    "acocks green",
    "birmingham",
    "bournville",
    "castle bromwich",
    "edgbaston",
    "erdington",
    "hall green",
    "harborne",
    "kings heath",
    "moseley",
    "northfield",
    "selly oak",
    "solihull",
    "sutton coldfield",
    "yardley",
  ],
  "Black Country": [
    "bilston",
    "brierley hill",
    "dudley",
    "halesowen",
    "oldbury",
    "rowley regis",
    "sandwell",
    "smethwick",
    "stourbridge",
    "tipton",
    "walsall",
    "wednesbury",
    "west bromwich",
    "wolverhampton",
  ],
  Worcestershire: [
    "bayton",
    "bewdley",
    "bromsgrove",
    "droitwich",
    "droitwich spa",
    "evesham",
    "kidderminster",
    "malvern",
    "pershore",
    "redditch",
    "stourport-on-severn",
    "upton upon severn",
    "upton-upon-severn",
    "worcester",
  ],
  "Warwickshire & Coventry": [
    "bedworth",
    "coventry",
    "kenilworth",
    "leamington spa",
    "nuneaton",
    "royal leamington spa",
    "rugby",
    "stratford upon avon",
    "stratford-upon-avon",
    "warwick",
  ],
  Staffordshire: [
    "burntwood",
    "burton on trent",
    "burton upon trent",
    "cannock",
    "lichfield",
    "rugeley",
    "stafford",
    "stoke-on-trent",
    "tamworth",
  ],
  "Teesside & North East": [
    "darlington",
    "hartlepool",
    "middlesbrough",
    "nunthorpe",
    "redcar",
    "stockton on tees",
    "stockton-on-tees",
    "yarm",
  ],
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  extensions: "Extension",
  "loft conversions": "Loft Conversion",
  "new homes": "New Home",
  hmos: "HMO",
  "planning permissions": "Planning Permission",
};

function normalise(value: string) {
  return value
    .toLocaleLowerCase("en-GB")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function headingId(prefix: string, value: string) {
  const slug = normalise(value).replace(/\s+/g, "-");
  return `${prefix}-${slug || "area"}`;
}

function postcodeNumber(postcodeDistrict: string, area: string) {
  const match = postcodeDistrict
    .toUpperCase()
    .replace(/\s+/g, "")
    .match(new RegExp(`^${area}(\\d{1,2})`));

  return match ? Number(match[1]) : null;
}

function regionForProject(project: PublicProjectDirectoryItem): RegionName {
  const town = normalise(project.townOrCity);

  for (const region of REGION_ORDER) {
    if (region === "Other UK") continue;
    if (REGION_TOWNS[region].includes(town)) return region;
  }

  const district = project.postcodeDistrict.toUpperCase().replace(/\s+/g, "");
  const bNumber = postcodeNumber(district, "B");

  if (bNumber !== null) {
    if (
      (bNumber >= 1 && bNumber <= 48) ||
      (bNumber >= 72 && bNumber <= 76) ||
      (bNumber >= 90 && bNumber <= 94)
    ) {
      return "Birmingham & Solihull";
    }
    if ((bNumber >= 49 && bNumber <= 50) || bNumber === 80 || bNumber === 95) {
      return "Warwickshire & Coventry";
    }
    if ((bNumber >= 60 && bNumber <= 61) || (bNumber >= 96 && bNumber <= 98)) {
      return "Worcestershire";
    }
    if (bNumber >= 62 && bNumber <= 71) return "Black Country";
    if (bNumber >= 77 && bNumber <= 79) return "Staffordshire";
  }

  const wsNumber = postcodeNumber(district, "WS");
  if (wsNumber !== null) return wsNumber <= 10 ? "Black Country" : "Staffordshire";

  const dyNumber = postcodeNumber(district, "DY");
  if (dyNumber !== null) return dyNumber <= 9 ? "Black Country" : "Worcestershire";

  if (district.startsWith("WV")) return "Black Country";
  if (district.startsWith("WR")) return "Worcestershire";
  if (district.startsWith("CV")) return "Warwickshire & Coventry";
  if (district.startsWith("ST") || district.startsWith("DE")) return "Staffordshire";
  if (/^(TS|NE|DL|DH|SR)/.test(district)) return "Teesside & North East";

  return "Other UK";
}

function projectTypeLabel(value: string) {
  return PROJECT_TYPE_LABELS[normalise(value)] ?? value;
}

export function ProjectLocationDirectory({
  projects,
}: {
  projects: PublicProjectDirectoryItem[];
}) {
  if (projects.length === 0) return null;

  const regionalProjects = new Map<
    RegionName,
    Map<string, PublicProjectDirectoryItem[]>
  >();

  for (const project of projects) {
    const region = regionForProject(project);
    const town = project.townOrCity.trim();
    const towns = regionalProjects.get(region) ?? new Map<string, PublicProjectDirectoryItem[]>();
    const townProjects = towns.get(town) ?? [];

    townProjects.push(project);
    towns.set(town, townProjects);
    regionalProjects.set(region, towns);
  }

  return (
    <section className={styles.directorySection} aria-labelledby="project-location-directory-heading">
      <div className="shell">
        <h2 id="project-location-directory-heading" className={styles.directoryHeading}>
          Projects by location
        </h2>

        <div className={styles.directoryRegions}>
          {REGION_ORDER.map((region) => {
            const towns = regionalProjects.get(region);
            if (!towns?.size) return null;

            const regionHeadingId = headingId("project-region", region);
            const sortedTowns = [...towns.entries()].sort(([left], [right]) =>
              left.localeCompare(right, "en-GB", { sensitivity: "base" })
            );

            return (
              <section
                className={styles.directoryRegion}
                aria-labelledby={regionHeadingId}
                key={region}
              >
                <h3 id={regionHeadingId}>{region}</h3>

                <div className={styles.directoryTownColumns}>
                  {sortedTowns.map(([town, townProjects]) => (
                    <div className={styles.directoryTown} key={town}>
                      <h4>{town}</h4>
                      <ul className={styles.directoryList}>
                        {[...townProjects]
                          .sort(
                            (left, right) =>
                              left.projectType.localeCompare(right.projectType, "en-GB", {
                                sensitivity: "base",
                              }) ||
                              left.streetName.localeCompare(right.streetName, "en-GB", {
                                sensitivity: "base",
                              })
                          )
                          .map((project) => (
                            <li key={project.id}>
                              <span className={styles.directoryProjectType}>
                                {projectTypeLabel(project.projectType)}
                              </span>
                              <span className={styles.directorySeparator} aria-hidden="true">
                                —
                              </span>
                              <span className={styles.directoryStreet}>{project.streetName}</span>
                              <span className={styles.directoryPostcode}>
                                , {project.postcodeDistrict}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
