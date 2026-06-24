# Baseline Architecture Facts

The following statements are the only current-system baseline facts supplied
to Condition C. Each statement uses a stable evidence identifier.

- **B1 -- Web and API structure.** The monorepo has a Next.js/PWA Web
  application in `apps/web`, a NestJS API in `apps/api`, and shared domain,
  UI, and infrastructure packages. Source: `docs/02-arquitetura.md`.
- **B2 -- Current iteration scope.** The first iteration includes public
  animal listing/detail, basic administrative animal registration and status
  changes, and an initial Animals API. Authentication and the complete
  adoption process are out of scope. Source: `docs/01-escopo-funcional.md`.
- **B3 -- Implemented Animal status vocabulary.** The domain enum includes
  `AVAILABLE`, `IN_TREATMENT`, `IN_ADOPTION_PROCESS`, and `ADOPTED`.
  Source: `packages/domain/src/animal.ts`.
- **B4 -- Current status-policy gap.** `Animal.changeStatus` delegates to
  `update` and the current domain code does not encode permitted status
  transitions. Source: `packages/domain/src/animal.ts`.
- **B5 -- Current public detail interaction.** The public animal detail page
  renders an animal profile and a `Tenho interesse` link targeting
  `#interesse-futuro`; it has no implemented interest form. Source:
  `apps/web/src/app/animais/[id]/page.tsx`.
- **B6 -- Current API boundary.** The API controller exposes Animals listing,
  retrieval, creation, update, status update, and deletion endpoints. It has
  no adoption-interest endpoint. Source:
  `apps/api/src/animals/animals.controller.ts`.
- **B7 -- Planned, not implemented, concepts.** The initial domain diagram
  labels `Adoptant` and `AdoptionInterest` as future concepts planned in
  relation to `Animal`. Source: `diagrams/modelo-dominio-inicial.mmd`.

## Known Baseline Gaps

The supplied sources do not define an adoption-interest data model, applicant
data-retention policy, duplicate-interest policy, staff-review interface,
authentication mechanism, or permitted Animal status-transition policy. These
are not current-system facts.
