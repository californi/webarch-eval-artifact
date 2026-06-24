import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const artifactDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const anonymityOnly = process.argv.includes("--anonymity-only");
const manifest = JSON.parse(fs.readFileSync(path.join(artifactDir, "artifact-manifest.json"), "utf8"));
const inputManifest = JSON.parse(fs.readFileSync(path.join(artifactDir, "case", "inputs", "input-manifest.json"), "utf8"));
const inputIds = new Set(inputManifest.artifacts.map((artifact) => artifact.id));
const forbiddenPatterns = [
  [/\/Users\//i, "absolute local path"],
  [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, "email address"],
  [/github\.com\//i, "GitHub URL"],
  [/(?:orcid\.org|linkedin\.com|lattes\.cnpq\.br)/i, "personal or institutional profile URL"]
];

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function collectReferences(value, ids) {
  if (Array.isArray(value)) return value.forEach((item) => collectReferences(item, ids));
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value.evidenceReferences)) value.evidenceReferences.forEach((id) => ids.add(id));
  Object.values(value).forEach((item) => collectReferences(item, ids));
}

const errors = [];
const auditExclusions = new Set(["tools/validate-all.mjs"]);
const manifestPaths = new Set(manifest.files.map((entry) => entry.path));

function collectPublicFiles(directory, relative = "") {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const entryRelative = path.join(relative, entry.name);
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectPublicFiles(entryPath, entryRelative));
    else if (entry.isFile()) files.push(entryRelative);
  }
  return files;
}

for (const file of collectPublicFiles(artifactDir)) {
  if (file === "artifact-manifest.json") continue;
  if (!manifestPaths.has(file)) errors.push("Unmanifested public file: " + file);
}

for (const entry of manifest.files) {
  const filePath = path.join(artifactDir, entry.path);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing manifest file: ${entry.path}`);
    continue;
  }
  if (sha256(filePath) !== entry.sha256) errors.push(`Checksum mismatch: ${entry.path}`);
  if (auditExclusions.has(entry.path)) continue;
  const content = fs.readFileSync(filePath, "utf8");
  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(content)) errors.push(`${entry.path}: ${label}`);
  }
}

if (!anonymityOnly) {
  for (const run of ["2026-06-24-formal-01", "2026-06-24-formal-02", "2026-06-24-formal-03"]) {
    const outputPath = path.join(artifactDir, "runs", run, "raw", "condition-C.json");
    const output = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    if (output.outputContract !== "arcassist-decision-package/v1") errors.push(`${run}: invalid output contract`);
    if (!Array.isArray(output.alternatives) || output.alternatives.length < 2) errors.push(`${run}: fewer than two alternatives`);
    const references = new Set();
    collectReferences(output, references);
    for (const id of references) {
      if (!inputIds.has(id)) errors.push(`${run}: unknown evidence identifier ${id}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Artifact validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(anonymityOnly ? "Anonymization audit passed." : "Artifact validation passed.");
