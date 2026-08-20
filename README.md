# ArcAssist-Web Evaluation Artifact

This repository accompanies the paper:

> **ArcAssist-Web: Towards a Logical Reference Architecture for GenAI-Assisted Web Architectural Evolution**  
> Proceedings of the Brazilian Symposium on Multimedia and the Web (WebMedia 2026).

The artifact contains the frozen inputs, generic and configured prompts, three
paired recorded outputs, execution metadata, analysis, and structural
validation scripts used in the paper's illustrative traceability comparison.

## Authors and affiliations

| Author | Unit and institution | Location | Contact |
| --- | --- | --- | --- |
| Vanusa Rodrigues de Oliveira | Institute of Science, Technology and Innovation (ICTIN), Federal University of Lavras (UFLA) | São Sebastião do Paraíso, Minas Gerais, Brazil | [vanusa.oliveira1@estudante.ufla.br](mailto:vanusa.oliveira1@estudante.ufla.br) |
| Bento Rafael Siqueira | Department of Applied Computing (DAC), Federal University of Lavras (UFLA) | Lavras, Minas Gerais, Brazil | [bento.siqueira@ufla.br](mailto:bento.siqueira@ufla.br) |
| Samira Santos da Silva | Institute of Science, Technology and Innovation (ICTIN), Federal University of Lavras (UFLA) | São Sebastião do Paraíso, Minas Gerais, Brazil | [samirasilva@ufla.br](mailto:samirasilva@ufla.br) |
| Johnatan Alves Oliveira | Department of Computer Science (DCC), Federal University of Lavras (UFLA) | Lavras, Minas Gerais, Brazil | [johnatan.oliveira@ufla.br](mailto:johnatan.oliveira@ufla.br) |

## Scope and claim boundaries

The artifact supports inspection of one generic/configured (G/C) comparison
for an adoption-interest evolution concern. It does not claim model
superiority, architectural correctness, reduced effort, generalization,
completed system validation, or a human-subject study.

The six raw model outputs are preserved exactly as recorded and were not
edited for the camera-ready version.

## Repository contents

- \`case/\`: frozen baseline, Web/domain evidence, and evolution concern.
- \`prompts/\`: generic and configured prompt templates.
- \`runs/\`: three paired executions from 2026-06-24, including execution
  envelopes, raw outputs, and structural-validation logs.
- \`analysis/\`: observed structural comparison reported in the paper.
- \`tools/\`: dependency-free Node.js validation and manifest-maintenance
  scripts.
- \`artifact-manifest.json\`: SHA-256 inventory of the public artifact.
- \`CITATION.cff\`: citation metadata for the artifact and associated paper.

## Quick validation

Node.js 20 or newer is required. The artifact has no third-party runtime
dependencies.

\`\`\`sh
npm run validate
\`\`\`

This command verifies:

- the public-file inventory and SHA-256 hashes;
- the three included paired executions;
- the configured Decision Package contract;
- references to the 15 frozen evidence identifiers; and
- release hygiene checks.

To validate one configured output independently:

\`\`\`sh
node tools/validate-run.mjs \
  runs/2026-06-24-formal-01/raw/condition-C.json \
  case/inputs/input-manifest.json
\`\`\`

Repeat the command with \`formal-02\` or \`formal-03\` for the other configured
outputs. See [\`REPRODUCE.md\`](REPRODUCE.md) for the complete inspection guide.

## Reproducibility boundary

This repository preserves the recorded executions and the prompts required to
inspect them. It does not provide an API key, provider configuration, or
provider-side system settings that were unavailable to the authors.
Consequently, the artifact does not claim deterministic re-execution.

The observed differences concern traceability, explicit assumptions,
instruction conformance, and inspectability under the complete G/C
configuration. They do not establish a causal condition effect.

## Citation

Use [\`CITATION.cff\`](CITATION.cff) to cite the artifact and its associated
paper. The GitHub **Cite this repository** function will read this metadata
automatically.

## License

The original anonymous artifact did not include a license. The authors should
add the selected license in a \`LICENSE\` file before granting reuse or
redistribution rights.
