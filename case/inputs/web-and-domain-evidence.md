# Web and Domain Evidence

Condition C receives the evidence below in addition to the frozen Evolution
Concern and Baseline Architecture Facts. The categories distinguish facts from
study constraints and open questions.

## Existing Evidence

- **W1 -- Layer separation.** Interface, application, domain, and
  infrastructure have distinct responsibilities; domain entities remain
  independent of Next.js, NestJS, and Prisma. Source:
  `docs/07-decisoes-arquiteturais/ADR-002-separacao-front-back-dominio-infra.md`.
- **W2 -- Documentation obligation.** Relevant architectural changes require
  versioned ADRs, diagrams, and reusable prompts. Source:
  `docs/07-decisoes-arquiteturais/ADR-003-documentacao-versionada-adrs-mermaid-prompts.md`.
- **W3 -- Planned increment.** The backlog places interest registration,
  adopter registration, and initial screening in the adoption prototype, after
  the current Animals-only iteration. Source: `docs/03-backlog-incremental.md`.
- **W4 -- Public/private boundary is currently absent.** The current detail
  page provides public Animal data, but no applicant-data model or staff-review
  UI/API exists. Sources: `apps/web/src/app/animais/[id]/page.tsx`,
  `apps/api/src/animals/animals.controller.ts`, and
  `packages/domain/src/animal.ts`.

## Study Constraints

- **S1 -- Incremental scope.** The proposed change must register only initial
  interest. It must not implement screening, authentication, automatic
  approval, or a complete adoption process.
- **S2 -- Review boundary.** Applicant contact data, if introduced, must not
  be returned by public animal-profile responses; later staff handling is a
  required concern, not an implemented feature.
- **S3 -- Status decision boundary.** A proposed solution must identify how
  it uses `AVAILABLE` and whether it needs a new explicit transition policy;
  it must not present an unimplemented transition rule as a current fact.

## Open Validation Questions

- **Q1.** What consent, field-validation, and data-retention requirements are
  needed for applicant data?
- **Q2.** What duplicate-interest policy is appropriate?
- **Q3.** Should submitting interest affect Animal status, and, if so, which
  transition rule and staff authority will be documented?
- **Q4.** Which public API and repository tests demonstrate that applicant data
  cannot leak through animal-profile responses?
