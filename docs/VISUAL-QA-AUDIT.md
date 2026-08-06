# Website-wide visual QA audit

Audit date: 5 August 2026  
Scope: public Hepburn Architects `.co.uk` site, using the local production code and available Sanity/fallback content.  
Automated suite: `tests/visual/site-qa.spec.ts` (`npm run visual:qa`). Screenshots and traces are written to `/tmp/hepburn-visual-qa` and are deliberately not versioned.

## Test matrix

Every representative route was checked at 1440 × 1000 and 390 × 844 for page-level horizontal overflow. The Birmingham page frame was additionally exercised at all required widths: 1600, 1440, 1280, 1180, 1024, 834, 768, 430, 390, 375 and 320 pixels. Targeted interaction and screenshot checks cover the viewports noted below.

| Page type / component | Representative page checked | Viewports | Finding and severity | Responsible source | Fix applied | Manual live check |
|---|---|---:|---|---|---|---|
| Homepage | `/` | 1440, 390, 320 | Orange eyebrow/button contrast (P1); floating call control crowded the 320 px CTA (P1) | Global tokens / mobile call control | Darker accessible orange; compact icon-only call control at ≤360 px | Confirm real production fonts and Sanity imagery |
| Services hub | `/services` | 1440, 390 | Light cards relied on inherited colour (P1 risk) | Shared card CSS | Explicit ink/muted colours and minmax grid tracks | No |
| House Extensions | `/services/house-extensions` | 1440, 390 | Anchor-offset consistency (P1 risk) | Global anchor behaviour | Central header offset and `scroll-margin-top` | Confirm any campaign hash links |
| Planning Applications | `/services/planning-applications` | 1440, 390 | No P0/P1 after shared fixes | Shared service template | Covered by card, focus and spacing fixes | No |
| Building Regulations | `/services/building-regulations` | 1440, 390 | No P0/P1 after shared fixes | Shared service template | Covered by shared fixes | No |
| New-Build Homes | `/services/new-build-homes` | 1440, 390 | No P0/P1 after shared fixes | Shared service template | Covered by shared fixes | No |
| Loft Conversions | `/services/loft-conversions` | 1440, 390 | No P0/P1 after shared fixes | Shared service template | Covered by shared fixes | No |
| HMO Conversions | `/services/hmo-conversions` | 1440, 390 | No P0/P1 after shared fixes | Shared service template | Covered by shared fixes | No |
| Change of Use | No public route in current service configuration | — | Inventory gap, not a visual defect | Route/content configuration | No page created, in accordance with scope | Recheck if route is published later |
| Small Sites / Backland | No public route in current service configuration | — | Inventory gap, not a visual defect | Route/content configuration | No page created, in accordance with scope | Recheck if route is published later |
| Birmingham cornerstone | `/locations/birmingham-architects` | all 11 widths | Horizontally clipped sub-nav needed QA distinction; anchor/header risk (P1) | Page sub-nav / shared anchor CSS | Kept intentional internal scrolling, removed page overflow, standardised offset; explicit light-card colours already retained | Check live review/project data variants |
| Four Oaks | `/locations/four-oaks-architects` | 1440, 390 | No P0/P1 | Bespoke location template | Shared colour, focus and spacing fixes | No |
| Little Aston | `/locations/little-aston-architects` | 1440, 390 | No P0/P1 | Bespoke location template | Shared colour, focus and spacing fixes | No |
| Sutton Coldfield | `/locations/sutton-coldfield-architects` | 1440, 390 | CTA was a false positive when tested against its parent surface | Contrast test implementation | Test now evaluates each control's own painted background | No |
| Solihull | `/locations/solihull-architects` | 1440, 390 | No P0/P1 | Location template | Shared fixes | No |
| Harborne | `/locations/harborne-architects` | 1440, 390 | No P0/P1 | Dynamic location template | Shared fixes | No |
| Other dynamic location | `/locations/moseley-architects` | 1440, 390 | No P0/P1 | Dynamic location template | Shared fixes | No |
| Projects index | `/projects` | 1440, 390 | Legacy fallback images could return 403 (P1) | Project image helper | Broken retired `.com` assets now use the neutral branded fallback during a Sanity outage | Check all live Sanity image focal points |
| Basic project | `/projects/passive-house-solihull` | 1440, 390 | Retired WordPress fallback image returned 403 (P1) | Project image helper | Safe branded missing-image fallback | Replace legacy fallback with an approved project image when available |
| Gallery project | `/projects/house-extension-in-harborne-birmingham` | 1440, 390 | Restored layout, gallery order and proportions intact | Project template | No redesign; portable-text typing tightened only | Check portrait gallery assets on live data |
| Knowledge Centre hub | `/knowledge-centre` | 1440, 390 | Light-card inheritance risk (P1) | Shared content-card CSS | Explicit ink/muted colours | No |
| Planning Permission guide | `/knowledge-centre/planning-permission` | 1440, 390 | CTA/resources/FAQ readable; anchor offset standardised | Article/shared CSS | Shared light-surface and focus rules | No |
| Building Regulations guide | `/knowledge-centre/building-regulations` | 1440, 390 | No P0/P1 | Article template | Shared fixes | No |
| House Extension Costs | `/knowledge-centre/house-extension-costs` | 1440, 390 | No P0/P1 | Article template | Shared fixes | No |
| Journal hub | `/blog` | 1440, 390 | No P0/P1 | Journal cards | Shared light-card fixes | No |
| Journal article | `/journal/how-to-choose-the-best-architect-in-birmingham` | 1440, 390 | No P0/P1 | Article template | Shared focus/anchor rules | No |
| Reviews | `/reviews` | 1440, 390 | Natural-height and empty/low-count rendering retained | Review system | Contrast test includes review surfaces; no placeholders added | Recheck once more than 12 approved reviews are live |
| Fee Calculator | `/estimate` | 1440, 390 | Grid children and controls could overflow narrow columns (P1 risk); placeholders faint (P2) | Shared fee/form CSS | `minmax(0,…)`, `min-width:0`, explicit input/placeholder colours | Complete a production submission after deploy |
| House Extension Guide | `/house-extension-guide` | 1440, 390 | Hidden honeypot triggered false overflow; page lacked skip link (P2) | Guide layout / test | Hidden anti-spam control correctly excluded; skip link and focus target added | Complete a production submission after deploy |
| Studio / About | `/about` | 1440, 390 | No P0/P1 | Shared page layout | Shared fixes | No |
| Contact | `/contact` | 1440, 390 | Form min-width/placeholder/readability risk (P1/P2) | Shared form CSS | Explicit widths, foreground and placeholder colour | Complete a production submission after deploy |
| Privacy | `/privacy` | 1440, 390 | No P0/P1 | Content template | Shared heading/focus rules | No |
| Footer | all representative routes | all 11 widths on Birmingham | Muted copy/legal contrast and focus visibility (P1/P2) | Shared footer CSS | Raised text opacity, accessible orange heading, visible focus; existing simplified link structure preserved | Check external social URLs |
| Desktop header | Birmingham plus representative routes | 1600–1024 | Navigation crowded before old 950 px switch point (P1) | Header/shared CSS | Mobile navigation now takes over at 1180 px; text is not shrunk | No |
| Mobile menu | `/` | 834–320, targeted at 390 | Needed scroll lock and a focus loop (P1) | `Header` | Body scroll lock, Escape/focus return, focus loop, 44 px button and viewport scrolling | Test landscape on physical iOS Safari |
| Chatbot | representative pages | 390, 320 | Potential collision considered with bottom controls | Existing chatbot CSS | 320 px call control compacted; no chatbot redesign | Check with real opened chat on iOS keyboard |
| Cookie consent | `/` | 390 | Dark-panel accent/body contrast and border visibility (P1/P2) | Conversion tracking CSS | Lighter dark-surface accent, stronger body/border contrast, accessible accept colour | Verify first-visit production state |

