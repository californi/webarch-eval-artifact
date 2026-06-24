# ArcAssist-Web Comparison Capture Protocol

## Purpose

This protocol captures a reusable, illustrative comparison between generic
assistance (Condition G) and configured ArcAssist-Web assistance (Condition C)
for one Web evolution concern. It records outputs for review; it does not
establish correctness, model superiority, effort reduction, or production
readiness.

## Prepare One Run

1. Assign a `runId` and record the date, agent or model identifier, interface,
   temperature or equivalent generation controls, and any tool availability.
2. Write one neutral `EVOLUTION_CONCERN` value. Do not name a preferred module,
   solution, endpoint, rule, or outcome unless that information is intrinsic to
   the concern being evaluated.
3. Prepare `BASELINE_ARCHITECTURE` and `WEB_AND_DOMAIN_EVIDENCE` for Condition
   C using the formats in `prompt-variable-manifest.json`. Give every evidence
   item a stable identifier and source locator.
4. Freeze the three substituted values before either condition is executed.
   The concern must be byte-for-byte identical in both conditions.

## Execute Conditions

1. Run `condition-g-generic-request.md` with only `EVOLUTION_CONCERN`.
2. Run `condition-c-configured-request.md` with the frozen baseline, concern,
   and evidence values.
3. Use the same agent or model family and generation settings for both runs
   whenever the environment permits. Record any difference rather than hiding
   it.
4. Do not provide repository browsing, source excerpts, attached documents,
   prior outputs, or unstated project knowledge to Condition G.
5. Do not provide Condition C with evidence beyond the two configured
   placeholders. Do not add explanations after substitution.

## Capture Record

Store a separate JSON or Markdown record for each condition containing:

- `runId`, condition identifier, timestamp, agent or model identifier, and
  generation controls.
- The complete rendered prompt, including every substituted value.
- The raw response exactly as received, without cleanup, correction, or
  selective quotation.
- For Condition C, the evidence identifiers and source locators supplied to
  the run.
- Parse or validation errors, refusals, truncation, retries, and any manual
  intervention.

Keep failed or malformed responses. A repair prompt, re-run, or reviewer edit
is a new captured attempt and must not replace the original output.

## Claim Discipline

- A factual claim about the current system is supported only when the supplied
  baseline or evidence explicitly supports it.
- In Condition C, record the evidence identifier beside each baseline claim;
  an empty evidence reference does not support a claim.
- In Condition G, treat all statements about the current system as assumptions
  unless the evolution concern itself supplies the fact.
- Distinguish evidence-backed facts, recommendations, assumptions, open
  questions, and validation proposals. Do not upgrade one category into
  another during transcription or analysis.
- Do not add a claim from repository knowledge, the operator's memory, a prior
  run, or a later implementation result.
- Do not report an observed benefit unless it is directly visible in the
  captured outputs and described narrowly. Do not infer architectural
  correctness, causality, generalization, or superiority from one comparison.

## Compare and Report

Review the captured outputs against the same criteria: baseline alignment, Web
context, domain-rule handling, traceability, and readiness for human review.
Report missing information and invalid evidence references as findings. State
the comparison's controls, variations, and limitations alongside any observed
differences.
