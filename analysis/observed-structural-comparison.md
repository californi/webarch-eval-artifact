# Observed Structural Comparison

Three paired executions used the same frozen Evolution Concern, requested
model, requested reasoning effort, output language, and tool restriction. The
provider-side system instruction, temperature, seed, and output cap were not
available. Prompts, hashes, outputs, and structural-validation logs are under
runs/.

| Observed artifact characteristic | G across 3 runs | C across 3 runs |
| --- | --- | --- |
| Project evidence supplied | None by protocol | 15 frozen manifest items |
| Project-evidence identifiers in output | 0, 0, 0 | 15, 15, 15 |
| Output contract | Free Markdown | Valid JSON Decision Package in 3/3 runs |
| Explicit alternative set | One proposed change per run; no explicit alternative set | 3, 2, and 3 alternatives, each with a consequence |
| Selected option | No structured selection | A2 in 3/3 runs |
| Validation content | Four generic risk/test suggestions in each run | 6, 7, and 6 project-linked validation-plan items |
| Executed validation | None | None |

These are observed properties of outputs under the complete G/C configuration.
The C prompt requires evidence references, a structured contract, and
alternatives; this comparison therefore does not establish model superiority,
architectural correctness, utility, reduced effort, causal effects, or
generalization.
