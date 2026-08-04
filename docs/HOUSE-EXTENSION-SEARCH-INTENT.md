# House Extension Search Intent

## Commercial cornerstone

`/services/house-extensions` is the single canonical commercial page for homeowners comparing architects and preparing to appoint a practice. It targets house extension architects and architectural services in Birmingham and the West Midlands, including feasibility, concept design, planning applications and Building Regulations drawings.

The page has a self-referencing canonical, visible `Home → Services → House Extensions` breadcrumbs, Service schema and FAQ schema for the questions visibly rendered on the page.

## Supporting informational pages

| Page | Primary intent | Internal-link direction |
| --- | --- | --- |
| `/knowledge-centre/house-extension-costs` | Understand the factors that influence extension budgets | Links to `/services/house-extensions` and `/estimate` |
| `/knowledge-centre/extension-planning-permission` | Understand planning permission, permitted development and prior approval | Links to `/services/house-extensions` and `/services/planning-applications` |
| `/knowledge-centre/house-extension-ideas` | Explore design approaches for light, space and everyday living | Links to `/services/house-extensions` and `/house-extension-guide` |
| `/knowledge-centre/house-extension-timeline` | Understand the design, approval and construction sequence | Links to `/services/house-extensions` |
| `/knowledge-centre/building-regulations` | Understand technical approval and Building Regulations | Links to `/services/house-extensions` and `/services/building-regulations` |
| `/house-extension-guide` | Download a practical homeowner guide | Links back to the commercial service and enquiry routes |
| `/journal/house-extension-planning-permission-birmingham-2026-guide` | Research Birmingham-specific planning considerations | Links to `/services/house-extensions`, `/services/planning-applications` and Birmingham location guidance |

These pages retain specific informational H1s and do not duplicate the commercial cornerstone title or H1.

## Redirect and canonical structure

The former `/knowledge-centre/house-extensions` route is permanently redirected server-side to `/services/house-extensions` in `next.config.ts`. It is excluded from `app/sitemap.ts`. The only remaining repository reference is the intentional redirect source.

All commercial internal links now point directly to `/services/house-extensions`; supporting guides remain in the Knowledge Centre and link towards the service page with varied descriptive anchors.
