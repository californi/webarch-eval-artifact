# Inspecting the Recorded Comparison

## Requirement

- Node.js 20 or newer.

## Validate the Artifact

Run npm run validate.

The command verifies the public-file inventory, SHA-256 manifest, configured
Decision Package contract, and references to frozen evidence identifiers.

## Inspect the Conditions

Both conditions use case/inputs/evolution-concern.md. Condition G receives only
that concern through prompts/condition-g-generic-request.md. Condition C
receives the frozen evidence described by
prompts/condition-c-configured-request.md. The three recorded pairs and their
structural-validation logs are under runs/.

The artifact preserves recorded executions. It does not provide an API key,
provider configuration, or enough provider-side settings to claim deterministic
re-execution.
