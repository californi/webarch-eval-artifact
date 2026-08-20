# Inspecting the Recorded Comparison

## Requirements

- Node.js 20 or newer.
- No external npm dependencies.

## Validate the Artifact

\`\`\`sh
npm run validate
\`\`\`

The command verifies the public-file inventory, SHA-256 manifest, configured
Decision Package contract, references to frozen evidence identifiers, and
release hygiene.

## Inspect the Conditions

Both conditions use \`case/inputs/evolution-concern.md\`. Condition G receives
only that concern through
\`prompts/condition-g-generic-request.md\`. Condition C receives the frozen
baseline and evidence through
\`prompts/condition-c-configured-request.md\`. The three recorded pairs and
their structural-validation logs are under \`runs/\`.

To validate one configured output independently:

\`\`\`sh
node tools/validate-run.mjs \
  runs/2026-06-24-formal-01/raw/condition-C.json \
  case/inputs/input-manifest.json
\`\`\`

Repeat the command with \`formal-02\` or \`formal-03\` to inspect the other
configured outputs. Compare those files with the corresponding
\`condition-G.md\` files and with
\`analysis/observed-structural-comparison.md\`.

## Verify the Frozen Records

\`runs/run-index.json\` records the common requested configuration, the three
included pairs, the excluded pilot, and the SHA-256 hashes of the prompts and
outputs. \`artifact-manifest.json\` covers every public file other than the
manifest itself.

The artifact preserves recorded executions. It does not provide an API key,
provider configuration, or enough provider-side settings to claim deterministic
re-execution.
