# Imbra site structure and customer journeys

**Status:** approved planning baseline  
**Scope:** Task #119  
**Date:** 2026-09-19

## Objective

A prospective customer can land on a page about a concrete problem, understand
whether Imbra can help, see credible evidence, and find a clear route to a free
assessment.

The site should lead with customer problems and outcomes. Technologies and
service capabilities support that explanation; they are not the primary
navigation model.

## Navigation and page map

The primary navigation is:

**Solutions · Cases · Blog · Pricing · Book a call**

The logo links to the home page. **Book a call** is the short navigation label
for the free assessment conversation. The booking page explains that the call
lets both parties discuss the problem, expectations and suitability; detailed
technical investigation remains separately scoped and paid.

| Area | Canonical path | Purpose | Launch rule |
| --- | --- | --- | --- |
| Home | `/` | Concise company overview, service pillars, selected problems, process, evidence and contact | Always |
| Solutions | `/solutions/` | Index of customer problems grouped by service pillar | Launch with the first approved solution |
| Solution | `/solutions/<problem>/` | Commercial landing page for one distinct problem | Each page requires approved copy and evidence status |
| Cases | `/cases/` and `/cases/<case>/` | Evidence from publishable real work | Do not expose an empty index |
| Blog | `/blog/` and `/blog/<article>/` | Technical answers supporting solution pages | Expose when the first article is approved |
| Pricing | `/pricing/` | Existing rate ladder and engagement rules | Preserve the existing canonical URL |
| Book a call | `/book/` | Free-assessment explanation and scheduling link | Activate after provider details are configured |
| About | `/about/` | Company/founder background and full research publication list | Link from the footer, not primary navigation |

Use one canonical problem-page family. Do not duplicate the same content under
`/use-cases/`, protocol-specific variants or location-specific landing pages.
Do not show empty sections or dead links. Until booking is configured, the
existing contact form and email remain the next step.

The three service pillars remain:

1. Industrial Communication & Testing
2. OT/IT Integration
3. Historization & Data Infrastructure

Capabilities such as PLC work, refactoring, support, DevOps and maintenance sit
under the relevant pillar. The future AI consultancy direction is not implied
by this document and must be agreed separately with the positioning work.

## First solution pages

These short names are for navigation and cards. The supporting copy and
descriptive URLs explain the exact customer problem.

### Communication troubleshooting

- **Path:** `/solutions/industrial-communication-troubleshooting/`
- **Audience:** Device vendors, integrators and engineering teams facing
  intermittent failures.
- **Problem:** Timeouts, disconnects or inconsistent protocol behaviour with no
  clear cause.
- **Customer question:** Why does communication keep failing, and how can we
  reproduce it?
- **Approach:** Review symptoms and constraints, agree any paid investigation,
  reproduce the failure and narrow the fault across software, configuration and
  the relevant interface.
- **Potential deliverables:** Reproducible test, findings, prioritised
  corrective actions and agreed validation.
- **Example status:** An intermittent Modbus timeout reproduced with a test
  harness is an illustrative scenario until attributable evidence is verified.
- **Boundary:** Do not promise remote wiring repair, protocol certification or
  zero downtime.
- **Pillar:** Industrial Communication & Testing.

### Historian integration

- **Path:** `/solutions/plc-laboratory-historian-integration/`
- **Audience:** Plants, integrators and data/platform owners with disconnected
  operational or laboratory data.
- **Problem:** Data is transferred manually or arrives incomplete, duplicated or
  with inconsistent timestamps.
- **Customer question:** How can we reliably get PLC or laboratory data into our
  historian?
- **Approach:** Agree source and target interfaces, mappings, timestamps and
  failure handling; implement and validate an agreed data path.
- **Potential deliverables:** Integration component, mapping specification,
  validation evidence and operating guidance.
- **Example status:** Laboratory measurement files mapped into a historian with
  traceable processing is illustrative until a publishable real case is
  confirmed.
- **Boundary:** Do not claim compatibility with every system or include
  third-party licences in the engineering rate.
- **Pillars:** OT/IT Integration; Historization & Data Infrastructure.
- **Note:** Keep PLC and laboratory integration on one page initially. Split
  them only when their customer intent and content are materially different.

### Protocol testing

- **Path:** `/solutions/industrial-protocol-testing/`
- **Audience:** Device/firmware vendors and software teams.
- **Problem:** Manual tests and scarce hardware limit repeatable regression and
  fault testing.
- **Customer question:** How can we test protocol behaviour before all hardware
  is available?
- **Approach:** Agree the protocol subset and behaviours; use simulation or
  test doubles where suitable, exercise failure paths and integrate repeatable
  tests.
