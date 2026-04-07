import { promises as fs } from "fs";
import path from "path";

const incomingRoot = path.join(process.cwd(), "incoming-assets");
const manifestPath = path.join(incomingRoot, "asset-manifest-template.csv");

const expectedGroups = [
  {
    folder: "leadership",
    files: ["kelel-leadership-hero.jpg"],
  },
  {
    folder: "team",
    files: ["kelel-team-review.jpg", "kelel-delivery-team.jpg"],
  },
  {
    folder: "projects",
    files: ["kelel-project-screenshot-1.png", "kelel-project-screenshot-2.png"],
  },
  {
    folder: "certificates",
    files: ["kelel-certificate-1.pdf", "kelel-registration.pdf"],
  },
];

async function readFolderFiles(folder) {
  const folderPath = path.join(incomingRoot, folder);

  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase() !== ".gitkeep")
      .map((entry) => entry.name);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

async function readManifestRows() {
  const raw = await fs.readFile(manifestPath, "utf8");
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [, ...dataLines] = lines;
  return dataLines.map((line) => {
    const [
      filename,
      folder,
      assetType,
      approvedForPublicUse,
      preferredPageOrSection,
      notes,
    ] = parseCsvLine(line);

    return {
      filename,
      folder,
      assetType,
      approvedForPublicUse,
      preferredPageOrSection,
      notes,
    };
  });
}

let missingCount = 0;
let foundCount = 0;

for (const group of expectedGroups) {
  const available = await readFolderFiles(group.folder);

  console.log(`\n${group.folder}`);

  for (const file of group.files) {
    const present = available.includes(file);
    console.log(`${present ? "[ok]" : "[missing]"} ${file}`);

    if (present) {
      foundCount += 1;
    } else {
      missingCount += 1;
    }
  }
}

const manifestRows = await readManifestRows();
const missingManifestRows = [];
const disallowedManifestRows = [];

for (const group of expectedGroups) {
  for (const file of group.files) {
    const match = manifestRows.find(
      (row) => row.filename === file && row.folder === group.folder,
    );

    if (!match) {
      missingManifestRows.push(`${group.folder}/${file}`);
      continue;
    }

    if (match.approvedForPublicUse.trim().toLowerCase() !== "yes") {
      disallowedManifestRows.push(`${group.folder}/${file}`);
    }
  }
}

console.log(`\nAsset readiness: ${foundCount} found, ${missingCount} missing.`);

console.log("\nManifest coverage");
if (missingManifestRows.length === 0) {
  console.log("[ok] All expected files exist in the manifest.");
} else {
  for (const item of missingManifestRows) {
    console.log(`[missing manifest] ${item}`);
  }
}

if (disallowedManifestRows.length === 0) {
  console.log("[ok] All expected manifest rows are approved for public use.");
} else {
  for (const item of disallowedManifestRows) {
    console.log(`[not approved] ${item}`);
  }
}

if (
  missingCount > 0 ||
  missingManifestRows.length > 0 ||
  disallowedManifestRows.length > 0
) {
  console.error("\nAsset readiness check failed.");
  process.exit(1);
}

console.log("\nAsset readiness check passed.");
