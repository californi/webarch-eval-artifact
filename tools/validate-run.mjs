import fs from "node:fs";

const [outputPath, manifestPath] = process.argv.slice(2);

if (!outputPath || !manifestPath) {
  console.error("Usage: node tools/validate-run.mjs <output.json> <input-manifest.json>");
  process.exit(1);
}

const output = JSON.parse(fs.readFileSync(outputPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const expectedFields = [
  "outputContract",
  "scope",
  "assumptions",
  "evidenceReferences",
  "alternatives",
  "selectedOption",
  "webContext",
  "domainRules",
  "validation",
  "documentationUpdates"
];
const manifestIds = new Set(manifest.artifacts.map((artifact) => artifact.id));
const outputFields = Object.keys(output);
const errors = [];

if (output.outputContract !== "arcassist-decision-package/v1") {
  errors.push("outputContract must be arcassist-decision-package/v1.");
}

if (
  outputFields.length !== expectedFields.length ||
  expectedFields.some((field) => !outputFields.includes(field))
) {
  errors.push("Output must contain exactly the decision-package top-level fields.");
}

if (!Array.isArray(output.alternatives) || output.alternatives.length < 2) {
  errors.push("Output must provide at least two alternatives.");
}

const referencedIds = new Set();
const collectReferences = (value) => {
  if (Array.isArray(value)) {
    value.forEach(collectReferences);
    return;
  }

  if (value && typeof value === "object") {
    if (Array.isArray(value.evidenceReferences)) {
      value.evidenceReferences.forEach((id) => referencedIds.add(id));
    }
    Object.values(value).forEach(collectReferences);
  }
};

collectReferences(output);

for (const id of referencedIds) {
  if (!manifestIds.has(id)) {
    errors.push(`Unknown evidence identifier: ${id}.`);
  }
}

if (errors.length > 0) {
  console.error("ArcAssist experiment run validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("ArcAssist experiment run validation passed.");
console.log(`Validated ${output.alternatives.length} alternatives and ${referencedIds.size} evidence identifiers.`);
