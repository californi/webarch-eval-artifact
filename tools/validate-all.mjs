import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const artifactDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(artifactDir, "artifact-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const inputManifest = JSON.parse(
  fs.readFileSync(path.join(artifactDir, "case", "inputs", "input-manifest.json"), "utf8")
);
const runIndex = JSON.parse(
  fs.readFileSync(path.join(artifactDir, "runs", "run-index.json"), "utf8")
);
const inputIds = new Set(inputManifest.artifacts.map((artifact) => artifact.id));
const errors = [];

const requiredReleaseFiles = [
  ".gitignore",
  "CITATION.cff",
  "README.md",
  "REPRODUCE.md",
  "artifact-manifest.json",
  "package.json"
];
const forbiddenFileNames = new Set([".DS_Store"]);
const forbiddenTextPatterns = [
  [/\/Users\//i, "absolute macOS user path"],
  [/[A-Z]:\\Users\\/i, "absolute Windows user path"],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i, "private key"]
];

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function portablePath(value) {
  return value.split(path.sep).join("/");
}

function collectPublicFiles(directory, relative = "") {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const entryRelative = path.join(relative, entry.name);
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectPublicFiles(entryPath, entryRelative));
    } else if (entry.isFile()) {
      files.push(portablePath(entryRelative));
    }
  }
  return files;
}

function collectReferences(value, ids) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectReferences(item, ids));
    return;
  }
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value.evidenceReferences)) {
    value.evidenceReferences.forEach((id) => ids.add(id));
  }
  Object.values(value).forEach((item) => collectReferences(item, ids));
}

function verifyIndexedFile(indexEntry, baseDir, label) {
  const indexedPath = indexEntry.path ?? indexEntry.output;
  if (!indexedPath) {
    errors.push(label + ": index entry has no path");
    return;
  }
  const filePath = path.resolve(baseDir, indexedPath);
  if (!fs.existsSync(filePath)) {
    errors.push(label + ": missing file " + indexedPath);
    return;
  }
  if (sha256(filePath) !== indexEntry.sha256) {
    errors.push(label + ": checksum mismatch for " + indexedPath);
  }
}

const publicFiles = collectPublicFiles(artifactDir);
const manifestPaths = new Set(manifest.files.map((entry) => entry.path));

for (const required of requiredReleaseFiles) {
  if (!publicFiles.includes(required)) errors.push("Missing release file: " + required);
}

for (const file of publicFiles) {
  const fileName = path.posix.basename(file);
  if (forbiddenFileNames.has(fileName)) errors.push("Forbidden release file: " + file);
  if (file !== "artifact-manifest.json" && !manifestPaths.has(file)) {
    errors.push("Unmanifested public file: " + file);
  }
  if (file === "artifact-manifest.json") continue;

  const content = fs.readFileSync(path.join(artifactDir, file), "utf8");
  for (const [pattern, label] of forbiddenTextPatterns) {
    if (pattern.test(content)) errors.push(file + ": " + label);
  }
}

for (const entry of manifest.files) {
  const filePath = path.join(artifactDir, entry.path);
  if (!fs.existsSync(filePath)) {
    errors.push("Missing manifest file: " + entry.path);
    continue;
  }
  if (sha256(filePath) !== entry.sha256) {
    errors.push("Checksum mismatch: " + entry.path);
  }
}

verifyIndexedFile(runIndex.inputManifest, path.join(artifactDir, "runs"), "run index");
verifyIndexedFile(runIndex.commonConfiguration.promptG, path.join(artifactDir, "runs"), "prompt G");
verifyIndexedFile(runIndex.commonConfiguration.promptC, path.join(artifactDir, "runs"), "prompt C");

for (const pair of runIndex.includedPairs) {
  verifyIndexedFile(pair.conditionG, path.join(artifactDir, "runs"), pair.comparisonId + " G");
  verifyIndexedFile(pair.conditionC, path.join(artifactDir, "runs"), pair.comparisonId + " C");

  const outputPath = path.join(artifactDir, "runs", pair.conditionC.output);
  if (!fs.existsSync(outputPath)) continue;
  const output = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  if (output.outputContract !== "arcassist-decision-package/v1") {
    errors.push(pair.comparisonId + ": invalid output contract");
  }
  if (!Array.isArray(output.alternatives) || output.alternatives.length < 2) {
    errors.push(pair.comparisonId + ": fewer than two alternatives");
  }
  const references = new Set();
  collectReferences(output, references);
  for (const id of references) {
    if (!inputIds.has(id)) {
      errors.push(pair.comparisonId + ": unknown evidence identifier " + id);
    }
  }
}

if (errors.length > 0) {
  console.error("Artifact validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log(
  "Artifact validation passed: " +
    manifest.files.length +
    " manifested files, " +
    runIndex.includedPairs.length +
    " paired runs."
);
