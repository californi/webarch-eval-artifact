# Anonymous Evaluation Artifact for ArcAssist-Web

This artifact supports the illustrative traceability comparison reported in
the ArcAssist-Web short paper. It contains frozen inputs, the generic and
configured prompts, three paired recorded outputs, execution metadata, and
structural validation scripts.

The artifact supports inspection of a single G/C configuration for the
adoption-interest concern. It does not claim model superiority, architectural
correctness, reduced effort, generalization, completed system validation, or a
human-subject study.

## Contents

- case: sanitized baseline, Web/domain evidence, and the evolution concern.
- prompts: reusable generic and configured prompt templates.
- runs: three recorded G/C pairs, envelopes, and structural-validation logs.
- analysis: the observed structural comparison used by the paper.
- tools: Node.js validators for integrity and anonymity checks.

Run npm run validate with Node.js 20 or newer to validate hashes, configured
output structure, evidence identifiers, and the public-file inventory.
