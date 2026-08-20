# Curated Source-Evidence Dossier

This dossier provides bounded excerpts supporting the factual inputs used in
the adoption-interest comparison. It intentionally omits the production
repository and commits because the evaluation depends only on the frozen
evidence items listed here.

## B1: Web and API Structure

The baseline is a simple monorepo with a Next.js/PWA Web application, a NestJS
API, and shared domain, UI, and infrastructure packages.

## B2: Current Iteration Scope

The current iteration provides public Animal listing/detail, basic
administrative registration and status changes, and an initial Animals API.
Authentication and the complete adoption process are outside this iteration.

## B3 and B4: Animal Status Vocabulary and Gap

The implemented status vocabulary is `AVAILABLE`, `IN_TREATMENT`,
`IN_ADOPTION_PROCESS`, and `ADOPTED`. The current domain implementation accepts
an enum status update but does not encode a policy of permitted transitions.

## B5 and B6: Existing Web/API Boundary

The public Animal detail page includes a future-oriented interest link but no
implemented interest form. The current API exposes Animals listing, retrieval,
creation, update, status update, and deletion; it has no adoption-interest
endpoint.

## B7: Planned Concepts

The initial domain diagram marks `Adoptant` and `AdoptionInterest` as future
concepts related to `Animal`.

## W1 and W2: Architecture and Documentation Decisions

Interface, application, domain, and infrastructure responsibilities are
separate, and domain entities are framework-independent. Relevant architectural
changes require versioned decisions, diagrams, and reusable prompts.

## W3 and W4: Increment and Web Gap

Interest registration, adopter registration, and initial screening are planned
for a later adoption increment. The current baseline contains public Animal
data but no applicant-data model or staff-review UI/API.

## S1--S3 and Q1: Study Inputs

The study constrains the proposed increment to initial interest only. Any
introduced applicant data must stay outside public Animal responses, and a
proposal must expose rather than assume a status-transition policy. Consent,
retention, duplicate-interest, and privacy checks are open validation matters.