- **Potential deliverables:** Test harness, agreed scenarios, reproducible
  results and instructions.
- **Example status:** Simulated endpoints exercising timeout, malformed-response
  and reconnect behaviour are illustrative until attributable evidence is
  verified.
- **Boundary:** Simulation complements hardware testing; it does not prove full
  hardware compatibility or formal certification.
- **Pillar:** Industrial Communication & Testing.
- **Distinction:** This page is about prevention and repeatable testing;
  Communication troubleshooting is about diagnosing an existing failure.

The next candidate is legacy historian maintenance and modernisation. It is not
part of the initial three-page scope.

## Shared solution-page contract

Every solution page must contain:

1. A clear problem statement and intended audience.
2. Recognisable symptoms and business impact without invented metrics.
3. The relevant systems, protocols and approach.
4. A concrete example labelled as one of:
   - an Imbra engagement;
   - the founder's prior professional experience; or
   - an illustrative scenario.
5. Expected deliverables and scope boundaries.
6. Relevant evidence, articles and a pricing link.
7. A free-assessment call to action and an email alternative.

Client identities, details and measurable outcomes require a verified basis and
permission to publish. A hypothetical example must never be presented as a
client result.

Cases provide attributable context, intervention and verified outcome. Blog
articles answer narrower technical questions. Neither should duplicate the
solution landing page.

## Customer journeys

### Search or direct referral

`Search/referral → Solution → Evidence or example → Book a call/contact`

### Technical article

`Blog article → Related solution → Pricing → Book a call/contact`

### Homepage

`Home → Solutions → Relevant problem → Book a call/contact`

Every initial solution must be reachable from the homepage within two
navigation steps and must offer a visible next step without requiring a return
to the homepage.

## Research and About

The full publication list moves from the homepage to `/about/`, linked from
the footer. Preserve publication and DOI links. Relevant publications may be
linked from solution pages where they substantiate expertise.

Before removing the homepage research section, inventory any existing anchors
and define their destination or migration handling. Do not leave a dead
navigation target.

## Content model and authoring

The current site keeps editable copy in `src/data/` and renders static Astro
pages. The implementation task must define how the new solution, case and blog
records represent at least:

- title, slug and summary;
- audience and problem;
- service pillar;
- page type;
- metadata and canonical path;
- evidence type and publication status;
- related solutions, cases and articles;
- draft/published status.

The initial implementation should preserve the current editable-content
convention unless a deliberate architecture decision approves another format.
Do not silently migrate to `src/content/` or introduce a CMS. Draft records
must not appear in production navigation or the sitemap.

### Decision for solutions (#120)

Solution records live in `src/data/solutions.json`, one record per problem.
`src/pages/solutions/[slug].astro` renders each record and
`src/pages/solutions/index.astro` lists them by pillar.

| Required field | Representation |
| --- | --- |
| Title, slug and summary | `title` (cards, breadcrumb), `slug`, `summary` (index card and meta description) |
| Audience and problem | `heading`, `headingStrong`, `intro`, `symptoms`, `impact` |
| Service pillar | `pillars`: ids defined in `services.json`, never redefined |
| Page type | Implied by the file. Cases and articles get their own model |
| Metadata and canonical path | `metaTitle` for the browser title, canonical from the path, BreadcrumbList structured data |
| Evidence type | `example.evidence` and `experience.evidence`: `engagement`, `founder` or `illustrative`, labelled from `evidence` |
| Related solutions, cases, articles | Not modelled yet. Add when the first case or article exists |
| Draft/published status | None. A page in progress stays on its branch until approved, so nothing unpublished reaches `main`, the nav or the sitemap |

Page content also carries `systems`, `approach`, `deliverables` and
`boundaries`. The blog format is decided separately in #121.

## Search handoff

Task #123 owns technical SEO/AEO/GEO implementation. This document supplies
unique page purposes, canonical paths, editorial search questions and internal
link relationships. Search questions are editorial hypotheses, not verified
keyword-volume claims.

The implementation should provide useful, direct answers and concrete
examples. It should not promise rankings, AI citations or rich results.

## Handoffs

- **#120 Solutions:** Implement the approved solution template and the initial
  three pages.
- **#121 Blog:** Propose articles tied to the initial solution pages; avoid
  competing landing pages.
- **#122 Booking:** Configure the free-assessment booking page and provider.
- **#123 Search:** Add metadata, structured data, sitemap and measurement after
  the page model is agreed.
- **#118 and #111–#114 Pricing:** Keep commercial wording and capacity rules
  consistent with the pages.

This document defines the plan only. Page implementation, publishing cases or
articles, provider-account setup, pricing changes and release automation are
separate tasks.
