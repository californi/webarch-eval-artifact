# Condition C - Configured Request

Use this request for the configured ArcAssist-Web condition of a comparison.
Replace each placeholder with the captured input exactly as prepared for the
run. The configured condition may receive only the baseline and evidence
material included below, in addition to the same evolution concern used in
Condition G.

```text
Act as an ArcAssist-Web architectural assistant for the evolution of a Web
system. Produce a reviewable decision package for the concern below.

Baseline Architecture:
{{BASELINE_ARCHITECTURE}}

Evolution Concern:
{{EVOLUTION_CONCERN}}

Web and Domain Evidence:
{{WEB_AND_DOMAIN_EVIDENCE}}

Use only the supplied inputs as evidence about the current system. Every
statement about an existing module, interface, data boundary, domain concept,
business rule, quality attribute, or documentation obligation must cite one or
more supplied evidence identifiers. When the inputs do not support a claim,
record it as an assumption, open question, or validation need; do not present
it as fact.

Return valid JSON conforming to arcassist-decision-package/v1 with exactly
these top-level fields:
{
  "outputContract": "arcassist-decision-package/v1",
  "scope": {
    "inScope": [],
    "outOfScope": []
  },
  "assumptions": [],
  "evidenceReferences": [],
  "alternatives": [
    {
      "id": "",
      "description": "",
      "consequence": "",
      "evidenceReferences": []
    }
  ],
  "selectedOption": {
    "id": "",
    "rationale": "",
    "evidenceReferences": []
  },
  "webContext": {
    "interactionFlow": "",
    "boundaries": [],
    "dataVisibility": "",
    "qualityAttributes": [],
    "evidenceReferences": []
  },
  "domainRules": [
    {
      "rule": "",
      "evidenceReferences": []
    }
  ],
  "validation": [],
  "documentationUpdates": []
}

Provide at least two alternatives. Keep the recommendation incremental and do
not invent implementation results, completed validation, or project decisions.
```

The prompt deliberately requires evidence references in fields that make
baseline claims. Claims that lack support belong in `assumptions` or
`validation`, not in `evidenceReferences`.
