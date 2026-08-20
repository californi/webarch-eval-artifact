import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const artifactDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(artifactDir, "artifact-manifest.json");

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function portablePath(value) {
  return value.split(path.sep).join("/");
}

function collectPublicFiles(directory, relative = "") {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === ".DS_Store") continue;
    const entryRelative = path.join(relative, entry.name);
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectPublicFiles(entryPath, entryRelative));
    } else if (entry.isFile()) {
      const portable = portablePath(entryRelative);
      if (portable !== "artifact-manifest.json") files.push(portable);
    }
  }
  return files;
}

const files = collectPublicFiles(artifactDir)
  .sort((left, right) => left.localeCompare(right))
  .map((file) => ({
    path: file,
    sha256: sha256(path.join(artifactDir, file))
  }));

const manifest = {
  schemaVersion: "webarch-evaluation-artifact/v1",
  files
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log("Updated artifact-manifest.json with " + files.length + " files.");