## Findings by severity

### P0

No P0 issues were found in the representative public routes.

### P1 fixed

- Orange text and orange buttons on cream did not meet the intended AA contrast. The brand orange was darkened from `#d85f2a` to `#b94718` (4.60:1 on cream and 5.28:1 with white button text). A separate lighter orange is used for small accents on charcoal.
- Shared cream/paper cards now establish ink headings and muted body copy instead of inheriting a dark section's white text.
- The sticky header and hash targets use one responsive offset. Direct hash loading and three representative anchor routes are tested.
- Desktop navigation changes to the mobile menu before the links crowd at narrow-laptop widths.
- Fee/contact layouts can shrink below their content width without creating page overflow.
- The mobile menu locks background scrolling, retains keyboard focus, closes on Escape and returns focus to its trigger.
- At 320–360 px the floating telephone control becomes icon-only, avoiding CTA overlap while retaining its accessible name.
- Retired `.com` WordPress fallback project images no longer render broken requests during a Sanity outage.

### P2 fixed

- Section padding now uses one responsive token rather than a desktop fixed value plus isolated overrides.
- Mobile H1/H2 sizing uses fluid clamps and balanced wrapping.
- Footer body/legal text and focus indicators are stronger.
- Form placeholders have an explicit readable colour.
- Grid columns use `minmax(0, …)` where content could otherwise force overflow.
- Confirmed unused icon/import code was removed while enabling repository linting.

## Automated coverage and limitations

The Playwright suite checks the route matrix at desktop and mobile for document overflow and escaped elements, all requested widths for the page frame, representative direct hash navigation, mobile menu keyboard behaviour, an FAQ open state, review/calculator visibility, and inherited low-contrast text on major light card surfaces. It also produces six full-page screenshots for manual inspection.

It intentionally does not use brittle pixel-diff assertions because there is no approved baseline. It cannot prove photographic focal-point quality, third-party Calendly/chat behaviour, production form delivery, physical-device browser chrome behaviour or every future Sanity content combination. Those items remain in the manual column above.

## Regression safeguards

- Run `npm run visual:qa` against a local server on port 3002 (or set `VISUAL_QA_BASE_URL`).
- Keep screenshots outside the repository; review `/tmp/hepburn-visual-qa` after material visual changes.
- When introducing a light card inside a dark section, explicitly set its foreground and descendant text colours.
- Add new public page types to the route matrix rather than relying only on a homepage screenshot.
- Replace a legacy project fallback with an approved, correctly attributed image when the related Sanity project is updated.
