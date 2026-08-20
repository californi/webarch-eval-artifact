# ArcAssist-Web Evaluation Artifact

This repository accompanies the paper *ArcAssist-Web: Towards a Logical
Reference Architecture for GenAI-Assisted Web Architectural Evolution*. It
contains the frozen inputs, generic and configured prompts, three paired
recorded outputs, execution metadata, analysis, and structural validation
scripts used for the paper's illustrative comparison.

## Authors

- Vanusa Rodrigues de Oliveira
- Bento Rafael Siqueira
- Samira Santos da Silva
- Johnatan Alves Oliveira

All authors are affiliated with the Universidade Federal de Lavras (UFLA),
Lavras, Minas Gerais, Brazil.

## Scope and Claim Boundaries

The artifact supports inspection of one generic/configured (G/C) comparison
for the adoption-interest concern. It does not claim model superiority,
architectural correctness, reduced effort, generalization, completed system
validation, or a human-subject study. The raw model outputs are preserved
without camera-ready editing.

## Contents

- \`case/\`: frozen baseline, Web/domain evidence, and evolution concern.
- \`prompts/\`: reusable generic and configured prompt templates.
- \`runs/\`: three recorded G/C pairs from 2026-06-24, execution envelopes,
  raw outputs, and structural-validation logs.
- \`analysis/\`: the observed structural comparison reported in the paper.
- \`tools/\`: dependency-free Node.js validators and manifest maintenance.
- \`artifact-manifest.json\`: SHA-256 inventory of the public artifact.

## Quick Validation

Node.js 20 or newer is required. No third-party packages are needed.

\`\`\`sh
npm run validate
\`\`\`

The command verifies the public-file inventory, SHA-256 hashes, configured
Decision Package contract, evidence identifiers, and release hygiene. See
[\`REPRODUCE.md\`](REPRODUCE.md) for a guided inspection.

## Reproducibility Boundary

The repository preserves recorded executions and the prompts needed to inspect
them. It does not include an API key, provider configuration, or unavailable
provider-side settings; consequently, it does not claim deterministic
re-execution.

## Citation

Citation metadata for the artifact and the associated paper title is provided
in [\`CITATION.cff\`](CITATION.cff).

## License Status

The supplied anonymous archive did not contain a license, so this camera-ready
package does not assign one. The authors should add their chosen license before
publication if reuse or redistribution rights are intended.
